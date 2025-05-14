# PUMP.BOX API Documentation

## Overview
This document provides detailed information about the PUMP.BOX API, including endpoints, request/response formats, and authentication methods.

## API Endpoints

### Authentication

#### Connect Wallet
```http
POST /api/v1/auth/connect
```
Connect user's Solana wallet for authentication.

**Request Body:**
```json
{
  "wallet_address": "string",
  "signature": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "expires_at": "timestamp"
}
```

### Token Creation

#### Create Mystery Box Token
```http
POST /api/v1/tokens/create
```
Create a new mystery box token with AI-generated attributes.

**Request Body:**
```json
{
  "description": "string",
  "preferences": ["string"],
  "social_links": {
    "telegram": "string",
    "website": "string"
  }
}
```

**Response:**
```json
{
  "token_id": "string",
  "status": "generating",
  "estimated_time": "number"
}
```

#### Get Token Generation Status
```http
GET /api/v1/tokens/{token_id}/status
```
Check the status of token generation process.

**Response:**
```json
{
  "status": "string",
  "name": "string",
  "ticker": "string",
  "image_url": "string",
  "market_cap": "number",
  "supply": "number"
}
```

### Trading

#### Get Token Price
```http
GET /api/v1/tokens/{token_id}/price
```
Get current token price based on bonding curve.

**Response:**
```json
{
  "price": "number",
  "market_cap": "number",
  "supply": "number"
}
```

#### Buy Token
```http
POST /api/v1/tokens/{token_id}/buy
```
Buy tokens using SOL.

**Request Body:**
```json
{
  "amount_sol": "number"
}
```

**Response:**
```json
{
  "transaction_id": "string",
  "tokens_received": "number",
  "price_per_token": "number"
}
```

#### Sell Token
```http
POST /api/v1/tokens/{token_id}/sell
```
Sell tokens for SOL.

**Request Body:**
```json
{
  "amount_tokens": "number"
}
```

**Response:**
```json
{
  "transaction_id": "string",
  "sol_received": "number",
  "price_per_token": "number"
}
```

### Social Features

#### Get Community Stats
```http
GET /api/v1/tokens/{token_id}/community
```
Get token community statistics.

**Response:**
```json
{
  "holders": "number",
  "trades_24h": "number",
  "volume_24h": "number",
  "social_engagement": {
    "telegram_members": "number",
    "forum_posts": "number"
  }
}
```

#### Create Forum Post
```http
POST /api/v1/forum/posts
```
Create a new forum post.

**Request Body:**
```json
{
  "title": "string",
  "content": "string",
  "token_id": "string",
  "tags": ["string"]
}
```

**Response:**
```json
{
  "post_id": "string",
  "created_at": "timestamp"
}
```

### User Profile

#### Get User Portfolio
```http
GET /api/v1/users/portfolio
```
Get user's token portfolio.

**Response:**
```json
{
  "total_value_sol": "number",
  "tokens": [{
    "token_id": "string",
    "name": "string",
    "balance": "number",
    "value_sol": "number"
  }]
}
```

#### Get User Activity
```http
GET /api/v1/users/activity
```
Get user's recent activity.

**Response:**
```json
{
  "activities": [{
    "type": "string",
    "token_id": "string",
    "amount": "number",
    "timestamp": "string"
  }]
}
```

## WebSocket API

### Real-time Price Updates
```
ws://api.pump.box/v1/tokens/{token_id}/price
```
Receive real-time price updates for a token.

**Message Format:**
```json
{
  "price": "number",
  "market_cap": "number",
  "timestamp": "string"
}
```

### Trading Activity Stream
```
ws://api.pump.box/v1/tokens/{token_id}/trades
```
Receive real-time trading activity for a token.

**Message Format:**
```json
{
  "type": "buy|sell",
  "amount": "number",
  "price": "number",
  "timestamp": "string"
}
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

### Common Error Codes
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Internal Server Error

## Rate Limiting

- Public API: 100 requests per minute
- Authenticated API: 1000 requests per minute
- WebSocket: 10 connections per user

## Authentication

### Headers
```http
Authorization: Bearer <token>
X-API-Key: <api_key>
```

### API Keys
API keys can be generated from the developer dashboard. Each key has specific permissions and rate limits.

## Versioning

The API version is included in the URL path (e.g., `/api/v1/`). Major version changes will be announced with a 6-month deprecation period.

## Best Practices

1. Implement proper error handling
2. Use WebSocket for real-time data
3. Cache responses when appropriate
4. Respect rate limits
5. Keep authentication tokens secure

## SDK Support

### Official SDKs
- JavaScript/TypeScript
- Python
- Rust

### Code Examples

#### JavaScript
```javascript
const PumpBox = require('pumpbox-sdk');

const client = new PumpBox.Client({
  apiKey: 'your-api-key',
  environment: 'mainnet'
});

// Create token
const token = await client.createToken({
  description: 'A funny space cat token',
  preferences: ['humor', 'space']
});
```

#### Python
```python
from pumpbox import Client

client = Client(
    api_key='your-api-key',
    environment='mainnet'
)

# Get token price
price = client.get_token_price('token-id')
```

#### Rust
```rust
use pumpbox::Client;

let client = Client::new(
    "your-api-key",
    Environment::Mainnet
);

// Buy token
let result = client.buy_token(
    "token-id",
    1.5 // SOL amount
)?;
```

## Support

- Documentation: https://docs.pump.box
- Developer Forum: https://forum.pump.box/dev
- Discord: https://discord.gg/pumpbox-dev
- Email: api@pump.box