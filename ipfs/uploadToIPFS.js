//const { create } = require('ipfs-http-client');
const fs = require('fs');

//const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' });

async function uploadFile(filePath) {
	try{
		const { create } = await import('ipfs-http-client');
		const ipfs = create({ host: '127.0.0.1', port: 5001, protocol: 'http' });

	    const fileContent = fs.readFileSync(filePath);
	    const result = await ipfs.add(fileContent);
	    console.log('File uploaded to IPFS:', result.path);
	    return result.path;
	} catch (error) {
		        console.error('❌ Error uploading file to IPFS:', error.message);
		    }
}

module.exports = uploadFile;

