var ethers = require('ethers')

export default {
  signing(wallet, transaction){
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
  }
}