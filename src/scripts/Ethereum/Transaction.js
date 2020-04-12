var ethers = require('ethers')
var QRious = require('QRious')

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
                    console.log('Singed Transaction: \n' + signedTransaction)

                    var qr = new QRious({
                      element: document.getElementById('qr-transaction'),
                      value: signedTransaction,
                      level: 'H',
                      size: 1000,
                    })
                    

                    return signedTransaction

                    
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
  createMultiSigTransaction(privateKey, transaction, contractAddress){
    let provider = ethers.getDefaultProvider('ropsten');
    
    let wallet = new ethers.Wallet(privateKey, provider);
    
    var abiJSON = new Contract().abiJSON
    var iface = new ethers.utils.Interface(abiJSON);
    var func = iface.functions.submitTransaction;

    transaction.data = func.encode([transaction.to, transaction.value, transaction.data]);
    transaction.to = contractAddress;
    transaction.value = 0;

    this.signing(wallet, transaction)
  },

  confirmMultisigTransaction(privateKey, transaction, contractAddress, txNumber){
    let provider = ethers.getDefaultProvider('ropsten');
    
    let wallet = new ethers.Wallet(privateKey, provider);
    
    var abiJSON = new Contract().abiJSON
    var iface = new ethers.utils.Interface(abiJSON);
    var func = iface.functions.confirmTransaction;

    transaction.data = func.encode([txNumber]);
    transaction.to = contractAddress;
    transaction.value = 0;

    this.signing(wallet, transaction)
  },

  

}