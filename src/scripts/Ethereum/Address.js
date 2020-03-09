var ethers = require('ethers')

const contacts = [ 
    {name: 'first', key: '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a'}, //0x55D73ccA422253a8a287074c6f4857Dd15EFdC46
    //4 ethers
    {name: 'second', key: '0x1778b368d6847f01cc48dc891598675db61500b31cfe6448eb564ccfdcab698c'}, // 0x00F7357E503B6cE0622Cf5311739dA27EDF4a875
    //3 ethers
    {name: 'third', key: '0x8358a123d279423f239dc2cbc5dede46975f9de654d800f594cbab4ae8faea34'}, //0xCe39AB30911Eeb024eB6316123339A4893337639
    {name: 'fourth', key: '0x51cf48d3ac567c2cf65540d49f92cb8f50bba3a8b9b329814d96ad188dd70da8'}, //0xE704eBE589b6ac907887D1997df7BF69A50D416E
	{name: 'fifth', key: '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a'},
	{name: 'sixth', key: '0x9EA9EDB02DEA132BBF903299397496E51B6068D12DA040F0BD9FC503F60673B0'}, //0x98773812A261A98Bb73d00EC9B72dEA0BD2a9479
]

export default {

	newAddress() {
		alert("fff");
      var pKey = ethers.Wallet.createRandom().privateKey
      alert('New wallets private key: ' + pKey)
      contacts.push({ id: 6, name: 'first wallet', key: pKey })
    },

    newMultisigAddress() {
	  let provider = ethers.getDefaultProvider('ropsten');
      
      let privateKey = '0x51cf48d3ac567c2cf65540d49f92cb8f50bba3a8b9b329814d96ad188dd70da8';
      
      let wallet = new ethers.Wallet(privateKey, provider);
      
      (async function() {

        let overrides = {
            gasLimit: 8000000,
            gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
            nonce: 1,
            chainId: 3
        }

        // Create an instance of a Contract Factory
        let factory = new ethers.ContractFactory(abi, bytecode, wallet);
        
        //console.log("factory: " + factory);
        let transaction = await factory.getDeployTransaction(['0x55D73ccA422253a8a287074c6f4857Dd15EFdC46', '0xE704eBE589b6ac907887D1997df7BF69A50D416E'], 2, overrides);
        //console.log(transaction)
        let signPromise = wallet.sign(transaction);
        //console.log("wallet : " + wallet.address);
      
        signPromise.then((signedTransaction) => console.log("deployed transaction: " + signedTransaction));

      })();
    },
}