var ethers = require('ethers');

import Addresses from './Address.js'
import Transaction from './Transaction.js'
import Contract from './contracts/contract.js'

//const abi = JSON.stringify(abiJSON);
//const abiToken = JSON.stringify(abiJSONToken);

var cc = new Contract()
//const bytecode = CONTRACT.BYTECODE;
console.log(cc.BYTECODE)
//const bytecodeToken = '0x608060405234801561001057600080fd5b50610b30806100206000396000f3006080604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100a9578063095ea7b31461013957806318160ddd1461019e57806323b872dd146101c9578063313ce5671461024e578063475a9fa91461027f57806370a08231146102cc57806395d89b4114610323578063a9059cbb146103b3578063dd62ed3e14610418575b600080fd5b3480156100b557600080fd5b506100be61048f565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100fe5780820151818401526020810190506100e3565b50505050905090810190601f16801561012b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561014557600080fd5b50610184600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506104c8565b604051808215151515815260200191505060405180910390f35b3480156101aa57600080fd5b506101b36105ba565b6040518082815260200191505060405180910390f35b3480156101d557600080fd5b50610234600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506105c0565b604051808215151515815260200191505060405180910390f35b34801561025a57600080fd5b50610263610829565b604051808260ff1660ff16815260200191505060405180910390f35b34801561028b57600080fd5b506102ca600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061082e565b005b3480156102d857600080fd5b5061030d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061088e565b6040518082815260200191505060405180910390f35b34801561032f57600080fd5b506103386108d6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561037857808201518184015260208101905061035d565b50505050905090810190601f1680156103a55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156103bf57600080fd5b506103fe600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061090f565b604051808215151515815260200191505060405180910390f35b34801561042457600080fd5b50610479600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a7d565b6040518082815260200191505060405180910390f35b6040805190810160405280600a81526020017f5465737420546f6b656e0000000000000000000000000000000000000000000081525081565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60025481565b6000816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015801561068c575081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b151561069757600080fd5b816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b600181565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550806002600082825401925050819055505050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6040805190810160405280600281526020017f545400000000000000000000000000000000000000000000000000000000000081525081565b6000604060048101600036905014151561092857600080fd5b826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561097557600080fd5b826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a3600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050929150505600a165627a7a7230582057e5d7b636453410354f1de51c937109e64be8deb3af726ca15a94b29791e9110029'


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
  data () {
    return {
      message: '',
      contacts,
      confirm: false
    }
  },

  methods: {

    Address () {
		return Addresses.newAddress();
    },

    MultisigAddress() {
		return Addresses.newMultisigAddress();
    },

    Scan (key) {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          var ethers = require('ethers')
          
          alert(result.text)
          let json_result = JSON.parse(result.text)

           /*
            //TO enter in JSON
            {
                      nonce: 48,
                      gasLimit: 21000,
                      gasPrice: 2000000000,

                      to: "0x6692d46B5319a0AE807264155C6725EF951378eD",

                      value: 0.05,
                      data: "0x",

                      // This ensures the transaction cannot be replayed on different networks
                      chainId: "ropsten"
                    }
            */

          var text = confirm('Transaction details' +
            '\n' + 'from: ' + '\n' + '\n' +
                      'to: ' + '\n' + json_result.to + '\n' + '\n' +
                      'Gas Limit: ' + json_result.gasLimit + '\n' +
                      'Gas Price: ' + json_result.gasPrice + '\n' +
                      'Value: ' + json_result.value + '\n' +
                      'nonce: ' + json_result.nonce + '\n' +
                      'data: ' + json_result.data + '\n' +
                      'chain: ' + json_result.chainId
          )

          let transaction = {
                nonce: json_result.nonce,
                gasLimit: json_result.gasLimit,
                gasPrice: ethers.utils.bigNumberify(json_result.gasPrice)._hex,//.toString(16),//_hex, 
                to: json_result.to, 
                value: ethers.utils.parseEther(json_result.value + "")._hex,//.toString(16),//._hex, 
                data: json_result.data,
                chainId: ethers.utils.getNetwork(json_result.chainId).chainId    
            }

            //key = '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a'
            let wallet = new ethers.Wallet(key)
            // nonce: 24
			Transaction.signing(wallet, transaction)
        }
      )
    },

    DesktopSending() {
          let json_result =
            //TO enter in JSON
            {
                      nonce: 49,
                      gasLimit: 2100000,
                      gasPrice: 2000000000,

                      to: "0x6692d46B5319a0AE807264155C6725EF951378eD",

                      value: 1.55,
                      data: "0x",

                      // This ensures the transaction cannot be replayed on different networks
                      chainId: "ropsten"
                    }
            

          var text = console.log('Transaction details' +
            '\n' + 'from: ' + '\n' + '\n' +
                      'to: ' + '\n' + json_result.to + '\n' + '\n' +
                      'Gas Limit: ' + json_result.gasLimit + '\n' +
                      'Gas Price: ' + json_result.gasPrice + '\n' +
                      'Value: ' + json_result.value + '\n' +
                      'nonce: ' + json_result.nonce + '\n' +
                      'data: ' + json_result.data + '\n' +
                      'chain: ' + json_result.chainId
          )

          let transaction = {
                nonce: json_result.nonce,
                gasLimit: json_result.gasLimit,
                gasPrice: ethers.utils.bigNumberify(json_result.gasPrice)._hex,//.toString(16),//_hex, 
                to: json_result.to, 
                value: ethers.utils.parseEther(json_result.value + "")._hex,//.toString(16),//._hex, 
                data: json_result.data,
                chainId: ethers.utils.getNetwork(json_result.chainId).chainId    
            }

            let key = '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a'
            let wallet = new ethers.Wallet(key)
            // nonce: 24
            let signPromise = wallet.sign(transaction)
            signPromise.then((signedTransaction) => {
                    console.log("signed transaction: " + signedTransaction)
                    try {
                        cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, signedTransaction, function (success) {
                            console.log('encode success: ' + success)
                        }, function (fail) {
                            console.log('encoding failed: ' + fail)
                        }
                            )
                    } catch (error) {
                        console.log(error)
                    }
                        

                })
        },

    CreateMultisigContract(){
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

    CallMultiSig(){ //creating transaction to send tokens
        let provider = ethers.getDefaultProvider('ropsten');
        
        let privateKey = '0x51cf48d3ac567c2cf65540d49f92cb8f50bba3a8b9b329814d96ad188dd70da8';
        
        let wallet = new ethers.Wallet(privateKey, provider);
        //TO DO scan from QR-code
        let contractAddress = "0x6692d46B5319a0AE807264155C6725EF951378eD";
        let contract = new ethers.Contract(contractAddress, abi, wallet);
        
        var iface = new ethers.utils.Interface(abiJSON);
        console.log(iface.functions);
        var func = iface.functions.submitTransaction;
        //var func = contract.functions.isOwner('0x00F7357E503B6cE0622Cf5311739dA27EDF4a875')
        
        console.log('func data: ' + func.encode(['0x3b94F6446C1EB46472B246d40dC99162C271c3D4', 10, '0xa9059cbb0000000000000000000000006692d46b5319a0ae807264155c6725ef951378ed00000000000000000000000000000000000000000000000000000000000003e8']))

        var tx = {
            gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
            gasLimit: 8000000,
            data: func.encode(['0x3b94F6446C1EB46472B246d40dC99162C271c3D4', 0, '0xa9059cbb0000000000000000000000006692d46b5319a0ae807264155c6725ef951378ed00000000000000000000000000000000000000000000000000000000000003e8']),
            to: contractAddress,
            nonce: 12,
            chainId: 3
        }

        var signedTransaction = wallet.sign(tx);
        signedTransaction.then((signedTransaction) => console.log("signeddd: " + signedTransaction));
        
	},

	ConfirmMultiSig(){
        let provider = ethers.getDefaultProvider('ropsten');
        
        let privateKey = '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a';
        
        let wallet = new ethers.Wallet(privateKey, provider);
        //TO DO scan from QR-code
        let contractAddress = "0x6692d46B5319a0AE807264155C6725EF951378eD";
        let contract = new ethers.Contract(contractAddress, abi, wallet);
        
        var iface = new ethers.utils.Interface(abiJSON);
        console.log(iface.functions);
        var func = iface.functions.confirmTransaction;
        //var func = contract.functions.isOwner('0x00F7357E503B6cE0622Cf5311739dA27EDF4a875')
        
        console.log('func data: ' + func.encode([4]))

        var tx = {
            gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
            gasLimit: 8000000,
            data: func.encode([8]),
            to: contractAddress,
            nonce: 58,
            chainId: 3
        }

        var signedTransaction = wallet.sign(tx);
        signedTransaction.then((signedTransaction) => console.log("signeddd: " + signedTransaction));
        
	},
	
	TokenContract(){   //testing single-sig contract
		let provider = ethers.getDefaultProvider('ropsten');
        
        let privateKey = '0x9EA9EDB02DEA132BBF903299397496E51B6068D12DA040F0BD9FC503F60673B0';
        
        let wallet = new ethers.Wallet(privateKey, provider);
        //TO DO scan from QR-code
        let contractAddress = "0x3b94F6446C1EB46472B246d40dC99162C271c3D4";
        let contract = new ethers.Contract(contractAddress, abiToken, wallet);
        
        var iface = new ethers.utils.Interface(abiToken);
        console.log(iface.functions);
        var func = iface.functions.transfer;
        //var func = contract.functions.isOwner('0x00F7357E503B6cE0622Cf5311739dA27EDF4a875')
        
        //console.log('func data: ' + func.encode(['0x98773812A261A98Bb73d00EC9B72dEA0BD2a9479', '0x6692d46B5319a0AE807264155C6725EF951378eD', 1000]))

        var tx = {
            gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
            gasLimit: 8000000,
            data: func.encode(['0x6692d46B5319a0AE807264155C6725EF951378eD', 1000]),
            to: contractAddress,
            nonce: 10,
            chainId: 3
        }

        var signedTransaction = wallet.sign(tx);
        signedTransaction.then((signedTransaction) => console.log("signeddd: " + signedTransaction));

		
	}
  }
}