// src/state.rs
use cosmwasm_std::{Addr, Uint128};
use cw_storage_plus::Map;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct Escrow {
    pub client: Addr,
    pub freelancer: Addr,
    pub token_address: Addr,
    pub amount: Uint128,
    pub submitted: bool,
    pub approved: bool,
    pub deadline: u64,
}

pub const ESCROWS: Map<String, Escrow> = Map::new("escrows");
