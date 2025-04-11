use cosmwasm_std::{Addr, Uint128, Timestamp, Coin};
use cw20::{Cw20Coin, Cw20Contract, Cw20ExecuteMsg};
use cw_multi_test::{App, BankSudo, Contract, ContractWrapper, Executor};

use cw20_freelance_escrow::{
    contract::{execute, instantiate, query},
    msg::{ExecuteMsg, InstantiateMsg, QueryMsg},
    state::Escrow,
};

fn mock_escrow_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(execute, instantiate, query);
    Box::new(contract)
}

fn mock_cw20_contract() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        cw20_base::contract::execute,
        cw20_base::contract::instantiate,
        cw20_base::contract::query,
    );
    Box::new(contract)
}

#[test]
fn full_escrow_flow() {
    let mut app = App::default();

    // Store contract codes
    let escrow_code_id = app.store_code(mock_escrow_contract());
    let cw20_code_id = app.store_code(mock_cw20_contract());

    // Instantiate escrow contract
    let escrow_addr = app
        .instantiate_contract(
            escrow_code_id,
            Addr::unchecked("owner"),
            &InstantiateMsg {},
            &[],
            "Escrow",
            None,
        )
        .unwrap();

    // Instantiate CW20 token
    let token_addr = app
        .instantiate_contract(
            cw20_code_id,
            Addr::unchecked("owner"),
            &cw20_base::msg::InstantiateMsg {
                name: "TestToken".to_string(),
                symbol: "TT".to_string(),
                decimals: 6,
                initial_balances: vec![Cw20Coin {
                    address: "client".to_string(),
                    amount: Uint128::new(1000),
                }],
                mint: None,
                marketing: None,
            },
            &[],
            "Test Token",
            None,
        )
        .unwrap();

    // Create an escrow
    app.execute_contract(
        Addr::unchecked("client"),
        escrow_addr.clone(),
        &ExecuteMsg::CreateEscrow {
            id: "job1".to_string(),
            freelancer: "freelancer".to_string(),
            token_address: token_addr.to_string(),
            amount: Uint128::new(100),
            deadline: Timestamp::from_seconds(1000),
        },
        &[],
    )
    .unwrap();

    // Approve & send CW20 tokens to the escrow
    app.execute_contract(
        Addr::unchecked("client"),
        token_addr.clone(),
        &Cw20ExecuteMsg::Send {
            contract: escrow_addr.to_string(),
            amount: Uint128::new(100),
            msg: b"job1".to_vec().into(),
        },
        &[],
    )
    .unwrap();

    // Freelancer submits work
    app.execute_contract(
        Addr::unchecked("freelancer"),
        escrow_addr.clone(),
        &ExecuteMsg::SubmitWork {
            id: "job1".to_string(),
        },
        &[],
    )
    .unwrap();

    // Client approves the work
    app.execute_contract(
        Addr::unchecked("client"),
        escrow_addr.clone(),
        &ExecuteMsg::ApproveWork {
            id: "job1".to_string(),
        },
        &[],
    )
    .unwrap();

    // Query and check escrow status
    let escrow: Escrow = app
        .wrap()
        .query_wasm_smart(
            &escrow_addr,
            &QueryMsg::EscrowDetails {
                id: "job1".to_string(),
            },
        )
        .unwrap();

    assert!(escrow.submitted);
    assert!(escrow.approved);
    assert_eq!(escrow.amount, Uint128::new(100));
}




#[test]
fn unauthorized_submit_work() {
    let mut app = App::default();
    let escrow_code_id = app.store_code(mock_escrow_contract());
    let cw20_code_id = app.store_code(mock_cw20_contract());

    let escrow_addr = app.instantiate_contract(
        escrow_code_id,
        Addr::unchecked("owner"),
        &InstantiateMsg {},
        &[],
        "Escrow",
        None,
    ).unwrap();

    let token_addr = app.instantiate_contract(
        cw20_code_id,
        Addr::unchecked("owner"),
        &cw20_base::msg::InstantiateMsg {
            name: "Token".into(),
            symbol: "TOK".into(),
            decimals: 6,
            initial_balances: vec![Cw20Coin {
                address: "client".into(),
                amount: Uint128::new(100),
            }],
            mint: None,
            marketing: None,
        },
        &[],
        "CW20",
        None,
    ).unwrap();

    app.execute_contract(
        Addr::unchecked("client"),
        escrow_addr.clone(),
        &ExecuteMsg::CreateEscrow {
            id: "job2".into(),
            freelancer: "freelancer".into(),
            token_address: token_addr.to_string(),
            amount: Uint128::new(100),
            deadline: Timestamp::from_seconds(1000),
        },
        &[],
    ).unwrap();

    let err = app.execute_contract(
        Addr::unchecked("random_user"),
        escrow_addr.clone(),
        &ExecuteMsg::SubmitWork {
            id: "job2".into(),
        },
        &[],
    ).unwrap_err();

    assert!(err.to_string().contains("Unauthorized"));
}

