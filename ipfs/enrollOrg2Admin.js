const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

async function main() {
	    try {
		            // Load connection profile
		    const ccpPath = path.resolve(__dirname, '../fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/connection-org2.json');
		            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

		            // Create a new CA client
		    const caURL = ccp.certificateAuthorities['ca.org2.example.com'].url;
		            const ca = new FabricCAServices(caURL);

		            // Create a new wallet
		    const walletPath = path.join(__dirname, 'walletOrg2');
		            const wallet = await Wallets.newFileSystemWallet(walletPath);
		            console.log(`Wallet path: ${walletPath}`);

		            // Check if admin identity already exists
		    const adminIdentity = await wallet.get('admin');
		            if (adminIdentity) {
				                console.log('Admin identity already exists in the wallet.');
				                return;
				            }

		            // Enroll the admin user
		    const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
		            const identity = {
				                credentials: {
							                certificate: enrollment.certificate,
							                privateKey: enrollment.key.toBytes(),
							            },
				                mspId: 'Org2MSP',
				                type: 'X.509',
				            };

		            await wallet.put('admin', identity);
		            console.log('Successfully enrolled admin user and stored in wallet2.');
		        } catch (error) {
				        console.error(`Failed to enroll admin user: ${error}`);
				        process.exit(1);
				    }
}

main();
