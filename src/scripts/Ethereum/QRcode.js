import Transaction from './Transaction.js'

export default {
    ScanSingle (key) {
        cordova.plugins.barcodeScanner.scan(
          async function (result) {
            var ethers = require('ethers')

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
}