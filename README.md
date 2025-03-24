# MetaID Create Buzz

A TypeScript library for creating and managing Buzz content on the MetaID protocol.

## Features

- Create normal Buzz posts with text and media attachments
- Create pay-to-view Buzz posts with encrypted content
- Support both BTC and MVC chains
- Handle image and video uploads
- Support NFT attachments
- Configurable fee rates and network settings

## Installation

```bash
npm install metaid-create-buzz
# or
yarn add metaid-create-buzz
# or
pnpm add metaid-create-buzz
```

## Usage

### Basic Setup

```typescript
import { createBuzz, createNormalBuzz } from 'metaid-create-buzz';

// Initialize with your connector and network settings
const params = {
  buzz: {
    content: "Hello MetaID!",
    publicImages: [], 
    encryptContent: "",
    encryptImages: [],
    nfts: []
  },
  host: "https://api.metaid.io",
  feeRate: 1,
  chain: "btc",
  btcConnector: yourBtcConnector,
  mvcConnector: yourMvcConnector,
  network: "testnet"
};

// Create a normal buzz
const txId = await createNormalBuzz(params);

// Create a pay-to-view buzz
const payParams = {
  ...params,
  isPayBuzz: true,
  payInfo: {
    manPubKey: "your_pubkey",
    payType: "btc",
    payAmount: 1000,
    manDomain: "your.domain"
  }
};
const payTxId = await createBuzz(payParams);
```

## API Reference

### `createBuzz(params: Props)`

Creates a pay-to-view Buzz post with encrypted content.

#### Parameters
- `params`: Configuration object containing:
  - `buzz`: Buzz content details
  - `host`: MetaID API host
  - `feeRate`: Transaction fee rate
  - `chain`: Blockchain ("btc" or "mvc")
  - `btcConnector`: BTC wallet connector
  - `mvcConnector`: MVC wallet connector  
  - `network`: Network ("mainnet" or "testnet")
  - `isPayBuzz`: Whether this is a pay-to-view buzz
  - `payInfo`: Payment configuration

### `createNormalBuzz(params: Props)`

Creates a normal public Buzz post.

## Dependencies

- @feiyangl1020/metaid
- browser-image-compression  
- compressorjs
- crypto-js
- uuid

## Building

```bash
npm run build
```

Builds the project to the `dist` folder using TypeScript.

## License

ISC
