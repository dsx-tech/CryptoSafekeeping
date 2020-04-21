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
        

        var qr = new QRious({
          element: document.getElementById('qr-transaction-1'),
          value: parts[0],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-2'),
          value:  parts[1],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-3'),
          value:  parts[2],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-4'),
          value:  parts[3],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-5'),
          value:  parts[4],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-6'),
          value: parts[5],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-7'),
          value:  parts[6],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-8'),
          value:  parts[7],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-9'),
          value:  parts[8],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-10'),
          value:  parts[9],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-11'),
          value: parts[10],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-12'),
          value:  parts[11],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-13'),
          value:  parts[12],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-14'),
          value:  parts[13],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-15'),
          value:  parts[14],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-16'),
          value: parts[15],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-17'),
          value:  parts[16],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-18'),
          value:  parts[17],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-19'),
          value:  parts[18],
          level: 'L',
          size: 400,
        })

        var qr = new QRious({
          element: document.getElementById('qr-transaction-20'),
          value:  parts[19],
          level: 'L',
          size: 400,
        })
        // for (var i = 1; i < 99999; i++)
        //   window.clearInterval(i);
        var intervalID = window.setInterval(shortQR, 500);
        let countQR = 0
        console.log(intervalID)
        function shortQR() {
          //if (countQR == 20) { countQR = 0}
          console.log(countQR)
          var qr = new QRious({
            element: document.getElementById('qr-transaction'),
            value:  parts[countQR++ % 20],
            level: 'L',
            size: 400,
          })
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