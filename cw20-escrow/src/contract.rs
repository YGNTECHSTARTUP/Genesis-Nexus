// src/contract.rs
use crate::error::ContractError;
use crate::msg::*;
use crate::state::{Escrow, ESCROWS};

use cosmwasm_std::{
    entry_point, Addr, BankMsg, Coin, Deps, DepsMut, Env, MessageInfo, Order, Response,
    StdResult, Storage, SubMsg, Timestamp, Uint128, WasmMsg,
};
use cw20::{Cw20ExecuteMsg, Cw20ReceiveMsg};

#[entry_point]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> StdResult<Response> {
    Ok(Response::default())
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::CreateEscrow {
            job_id,
            token_address,
            amount,
            freelancer,
            deadline,
        } => create_escrow(deps, info, job_id, token_address, amount, freelancer, deadline),
        ExecuteMsg::Receive(msg) => receive(deps, env, info, msg),
        ExecuteMsg::SubmitWork { job_id } => submit_work(deps, info, job_id),
        ExecuteMsg::ApproveWork { job_id } => approve_work(deps, env, info, job_id),
        ExecuteMsg::Refund { job_id } => refund(deps, env, info, job_id),
    }
}

fn create_escrow(
    deps: DepsMut,
    info: MessageInfo,
    job_id: String,
    token_address: String,
    amount: Uint128,
    freelancer: String,
    deadline: u64,
) -> Result<Response, ContractError> {
    if ESCROWS.has(deps.storage, job_id) {
        return Err(ContractError::EscrowExists {});
    }

    let escrow = Escrow {
        client: info.sender.clone(),
        freelancer: deps.api.addr_validate(&freelancer)?,
        token_address: deps.api.addr_validate(&token_address)?,
        amount,
        submitted: false,
        approved: false,
        deadline,
    };

    ESCROWS.save(deps.storage, job_id, &escrow)?;

    Ok(Response::new().add_attribute("action", "create_escrow"))
}

fn receive(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    cw20_msg: Cw20ReceiveMsg,
) -> Result<Response, ContractError> {
    let job_id = cw20_msg.msg.into_string();
    let mut escrow = ESCROWS.load(deps.storage, &job_id)?;

    if info.sender != escrow.token_address {
        return Err(ContractError::InvalidToken {});
    }

    // Ensure CW20 deposit matches
    if cw20_msg.amount != escrow.amount {
        return Err(ContractError::Std(cosmwasm_std::StdError::generic_err(
            "Incorrect deposit amount",
        )));
    }

    Ok(Response::new().add_attribute("action", "deposit"))
}

fn submit_work(deps: DepsMut, info: MessageInfo, job_id: String) -> Result<Response, ContractError> {
    ESCROWS.update(deps.storage, &job_id, |maybe| {
        let mut escrow = maybe.ok_or(ContractError::NotFound {})?;

        if info.sender != escrow.freelancer {
            return Err(ContractError::Unauthorized {});
        }

        if escrow.submitted {
            return Err(ContractError::AlreadySubmitted {});
        }

        escrow.submitted = true;
        Ok(escrow)
    })?;

    Ok(Response::new().add_attribute("action", "submit_work"))
}

fn approve_work(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    job_id: String,
) -> Result<Response, ContractError> {
    let escrow = ESCROWS.load(deps.storage, &job_id)?;

    if info.sender != escrow.client {
        return Err(ContractError::Unauthorized {});
    }

    if escrow.approved {
        return Err(ContractError::AlreadyApproved {});
    }

    if env.block.time.seconds() > escrow.deadline {
        return Err(ContractError::DeadlinePassed {});
    }

    let msg = WasmMsg::Execute {
        contract_addr: escrow.token_address.to_string(),
        msg: cosmwasm_std::to_json_binary(&Cw20ExecuteMsg::Transfer {
            recipient: escrow.freelancer.to_string(),
            amount: escrow.amount,
        })?,
        funds: vec![],
    };

    ESCROWS.update(deps.storage, &job_id, |maybe| {
        let mut escrow = maybe.ok_or(ContractError::NotFound {})?;
        escrow.approved = true;
        Ok(escrow)
    })?;

    Ok(Response::new()
        .add_message(msg)
        .add_attribute("action", "approve_work"))
}

fn refund(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    job_id: String,
) -> Result<Response, ContractError> {
    let escrow = ESCROWS.load(deps.storage, &job_id)?;

    if info.sender != escrow.client {
        return Err(ContractError::Unauthorized {});
    }

    if env.block.time.seconds() < escrow.deadline {
        return Err(ContractError::DeadlineNotPassed {});
    }

    if escrow.approved {
        return Err(ContractError::AlreadyApproved {});
    }

    let msg = WasmMsg::Execute {
        contract_addr: escrow.token_address.to_string(),
        msg: cosmwasm_std::to_json_binary(&Cw20ExecuteMsg::Transfer {
            recipient: escrow.client.to_string(),
            amount: escrow.amount,
        })?,
        funds: vec![],
    };

    ESCROWS.remove(deps.storage, &job_id);

    Ok(Response::new()
        .add_message(msg)
        .add_attribute("action", "refund"))
}
