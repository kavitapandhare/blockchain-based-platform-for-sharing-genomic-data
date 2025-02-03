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

## Project Directory Structure

```
├── fabric-samples/
│   ├── test-network/
│   ├── chaincode/
├── ipfs/
│   ├── wallet/
│   ├── enrollAdmin.js
│   ├── enrollUser.js
│   ├── main.js
│   ├── package.json
│   ├── README.md
```

## Prerequisites

Before running the scripts, ensure you have installed the following:

- **Hyperledger Fabric** (Fabric binaries and Docker images)
- **IPFS** (Installed and running)
- **Node.js** (Version 14 or later)
- **Docker & Docker Compose**
- **Git & cURL**

## Installation Guide
Follow the installation guide available at [this link](https://github.com/kavitapandhare/Implementation-of-hyperledgerFabric-with-IPFS/blob/main/README.md) for detailed instructions.

## Network Topology

The blockchain network consists of:
- **2 Organizations**: Org1 and Org2.
- **2 Peers per Organization**: Peer0 and Peer1 for both Org1 and Org2.
- **Channel**: A single channel named `mychannel` is used for communication.
- **Chaincode**: Deployed on the channel to enable genomic data transactions.

This setup is designed to facilitate secure, distributed genomic data sharing.

---

## Steps to Upload File to IPFS and Store Hash on Hyperledger Fabric

### 1. Enroll Admin

**Script Name:** `enrollAdmin.js`

This script registers and enrolls the admin identity required to interact with the blockchain.

**How to Run:**

- Make sure your Fabric network is running.
- Run the script with:
  ```sh
  node enrollAdmin.js
  ```
- This will create an admin identity and store it inside the `wallet/` directory.
- **Ensure that the correct path is set in the script:**
  ```javascript
  const ccpPath = path.resolve(__dirname, '../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
  ```

### 2. Enroll User

**Script Name:** `enrollUser.js`

This script registers and enrolls a user identity to interact with the blockchain.

**How to Run:**

- Ensure the admin identity is enrolled.
- Run the script with:
  ```sh
  node enrollUser.js
  ```
- This will create a user identity and store it inside the `wallet/` directory.
- **Ensure that the correct path is set in the script:**
  ```javascript
  const ccpPath = path.resolve(__dirname, '../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
  ```

### 3. Upload File to IPFS and Store Hash in Hyperledger Fabric

**Script Name:** `main.js`

This script combines both file upload to IPFS and storing the hash on Hyperledger Fabric in one workflow. It is a combination of `uploadToIPFS.js` and `storeHashInFabric.js`.

**How to Run:**

- Ensure both IPFS and Hyperledger Fabric are running.
- Run the script with:
  ```sh
  node main.js
  ```
- This will upload the file to IPFS and store the resulting hash in Hyperledger Fabric.

## Troubleshooting

### 1. Parameter Type Issues in Chaincode

If you encounter the following error:

```sh
error managing parameter param2. conversion error. cannot convert passed value [value] to [expected type]
```

**Solution:**
This error typically occurs when the parameter types do not match what the chaincode expects.

#### Check the Chaincode `CreateAsset` Function:

The `CreateAsset` function in the chaincode expects the parameters to be:

- `id` (string)
- `color` (string)
- `size` (integer)
- `owner` (string)
- `appraisedValue` (integer)

Ensure that you are passing the correct types for each parameter:

- **String values** should be passed as strings (e.g., "genomicData").
- **Integer values** should be passed as numbers (e.g., 100).

Example: If you're passing the parameters like this:

```javascript
await contract.submitTransaction('CreateAsset', 'hash-12345', 'genomicData', 100, 'user1', 200);
```

This should work as expected.

### 2. Debugging Chaincode

If you continue to face issues, check the following:

- Ensure the chaincode is properly deployed and instantiated on the correct channel.
- Verify that the Fabric network is correctly configured, and the identity being used for the transaction has the necessary permissions.
- Check for any discrepancies in the chaincode logic related to type conversion.

### 3. Additional Notes

- Make sure the correct file path and username are provided in the scripts.
- Ensure that the Hyperledger Fabric network and IPFS are both running before executing the scripts.

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

## Conclusion

Following these steps, you can successfully integrate Hyperledger Fabric with IPFS, enroll users, upload files, and troubleshoot common chaincode issues. For further assistance, raise an issue in the repository.

---
