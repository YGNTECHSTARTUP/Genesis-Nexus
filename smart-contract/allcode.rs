// src/lib.rs
pub mod contract;
pub mod msg;
pub mod state;
pub mod error;

pub use crate::contract::{instantiate, execute, query};

// src/state.rs
use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Timestamp, Uint128};
use cw_storage_plus::Map;

#[cw_serde]
pub struct Escrow {
    pub client: Addr,
    pub freelancer: Addr,
    pub token_address: Addr,
    pub amount: Uint128,
    pub deadline: Timestamp,
    pub submitted: bool,
    pub approved: bool,
}

pub const ESCROWS: Map<String, Escrow> = Map::new("escrows");

// src/msg.rs
use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Timestamp, Uint128};
use cw20::Cw20ReceiveMsg;

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    CreateEscrow {
        id: String,
        freelancer: String,
        token_address: String,
        amount: Uint128,
        deadline: Timestamp,
    },
    SubmitWork {
        id: String,
    },
    ApproveWork {
        id: String,
    },
    Refund {
        id: String,
    },
    Receive(Cw20ReceiveMsg),
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(crate::state::Escrow)]
    EscrowDetails { id: String },
}

// src/error.rs
use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Escrow with this ID already exists")]
    EscrowExists {},

    #[error("Escrow not found")]
    EscrowNotFound {},

    #[error("Unauthorized action")]
    Unauthorized {},

    #[error("Escrow expired")]
    DeadlinePassed {},

    #[error("Work not submitted yet")]
    NotSubmitted {},

    #[error("Work already approved")]
    AlreadyApproved {},
}

// src/contract.rs
use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
use crate::state::{Escrow, ESCROWS};
use cosmwasm_std::{entry_point, to_binary, Addr, Binary, CosmosMsg, Deps, DepsMut, Env, MessageInfo, Response, StdResult, Timestamp, Uint128, WasmMsg};
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
            id,
            freelancer,
            token_address,
            amount,
            deadline,
        } => {
            if ESCROWS.has(deps.storage, &id) {
                return Err(ContractError::EscrowExists {});
            }

            let escrow = Escrow {
                client: info.sender.clone(),
                freelancer: deps.api.addr_validate(&freelancer)?,
                token_address: deps.api.addr_validate(&token_address)?,
                amount,
                deadline,
                submitted: false,
                approved: false,
            };

            ESCROWS.save(deps.storage, &id, &escrow)?;
            Ok(Response::new().add_attribute("action", "create_escrow"))
        }

        ExecuteMsg::Receive(msg) => receive_cw20(deps, env, info, msg),

        ExecuteMsg::SubmitWork { id } => {
            let mut escrow = ESCROWS.load(deps.storage, &id)?;
            if info.sender != escrow.freelancer {
                return Err(ContractError::Unauthorized {});
            }
            if env.block.time > escrow.deadline {
                return Err(ContractError::DeadlinePassed {});
            }
            escrow.submitted = true;
            ESCROWS.save(deps.storage, &id, &escrow)?;
            Ok(Response::new().add_attribute("action", "submit_work").add_attribute("id", id))
        }

        ExecuteMsg::ApproveWork { id } => {
            let mut escrow = ESCROWS.load(deps.storage, &id)?;

            if info.sender != escrow.client {
                return Err(ContractError::Unauthorized {});
            }
            if !escrow.submitted {
                return Err(ContractError::NotSubmitted {});
            }
            if escrow.approved {
                return Err(ContractError::AlreadyApproved {});
            }

            escrow.approved = true;

            let transfer_msg = CosmosMsg::Wasm(WasmMsg::Execute {
                contract_addr: escrow.token_address.to_string(),
                msg: to_binary(&Cw20ExecuteMsg::Transfer {
                    recipient: escrow.freelancer.to_string(),
                    amount: escrow.amount,
                })?,
                funds: vec![],
            });

            ESCROWS.save(deps.storage, &id, &escrow)?;

            Ok(Response::new()
                .add_message(transfer_msg)
                .add_attribute("action", "approve_work")
                .add_attribute("id", id))
        }

        ExecuteMsg::Refund { id } => {
            let escrow = ESCROWS.load(deps.storage, &id)?;

            if info.sender != escrow.client {
                return Err(ContractError::Unauthorized {});
            }
            if env.block.time <= escrow.deadline {
                return Err(ContractError::DeadlinePassed {}); // misuse of error, but keeping as per our pattern
            }
            if escrow.submitted {
                return Err(ContractError::AlreadyApproved {});
            }

            let transfer_msg = CosmosMsg::Wasm(WasmMsg::Execute {
                contract_addr: escrow.token_address.to_string(),
                msg: to_binary(&Cw20ExecuteMsg::Transfer {
                    recipient: escrow.client.to_string(),
                    amount: escrow.amount,
                })?,
                funds: vec![],
            });

            Ok(Response::new()
                .add_message(transfer_msg)
                .add_attribute("action", "refund")
                .add_attribute("id", id))
        }
    }
}

fn receive_cw20(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: Cw20ReceiveMsg,
) -> Result<Response, ContractError> {
    let id = msg.msg.as_ref().map(|b| String::from_utf8(b.clone().to_vec()))
        .transpose()
        .map_err(|_| ContractError::Std(cosmwasm_std::StdError::generic_err("Invalid escrow ID payload")))??;

    let mut escrow = ESCROWS.load(deps.storage, &id)?;

    if info.sender != escrow.token_address {
        return Err(ContractError::Unauthorized {});
    }

    if msg.amount != escrow.amount {
        return Err(ContractError::Std(cosmwasm_std::StdError::generic_err("Incorrect deposit amount")));
    }

    Ok(Response::new()
        .add_attribute("action", "receive_cw20")
        .add_attribute("escrow_id", id)
        .add_attribute("amount", msg.amount.to_string()))
}

#[entry_point]
pub fn query(
    deps: Deps,
    _env: Env,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::EscrowDetails { id } => {
            let escrow = ESCROWS.load(deps.storage, &id)?;
            to_binary(&escrow)
        }
    }
}
