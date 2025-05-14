# PUMP.BOX Smart Contracts Documentation

## Overview
This document details the smart contracts that power the PUMP.BOX platform on Solana. These contracts handle token creation, trading mechanics, and community features.

## Contract Architecture

### Core Contracts

#### TokenFactory
Responsible for creating new mystery box tokens.

```rust
pub mod token_factory {
    use solana_program::{
        account_info::AccountInfo,
        entrypoint,
        entrypoint::ProgramResult,        pubkey::Pubkey,
    };

    #[derive(BorshSerialize, BorshDeserialize)]
    pub struct TokenConfig {
        pub name: String,
        pub symbol: String,
        pub decimals: u8,
        pub total_supply: u64,
    }

    pub fn create_token(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        config: TokenConfig,
    ) -> ProgramResult {
        // Token creation logic
    }
}
```

#### BondingCurve
Implements the discrete bonding curve trading mechanism.

```rust
pub mod bonding_curve {
    #[derive(BorshSerialize, BorshDeserialize)]
    pub struct CurveConfig {
        pub k: u64,
        pub initial_price: u64,
        pub initial_supply: u64,
    }

    pub fn calculate_price(
        market_cap: u64,
        supply: u64,
        k: u64,
    ) -> u64 {
        // Price calculation logic
    }

    pub fn buy_tokens(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        amount_sol: u64,
    ) -> ProgramResult {
        // Buy logic
    }

    pub fn sell_tokens(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        amount_tokens: u64,
    ) -> ProgramResult {
        // Sell logic
    }
}
```

#### LiquidityManager
Handles automated liquidity injection and Raydium integration.

```rust
pub mod liquidity_manager {
    #[derive(BorshSerialize, BorshDeserialize)]
    pub struct LiquidityConfig {
        pub target_amount: u64,
        pub fee_percentage: u8,
    }

    pub fn inject_liquidity(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        amount: u64,
    ) -> ProgramResult {
        // Liquidity injection logic
    }
}
```

### Governance Contracts

#### CommunityVoting
Manages community voting and proposal system.

```rust
pub mod community_voting {
    #[derive(BorshSerialize, BorshDeserialize)]
    pub struct Proposal {
        pub id: u64,
        pub description: String,
        pub vote_start: u64,
        pub vote_end: u64,
    }

    pub fn create_proposal(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        proposal: Proposal,
    ) -> ProgramResult {
        // Proposal creation logic
    }

    pub fn cast_vote(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        proposal_id: u64,
        vote: bool,
    ) -> ProgramResult {
        // Voting logic
    }
}
```

#### RewardDistributor
Handles community rewards and incentives.

```rust
pub mod reward_distributor {
    pub fn distribute_rewards(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        amount: u64,
    ) -> ProgramResult {
        // Reward distribution logic
    }
}
```

## State Management

### Account Structures

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub struct TokenState {
    pub authority: Pubkey,
    pub total_supply: u64,
    pub circulating_supply: u64,
    pub market_cap: u64,
    pub last_price: u64,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct UserState {
    pub wallet: Pubkey,
    pub tokens_owned: u64,
    pub last_trade: u64,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct MarketState {
    pub token_mint: Pubkey,
    pub curve_config: CurveConfig,
    pub liquidity_config: LiquidityConfig,
}
```

## Events

### Trading Events

```rust
#[event]
pub struct TradeEvent {
    pub token: Pubkey,
    pub trader: Pubkey,
    pub amount: u64,
    pub price: u64,
    pub trade_type: TradeType,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub enum TradeType {
    Buy,
    Sell,
}
```

### Governance Events

```rust
#[event]
pub struct VoteEvent {
    pub proposal_id: u64,
    pub voter: Pubkey,
    pub vote: bool,
    pub weight: u64,
}
```

## Security Measures

### Access Control

```rust
pub fn verify_authority(
    authority: &Pubkey,
    program_id: &Pubkey,
) -> ProgramResult {
    // Authority verification logic
}
```

### Emergency Controls

```rust
pub fn emergency_pause(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
) -> ProgramResult {
    // Emergency pause logic
}
```

## Testing

### Unit Tests

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_bonding_curve_calculation() {
        // Test price calculation
    }

    #[test]
    fn test_token_creation() {
        // Test token creation
    }
}
```

### Integration Tests

```rust
#[cfg(test)]
mod integration_tests {
    #[test]
    fn test_full_trading_cycle() {
        // Test complete trading cycle
    }
}
```

## Deployment

### Program Deployment

```bash
# Build program
cargo build-bpf

# Deploy to devnet
solana program deploy target/deploy/token_factory.so
```

### Program Upgrade

```rust
pub fn upgrade_program(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    new_program_data: &[u8],
) -> ProgramResult {
    // Program upgrade logic
}
```

## Error Handling

```rust
#[derive(Debug)]
pub enum ProgramError {
    InvalidInstruction,
    InsufficientFunds,
    InvalidAuthority,
    MarketPaused,
    // Other error types
}
```

## Best Practices

1. Always validate account ownership
2. Check for arithmetic overflow
3. Implement proper error handling
4. Use secure random number generation
5. Follow Solana program guidelines

## Appendix

### Constants

```rust
pub const PROGRAM_VERSION: u8 = 1;
pub const MAX_SUPPLY: u64 = 1_000_000_000;
pub const MIN_TRADE_AMOUNT: u64 = 1_000;
```

### Utilities

```rust
pub mod utils {
    pub fn calculate_fee(
        amount: u64,
        fee_percentage: u8,
    ) -> u64 {
        // Fee calculation logic
    }
}
```