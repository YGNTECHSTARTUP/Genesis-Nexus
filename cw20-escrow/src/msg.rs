// src/msg.rs
use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Addr, Uint128};

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    CreateEscrow {
        job_id: String,
        token_address: String,
        amount: Uint128,
        freelancer: String,
        deadline: u64,
    },
    Receive(cw20::Cw20ReceiveMsg),
    SubmitWork { job_id: String },
    ApproveWork { job_id: String },
    Refund { job_id: String },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(EscrowInfoResponse)]
    EscrowInfo { job_id: String },
}

#[cw_serde]
pub struct EscrowInfoResponse {
    pub client: Addr,
    pub freelancer: Addr,
    pub token_address: Addr,
    pub amount: Uint128,
    pub submitted: bool,
    pub approved: bool,
    pub deadline: u64,
}
