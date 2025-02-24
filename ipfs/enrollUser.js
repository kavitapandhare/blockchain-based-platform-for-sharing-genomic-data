const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

async function main() {
	    try {
		            // Load connection profile
		    const ccpPath = path.resolve(__dirname, '../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
		            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

		            // Create a CA client
		    const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
		            const ca = new FabricCAServices(caURL);

		            // Create a new wallet
		    const walletPath = path.join(__dirname, 'wallet');
		            const wallet = await Wallets.newFileSystemWallet(walletPath);
		            console.log(`Wallet path: ${walletPath}`);

		            // Check if user1 is already enrolled
		    const existingUser = await wallet.get('user2');
		            if (existingUser) {
				                console.log("✅ User 'user2' already exists in the wallet. Skipping registration.");
				                return;
				            }

		            // Check if admin identity exists
		    const adminIdentity = await wallet.get('admin');
		            if (!adminIdentity) {
				                console.log("❌ Admin user not found. Run enrollAdmin.js first.");
				                return;
				            }

		            // Get the admin user context
		    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
		            const adminUser = await provider.getUserContext(adminIdentity, 'admin');

		            // Try to register the user
		    let enrollmentSecret;
		            try {
				                enrollmentSecret = await ca.register(
							                { affiliation: 'org1.department1', enrollmentID: 'user2', role: 'client' },
							                adminUser
							            );
				            } catch (error) {
						                if (error.errors && error.errors[0].code === 74) {
									                console.log("⚠️ User 'user2' is already registered. Proceeding with enrollment...");
									                enrollmentSecret = 'user2pw'; // Default secret if the user was registered before
									             } else {
									                             throw error;
									                                         }
									                                                 }
									
									            // Enroll the user
									const enrollment = await ca.enroll({
										            enrollmentID: 'user2',
										            enrollmentSecret: enrollmentSecret
										        });

		            // Create a new identity object for the wallet
		    const newUserIdentity = {
			                credentials: {
						                certificate: enrollment.certificate,
						                privateKey: enrollment.key.toBytes(),
						            },
			                mspId: 'Org1MSP',
			                type: 'X.509',
			            };

		            // Store the new user identity in the wallet
		    await wallet.put('user2', newUserIdentity);
		            console.log("✅ User 'user2' has been successfully registered and enrolled.");
		        } catch (error) {
				        console.error(`❌ Failed to enroll user2: ${error.message}`);
				        process.exit(1);
				    }
}

main();
