# Decentralized Voting Application

This project is a decentralized voting application built with React and Ethereum smart contracts. It allows users to participate in a secure and transparent voting process using blockchain technology on the Energy Web Volta Testnet.

## Features

- Connect to MetaMask wallet
- View list of candidates
- Cast votes for candidates
- Check remaining voting time
- View "Voting Finished" message when voting period ends

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MetaMask browser extension

## Installation

1. Clone this repository:

   ```
   git clone https://github.com/arshali2774/Voting_dApp.git
   cd Voting_dApp
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Usage

1. Ensure you have MetaMask installed and connected to the Energy Web Volta Testnet (see configuration below).
2. Open the application in your web browser.
3. Click "Login with MetaMask" to connect your wallet.
4. Once connected, you can view candidates and cast your vote.
5. The remaining voting time will be displayed.
6. After voting ends, you will see a "Voting Finished" message.

## Connecting to Energy Web Volta Testnet

To use this application, you need to add the Energy Web Volta Testnet to your MetaMask wallet. Follow these steps:

1. Open MetaMask and click on the network dropdown at the top.
2. Select "Add Network" or "Custom RPC".
3. Fill in the following details:

   - Network Name: Energy Web Volta Testnet
   - New RPC URL: https://volta-rpc.energyweb.org
   - Chain ID: 73799
   - Currency Symbol: VT
   - Block Explorer URL: https://volta-explorer.energyweb.org

4. Click "Save" to add the network.
5. Select the Energy Web Volta Testnet from the network dropdown in MetaMask.

## Smart Contract

This application interacts with a Voting smart contract deployed on the Energy Web Volta Testnet. The contract address and ABI are stored in `src/constant/constant.js`.

## Components

- `Login`: Handles user authentication with MetaMask
- `Connected`: Displays the main voting interface
- `Finished`: Shows "Voting Finished" message after the voting period ends

## Styling

The application uses CSS for styling. Main styles are in `App.css`, with component-specific styles in their respective CSS files.

## License

This project is licensed under the MIT License.
