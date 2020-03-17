var ethers = require('ethers')
import Contract from './contracts/Contract.js'


export default {
  data(){
    return {
      transaction: tx
    }
  },

  signing(wallet, transaction){

    let signPromise = wallet.sign(transaction)

    signPromise.then((signedTransaction) => {
                    console.log(signedTransaction)
                    
                    //return signedTransaction
                    
                    // try {
                    //     cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, signedTransaction, function (success) {
                    //         alert('encode success: ' + success)
                    //     }, function (fail) {
                    //         alert('encoding failed: ' + fail)
                    //     }
                    //         )
                    // } catch (error) {
                    //     alert(error)
                    // }
    }, reject => {
      console.log(err)
    })
  },

  //to do arguments: wallet, transaction
  createMultiSigTransaction(wallet){
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

  confirmMultisigTransaction(privateKey, transaction, txNumber){
    let provider = ethers.getDefaultProvider('ropsten');
    
    let wallet = new ethers.Wallet(privateKey, provider);
    
    var abiJSON = new Contract().abiJSON
    var iface = new ethers.utils.Interface(abiJSON);
    var func = iface.functions.confirmTransaction;
    transaction.data = func.encode([txNumber]);

    this.signing(wallet, transaction)
  },

  

}