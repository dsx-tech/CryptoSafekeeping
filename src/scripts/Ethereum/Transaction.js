var ethers = require('ethers')
var QRious = require('QRious')

import Contract from './contracts/Contract.js'


export default {
  data(){
    return {
      transaction: tx
    }
  },

  signing(wallet, transaction, isLongTransaction){
    console.log(transaction)
    let signPromise = wallet.sign(transaction)
    
    signPromise.then((signedTransaction) => {
      console.log("transaction: " + signedTransaction)
      if (!isLongTransaction) {
        var qr = new QRious({
          element: document.getElementById('qr-transaction'),
          value: signedTransaction,
          level: 'L',
          size: 500,
        })
      }
      else {
        let parts = signedTransaction.match(/.{1,1000}/g)

        var intervalID = window.setInterval(shortQR, 300);
        let countQR = 0
        console.log(intervalID)
        function shortQR() {
          //if (countQR == 20) { countQR = 0}
          console.log(countQR)
          var qr = new QRious({
            element: document.getElementById('qr-transaction'),
            value:  countQR + '-' + parts[countQR],
            level: 'L',
            size: 400,
          })
          countQR = (countQR + 1) % 20
        }
          


      }
    }, reject => {
      console.log("Error: invalid input transaction data")
    })
  },

  createMultiSigTransaction(privateKey, transaction, contractAddress){
    let provider = ethers.getDefaultProvider('ropsten');
    
    let wallet = new ethers.Wallet(privateKey, provider);
    
    var abiJSON = new Contract().abiJSON
    var iface = new ethers.utils.Interface(abiJSON);
    var func = iface.functions.submitTransaction;

    transaction.data = func.encode([transaction.to, transaction.value, transaction.data]);
    transaction.to = contractAddress;
    transaction.value = 0;

    this.signing(wallet, transaction, false)
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

    this.signing(wallet, transaction, false)
  },

  

}