# @feiyangl1020/metaid-create-buzz 🐝

[![npm version](https://img.shields.io/npm/v/@feiyangl1020/metaid-create-buzz)](https://www.npmjs.com/package/@feiyangl1020/metaid-create-buzz)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A TypeScript library for creating and managing Buzz content on the MetaID protocol. Buzz is a decentralized social media post format that supports both public and pay-to-view content with media attachments.

## Table of Contents
- [Features](#features)
- [Installation](#installation)  
- [Usage](#usage)
- [API Reference](#api-reference)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create normal Buzz posts with text and media attachments
- Create pay-to-view Buzz posts with encrypted content
- Support both BTC and MVC chains
- Handle image and video uploads
- Support NFT attachments
- Configurable fee rates and network settings

## Installation

```bash
npm install @feiyangl1020/metaid-create-buzz
# or
yarn add @feiyangl1020/metaid-create-buzz
# or
pnpm add @feiyangl1020/metaid-create-buzz
```

## Usage

### Basic Setup

```typescript
import { createBuzz, createNormalBuzz } from '@feiyangl1020/metaid-create-buzz';

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

## Development

To set up the development environment:

```bash
git clone https://github.com/your-repo/metaid-create-buzz.git
cd metaid-create-buzz
pnpm install
```

### Building

```bash
npm run build
```

Builds the project to the `dist` folder using TypeScript.

### Testing

Run unit tests with Jest:

```bash
npm test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

ISC © [Your Name]