#[test]
fn refund_before_deadline_should_fail() {
    let mut app = App::default();
    let escrow_code_id = app.store_code(mock_escrow_contract());
    let cw20_code_id = app.store_code(mock_cw20_contract());

    let escrow_addr = app.instantiate_contract(
        escrow_code_id,
        Addr::unchecked("owner"),
        &InstantiateMsg {},
        &[],
        "Escrow",
        None,
    ).unwrap();

    let token_addr = app.instantiate_contract(
        cw20_code_id,
        Addr::unchecked("owner"),
        &cw20_base::msg::InstantiateMsg {
            name: "Token".into(),
            symbol: "TOK".into(),
            decimals: 6,
            initial_balances: vec![Cw20Coin {
                address: "client".into(),
                amount: Uint128::new(100),
            }],
            mint: None,
            marketing: None,
        },
        &[],
        "CW20",
        None,
    ).unwrap();

    app.execute_contract(
        Addr::unchecked("client"),
        escrow_addr.clone(),
        &ExecuteMsg::CreateEscrow {
            id: "job3".into(),
            freelancer: "freelancer".into(),
            token_address: token_addr.to_string(),
            amount: Uint128::new(100),
            deadline: Timestamp::from_seconds(1000),
        },
        &[],
    ).unwrap();

    // Try refund before deadline
    let err = app.execute_contract(
        Addr::unchecked("client"),
        escrow_addr.clone(),
        &ExecuteMsg::Refund {
            id: "job3".into(),
        },
        &[],
    ).unwrap_err();

    assert!(err.to_string().contains("Escrow expired"));
}

#[test]
fn client_refund_after_deadline_and_work_not_submitted() {
    let mut app = App::default();
    let escrow_code_id = app.store_code(mock_escrow_contract());
    let cw20_code_id = app.store_code(mock_cw20_contract());

    let escrow_addr = app.instantiate_contract(
        escrow_code_id,
        Addr::unchecked("owner"),
        &InstantiateMsg {},
        &[],
        "Escrow",
        None,
    ).unwrap();

    let token_addr = app.instantiate_contract(
        cw20_code_id,
        Addr::unchecked("owner"),
        &cw20_base::msg::InstantiateMsg {
            name: "Token".into(),
            symbol: "TOK".into(),
            decimals: 6,
            initial_balances: vec![Cw20Coin {
                address: "client".into(),
                amount: Uint128::new(100),
            }],
            mint: None,
            marketing: None,
        },
        &[],
        "CW20",
        None,
    ).unwrap();

    app.execute_contract(
        Addr::unchecked("client"),
        escrow_addr.clone(),
        &ExecuteMsg::CreateEscrow {
            id: "job4".into(),
            freelancer: "freelancer".into(),
            token_address: token_addr.to_string(),
            amount: Uint128::new(100),
            deadline: Timestamp::from_seconds(500),
        },
        &[],
    ).unwrap();

    app.execute_contract(
        Addr::unchecked("client"),
        token_addr.clone(),
        &Cw20ExecuteMsg::Send {
            contract: escrow_addr.to_string(),
            amount: Uint128::new(100),
            msg: b"job4".to_vec().into(),
        },
        &[],
    ).unwrap();

    // Fast forward time
    app.update_block(|block| {
        block.time = Timestamp::from_seconds(1001);
    });

    // Now allow refund after deadline
    let res = app.execute_contract(
        Addr::unchecked("client"),
        escrow_addr.clone(),
        &ExecuteMsg::Refund {
            id: "job4".into(),
        },
        &[],
    ).unwrap();

    assert_eq!(res.attributes.iter().any(|attr| attr.key == "action" && attr.value == "refund"), true);
}
