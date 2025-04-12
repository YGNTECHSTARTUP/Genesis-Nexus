use std::path::PathBuf;
use cosmwasm_schema::{export_schema, remove_schemas, schema_for};

use cw20_escrow::msg::{
    InstantiateMsg, ExecuteMsg, QueryMsg, EscrowInfoResponse,
};

fn main() {
    let out_dir = PathBuf::from("schema");
    remove_schemas(&out_dir).unwrap();
    export_schema(&schema_for!(InstantiateMsg), &out_dir);
    export_schema(&schema_for!(ExecuteMsg), &out_dir);
    export_schema(&schema_for!(QueryMsg), &out_dir);
    export_schema(&schema_for!(EscrowInfoResponse), &out_dir);
}
