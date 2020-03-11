var ethers = require('ethers')
import Contract from './contracts/Contract.js'

let tx = 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj';

export default {
  data(){
    return {
      transaction: tx
    }
  },

  signing(wallet, transaction){
    tx = 'fffffffffffffffffffffffffffffffff'
    let signPromise = wallet.sign(transaction)
            signPromise.then((signedTransaction) => {
                    alert(signedTransaction)
                    try {
                        cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, signedTransaction, function (success) {
                            alert('encode success: ' + success)
                        }, function (fail) {
                            alert('encoding failed: ' + fail)
                        }
                            )
                    } catch (error) {
                        alert(error)
                    }
                })
  },

  //to do arguments: wallet, transaction
  createMultiSigTransaction(){
    let provider = ethers.getDefaultProvider('ropsten');
        
    let privateKey = '0x51cf48d3ac567c2cf65540d49f92cb8f50bba3a8b9b329814d96ad188dd70da8';
    
    let wallet = new ethers.Wallet(privateKey, provider);
    //TO DO scan from QR-code
    let contractAddress = "0x6692d46B5319a0AE807264155C6725EF951378eD";

    var abiJSON = new Contract().abiJSON
    var iface = new ethers.utils.Interface(abiJSON);
    var func = iface.functions.submitTransaction;
    var transaction = {
        gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
        gasLimit: 8000000,
        data: func.encode(['0xCe39AB30911Eeb024eB6316123339A4893337639', 5, '0x']),
        to: contractAddress,
        nonce: 12,
        chainId: 3
    }

    this.signing(wallet, transaction)
  },

  confirmMultisigTransaction(){
    let provider = ethers.getDefaultProvider('ropsten');
        
    let privateKey = '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a';
    
    let wallet = new ethers.Wallet(privateKey, provider);
    //TO DO scan from QR-code
    let contractAddress = "0x6692d46B5319a0AE807264155C6725EF951378eD";
    
    var abiJSON = new Contract().abiJSON
    var iface = new ethers.utils.Interface(abiJSON);
    var func = iface.functions.confirmTransaction;

    var transaction = {
        gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
        gasLimit: 8000000,
        data: func.encode([8]),
        to: contractAddress,
        nonce: 58,
        chainId: 3
    }

    this.signing(wallet, transaction)
  },

  

}