//const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function storeHash(hash, username) {
	try{
		const { Gateway, Wallets } = require('fabric-network');

	    const ccpPath = path.resolve(__dirname, '../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
	    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

	    const walletPath = path.join(__dirname, 'wallet');
	    const wallet = await Wallets.newFileSystemWallet(walletPath);

	    const gateway = new Gateway();
	    await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });

	    const network = await gateway.getNetwork('mychannel');
	    const contract = network.getContract('basic');

	    //await contract.submitTransaction('CreateAsset', `hash-${Date.now()}`, hash);
//	await contract.submitTransaction('CreateAsset', `hash-${Date.now()}`, hash, username, "genomicData", new Date().toISOString());

	
		 await contract.submitTransaction(
			     'CreateAsset',
			     `hash-${Date.now()}`,         // ID (string)
			      "genomicData",                // Color (string)
			          Math.floor(Date.now() / 1000), // Size (integer, Unix timestamp)
			              username,                     // Owner (string)
			                  100                           // AppraisedValue (integer)
			                  );
			                  
		                 
	    console.log(`Hash ${hash} stored on Hyperledger Fabric.`);
	    await gateway.disconnect();
	} catch (error) {
		        console.error('❌ Error uploading file to IPFS:', error.message);
		    }
}

module.exports = storeHash;

