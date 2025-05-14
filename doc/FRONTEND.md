# PUMP.BOX Frontend Documentation

## Overview
This document provides comprehensive documentation for the PUMP.BOX frontend application, including architecture, components, and development guidelines.

## Technology Stack

### Core Technologies
- React 18+
- TypeScript 5.0+
- Vite (Build Tool)
- Redux Toolkit (State Management)
- TailwindCSS (Styling)
- Solana Web3.js (Blockchain Integration)

### Key Dependencies
```json
{
  "dependencies": {
    "@solana/web3.js": "^1.78.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^9.0.0",
    "tailwindcss": "^3.4.0",
    "@headlessui/react": "^1.7.0",
    "axios": "^1.6.0",
    "socket.io-client": "^4.7.0"
  }
}
```

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
├── config/          # Configuration files
├── hooks/           # Custom React hooks
├── layouts/         # Page layouts
├── pages/           # Page components
├── services/        # API and blockchain services
├── store/           # Redux store and slices
├── styles/          # Global styles
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Component Architecture

### Core Components

#### TokenCreator
Handles mystery box token creation process.

```typescript
// src/components/TokenCreator/index.tsx
import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface TokenCreatorProps {
  onSuccess: (tokenId: string) => void;
}

export const TokenCreator: React.FC<TokenCreatorProps> = ({ onSuccess }) => {
  const [description, setDescription] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const { publicKey, signTransaction } = useWallet();

  const handleSubmit = async () => {
    // Token creation logic
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Component JSX */}
    </div>
  );
};
```

#### TradingInterface
Provides token trading functionality.

```typescript
// src/components/TradingInterface/index.tsx
import { useTokenPrice } from '@/hooks/useTokenPrice';
import { useTrade } from '@/hooks/useTrade';

interface TradingInterfaceProps {
  tokenId: string;
}

export const TradingInterface: React.FC<TradingInterfaceProps> = ({ tokenId }) => {
  const { price, marketCap } = useTokenPrice(tokenId);
  const { buyTokens, sellTokens } = useTrade(tokenId);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Trading interface */}
    </div>
  );
};
```

### State Management

#### Token Slice
```typescript
// src/store/slices/tokenSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  tokens: Record<string, TokenInfo>;
  loading: boolean;
  error: string | null;
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    // Reducers
  },
});
```

#### Trading Slice
```typescript
// src/store/slices/tradingSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface TradingState {
  orders: Order[];
  trades: Trade[];
  loading: boolean;
}

const tradingSlice = createSlice({
  name: 'trading',
  initialState,
  reducers: {
    // Reducers
  },
});
```

## API Integration

### API Client
```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
});

export const createToken = async (data: CreateTokenData) => {
  const response = await api.post('/tokens/create', data);
  return response.data;
};

export const getTokenPrice = async (tokenId: string) => {
  const response = await api.get(`/tokens/${tokenId}/price`);
  return response.data;
};
```

### WebSocket Integration
```typescript
// src/services/websocket.ts
import { io } from 'socket.io-client';

export const connectWebSocket = (tokenId: string) => {
  const socket = io(`${process.env.VITE_WS_URL}/tokens/${tokenId}`);

  socket.on('price_update', (data) => {
    // Handle price updates
  });

  return socket;
};
```

## Wallet Integration

### Wallet Provider
```typescript
// src/providers/WalletProvider.tsx
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';

export const SolanaWalletProvider: React.FC = ({ children }) => {
  return (
    <ConnectionProvider endpoint={process.env.VITE_SOLANA_RPC_URL}>
      <WalletProvider wallets={[/* wallet adapters */]}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
```

### Wallet Hooks
```typescript
// src/hooks/useWalletBalance.ts
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export const useWalletBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  // Balance fetching logic
};
```

## Styling Guide

### TailwindCSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#10B981',
      },
      // Custom theme extensions
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
```

### Component Styling
```typescript
// src/components/Button/index.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ variant, size, children }) => {
  const baseStyles = 'rounded-lg font-medium transition-colors';
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700',
  };
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </button>
  );
};
```

## Testing

### Unit Testing
```typescript
// src/components/TokenCreator/TokenCreator.test.tsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import { TokenCreator } from './TokenCreator';

describe('TokenCreator', () => {
  it('should handle token creation', async () => {
    // Test implementation
  });
});
```

### Integration Testing
```typescript
// src/tests/trading.test.tsx
import { renderWithProviders } from '../utils/test-utils';
import { TradingInterface } from '../components/TradingInterface';

describe('Trading Flow', () => {
  it('should complete buy transaction', async () => {
    // Test implementation
  });
});
```

## Performance Optimization

### Code Splitting
```typescript
// src/pages/index.tsx
import { lazy, Suspense } from 'react';

const TokenCreator = lazy(() => import('../components/TokenCreator'));
const TradingInterface = lazy(() => import('../components/TradingInterface'));

export const HomePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* Components */}
    </Suspense>
  );
};
```

### Memoization
```typescript
// src/components/PriceChart/index.tsx
import { memo } from 'react';

export const PriceChart = memo(({ data }) => {
  // Chart rendering logic
});
```

## Error Handling

### Error Boundary
```typescript
// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}
```

## Deployment

### Build Configuration
```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      // Build options
    },
  },
});
```

### Environment Configuration
```env
# .env.production
VITE_API_URL=https://api.pump.box
VITE_WS_URL=wss://ws.pump.box
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## Contributing

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Code Style Guide
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write comprehensive tests
- Document complex logic

## Resources

### Documentation
- [React Documentation](https://reactjs.org/)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TailwindCSS](https://tailwindcss.com/)

### Community
- [Discord Server](https://discord.gg/pumpbox)
- [Developer Forum](https://forum.pump.box/dev)
- [GitHub Repository](https://github.com/pumpbox/frontend)