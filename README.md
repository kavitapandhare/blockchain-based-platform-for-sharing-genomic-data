# Blockchain-Based Platform for Sharing Genomic Data

This repository provides a blockchain-based platform for securely sharing genomic data using Hyperledger Fabric and IPFS. The project includes automated installation scripts for Linux, macOS, and Windows systems to streamline setup and deployment.

---

## Features

1. **Hyperledger Fabric Integration**: A blockchain network for data sharing.
2. **IPFS Storage**: Distributed file storage for genomic data.
3. **Automated Installation**: Scripts to install prerequisites and configure the system for various platforms.
4. **Cross-Platform Support**: Compatible with Linux, macOS, and Windows.
5. **Multi-Organization Network**: Two organizations with two peers each.
6. **Chaincode Deployment**: Supports genomic data transactions.

---

## Prerequisites

Ensure the following software is installed based on your operating system:

- **Linux/macOS**:
  - Bash shell
  - Docker and Docker Compose
  - Node.js
  - IPFS
- **Windows**:
  - PowerShell
  - Chocolatey (will be installed automatically if not present)
  - Docker Desktop
  - Node.js
  - IPFS

---

## Installation Guide

### For Linux/macOS

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/blockchain-genomic-data-platform.git
   cd blockchain-genomic-data-platform
   ```

2. **Run the Setup Script**:
   ```bash
   bash setup.sh
   ```

3. **Start the Services**:
   ```bash
   bash start.sh
   ```

4. **Verify Installation**:
   Ensure Docker, Node.js, and IPFS are installed and running:
   ```bash
   docker --version
   node --version
   ipfs --version
   ```

### For Windows

1. **Clone the Repository**:
   ```powershell
   git clone https://github.com/yourusername/blockchain-genomic-data-platform.git
   cd blockchain-genomic-data-platform
   ```

2. **Run the PowerShell Installation Script**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File install.ps1
   ```

3. **Start the Services**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File start.ps1
   ```

4. **Verify Installation**:
   Ensure Docker, Node.js, and IPFS are installed and running:
   ```powershell
   docker --version
   node --version
   ipfs --version
   ```

---

## Network Topology

The blockchain network consists of:
- **2 Organizations**: Org1 and Org2.
- **2 Peers per Organization**: Peer0 and Peer1 for both Org1 and Org2.
- **Channel**: A single channel named `mychannel` is used for communication.
- **Chaincode**: Deployed on the channel to enable genomic data transactions.

This setup is designed to facilitate secure, distributed genomic data sharing.

---

## Setting Up the Blockchain Network

### Step 1: Generate Cryptographic Material
Generate cryptographic material for organizations using the `cryptogen` tool:
```bash
cryptogen generate --config=crypto-config.yaml --output=./crypto-config
```

### Step 2: Create Genesis Block
Use the `configtxgen` tool to create the genesis block for the orderer:
```bash
configtxgen -profile TwoOrgsOrdererGenesis -channelID system-channel -outputBlock ./channel-artifacts/genesis.block
```

### Step 3: Start the Network
Bring up the network using Docker Compose:
```bash
docker-compose -f docker-compose.yaml up -d
```

### Step 4: Create and Join the Channel
1. Create the channel:
   ```bash
   peer channel create -o orderer.example.com:7050 -c mychannel -f ./channel-artifacts/channel.tx
   ```
2. Have each peer join the channel:
   ```bash
   peer channel join -b mychannel.block
   ```

### Step 5: Deploy Chaincode
1. Package the chaincode:
   ```bash
   peer lifecycle chaincode package chaincode.tar.gz --path ./chaincode --lang node --label genomic-data-v1
   ```
2. Install the chaincode on all peers:
   ```bash
   peer lifecycle chaincode install chaincode.tar.gz
   ```
3. Approve and commit the chaincode:
   ```bash
   peer lifecycle chaincode approveformyorg --channelID mychannel --name genomic-data --version 1 --package-id <PACKAGE_ID> --sequence 1
   peer lifecycle chaincode commit -o orderer.example.com:7050 --channelID mychannel --name genomic-data --sequence 1
   ```

---

## Scripts

### `setup.sh` (Linux/macOS)
- Detects the operating system and runs the appropriate installation script.

### `install.sh` (Linux/macOS)
- Installs all prerequisites:
  - Docker
  - Node.js
  - IPFS
  - Hyperledger Fabric tools

### `install.ps1` (Windows)
- Installs all prerequisites using Chocolatey and manual downloads where necessary.
- Configures Docker, Node.js, IPFS, and Hyperledger Fabric.

### `start.sh` (Linux/macOS)
- Starts IPFS and the Hyperledger Fabric network.
- Deploys chaincode and registers users.

### `start.ps1` (Windows)
- Starts IPFS and the Hyperledger Fabric network.
- Deploys chaincode and registers users.

---

## Testing the Chaincode

Use the `peer chaincode invoke` and `peer chaincode query` commands to interact with the blockchain network:
```bash
# Invoke chaincode to store genomic data
peer chaincode invoke -o orderer.example.com:7050 -C mychannel -n genomic-data -c '{"Args":["storeData","genomicID123","<data_hash>"]}'

# Query chaincode to retrieve genomic data
peer chaincode query -C mychannel -n genomic-data -c '{"Args":["getData","genomicID123"]}'
```

---

## Configuration

### Docker Configuration

Ensure your `docker-compose.yml` file uses appropriate paths:

#### Example (Linux/macOS):
```yaml
version: '3.7'

services:
  fabric:
    image: hyperledger/fabric-peer:2.2
    ports:
      - "7051:7051"
    volumes:
      - "./fabric-data:/var/hyperledger"
  ipfs:
    image: ipfs/go-ipfs:latest
    ports:
      - "8080:8080"
      - "5001:5001"
    volumes:
      - "./ipfs-data:/data/ipfs"
```

#### Example (Windows):
```yaml
version: '3.7'

services:
  fabric:
    image: hyperledger/fabric-peer:2.2
    ports:
      - "7051:7051"
    volumes:
      - "C:/fabric-data:/var/hyperledger"
  ipfs:
    image: ipfs/go-ipfs:latest
    ports:
      - "8080:8080"
      - "5001:5001"
    volumes:
      - "C:/ipfs-data:/data/ipfs"
```

---

## Usage

1. **Upload Genomic Data**:
   - Use the provided APIs to upload genomic data to IPFS.
   - The IPFS hash will be stored on the Hyperledger Fabric blockchain.

2. **Query Genomic Data**:
   - Query genomic data using the blockchain network to retrieve associated IPFS hashes.

3. **Find Common Variants**:
   - Use the provided scripts to compare data across multiple genomic datasets.

---

## Support

For any issues or questions, please open an issue on the GitHub repository or contact the project maintainers.
