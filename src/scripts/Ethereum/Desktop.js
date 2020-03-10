var ethers = require('ethers');

export default {
    send(){
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
    
    createMultisSigTransaction(){
        let provider = ethers.getDefaultProvider('ropsten');
        
        let privateKey = '0x51cf48d3ac567c2cf65540d49f92cb8f50bba3a8b9b329814d96ad188dd70da8';
        
        let wallet = new ethers.Wallet(privateKey, provider);
        //TO DO scan from QR-code
        alert('ggg')
        let contractAddress = "0x6692d46B5319a0AE807264155C6725EF951378eD";
        //let contract = new ethers.Contract(contractAddress, abi, wallet);
        var abiJSON = new Contract().abiJSON

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

    confirmMultisSigTransaction(){
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
    }
}