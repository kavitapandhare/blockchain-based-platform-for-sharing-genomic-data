const fs = require('fs');
const path = require('path');
const { Gateway, Wallets } = require('fabric-network');
const { create } = require('ipfs-http-client');

const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' });

// 🧬 Extract variant to search from command line
const variantToSearch = process.argv[2];
if (!variantToSearch) {
	    console.error("❌ Please provide a variant to search. Format: chr1-12345-C-T");
	    process.exit(1);
}

async function fetchStoredHashes() {
	    try {
		            console.log(`🔍 Searching for variant: ${variantToSearch}\n`);

		            // Load connection profile
		            const ccpPath = path.resolve(__dirname, '../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
		            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

		            // Load the wallet
		            const walletPath = path.join(__dirname, 'wallet');
		            const wallet = await Wallets.newFileSystemWallet(walletPath);

		            // Connect to Fabric Gateway
		            const gateway = new Gateway();
		            await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

		            // Get network and contract
		            const network = await gateway.getNetwork('mychannel');
		            const contract = network.getContract('basic');

		           //  Fetch stored assets
		            const result = await contract.evaluateTransaction('GetAllAssets');
		            const assets = JSON.parse(result.toString());

		            if (assets.length === 0) {
				                console.log("⚠ No files found in the ledger.");
				                return;
				            }

		            let found = false;

		            for (const asset of assets) {
				                const hash = asset.ID.replace('hash-', '');

				                try {
							                let jsonData = '';
							                for await (const chunk of ipfs.cat(hash)) {
										                    jsonData += chunk.toString();
										                }

							                const parsed = JSON.parse(jsonData);
							           //     const variants = parsed.variants || [];
let variants = [];

							if (parsed.variants) {
								variants = parsed.variants.map(v => ({
									        chr: v.chr,
									        position: v.position,
									        ref: v.ref,
									        alt: v.alt
									    }));
							} else if (parsed.datasets) {
							parsed.datasets.forEach(dataset => {
								        if (dataset.variants) {
				            dataset.variants.forEach(v => {
				              const chr = v.chromosome;								                    const pos = v.position;
				             const ref = v.referenceBases;
			  	             const alts = v.alternateBases;
			      alts.forEach(alt => {												                        variants.push({ chr, position: pos, ref, alt });
			            });
												                });
										        }
								    });
							}
					 for (const v of variants) {							                    const variantStr = `${v.chr}-${v.position}-${v.ref}-${v.alt}`;
				             if (variantStr === variantToSearch) {
													                            console.log(`✅ Found variant in file with IPFS hash: ${hash}`);
													                            console.log(`   👤 Uploaded By: ${asset.Owner}`);
													                            console.log(`   📂 File Type: ${asset.Color}`);
													                            console.log(`   🕒 Timestamp: ${new Date(asset.Size * 1000).toLocaleString()}`);
													                            console.log(`   💰 Appraised Value: ${asset.AppraisedValue}`);
													                            console.log('------------------------------------------------------');
													                            found = true;
													                            break;
													                        }
										                }

							            } catch (err) {
			               console.error(`❌ Error reading IPFS file for hash ${hash}: ${err.message}`);
									                }
				            }

		            if (!found) {
				                console.log(`❌ Variant "${variantToSearch}" not found in any files.`);
				            }

		            await gateway.disconnect();

		        } catch (error) {
				        console.error('❌ Error fetching stored file hashes:', error.message);
				    }
}

fetchStoredHashes();

