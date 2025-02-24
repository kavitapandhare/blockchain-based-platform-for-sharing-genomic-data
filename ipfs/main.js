const uploadFile = require('./uploadToIPFS');
const storeHash = require('./storeHashInFabric');

async function main() {
	    const filePath = 'files/mito-test.json';
	    const username = 'user1';

	    const hash = await uploadFile(filePath);
	    await storeHash(hash, username);
}

main().catch(console.error);

