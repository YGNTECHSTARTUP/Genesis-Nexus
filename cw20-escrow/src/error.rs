// src/error.rs
use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Unauthorized")]
    Unauthorized {},

    #[error("Escrow already exists")]
    EscrowExists {},

    #[error("Escrow not found")]
    NotFound {},

    #[error("Deadline has not passed")]
    DeadlineNotPassed {},

    #[error("Deadline has passed")]
    DeadlinePassed {},

    #[error("Already submitted")]
    AlreadySubmitted {},

    #[error("Already approved")]
    AlreadyApproved {},

    #[error("Invalid CW20 token")]
    InvalidToken {},
}
