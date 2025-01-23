# Blockchain-Based Platform for Sharing Genomic Data

This repository provides a blockchain-based platform for securely sharing genomic data using Hyperledger Fabric and IPFS. The project includes automated installation scripts for Linux, macOS, and Windows systems to streamline setup and deployment.

---

## Features

1. **Hyperledger Fabric Integration**: A blockchain network for data sharing.
2. **IPFS Storage**: Distributed file storage for genomic data.
3. **Automated Installation**: Scripts to install prerequisites and configure the system for various platforms.
4. **Cross-Platform Support**: Compatible with Linux, macOS, and Windows.

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

---
