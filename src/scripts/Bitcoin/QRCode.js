
export default {
    Scan (key) {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          let text = confirm('We got a barcode\n' +
          'Result: ' + result.text + '\n')
          let pos1 = result.text.indexOf('"Input":"') + 8
          let pos2 = result.text.indexOf('"Output":"') + 9
          let pos3 = result.text.indexOf('"Amount":"') + 9
          let str1 = result.text.substring(pos1 + 1, result.text.indexOf('"', pos1 + 1))
          let str2 = result.text.substring(pos2 + 1, result.text.indexOf('"', pos2 + 1))
          let amount = result.text.substring(pos3 + 1, result.text.indexOf('"', pos3 + 1))
          key = bitcoin.ECPair.fromWIF (key)
          let tx = this.SignTransaction(str1, str2, amount, key)
          alert(tx)
          if (text !== Boolean(false)) {
            cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, tx, function (success) {
              alert('encode success: ' + success)
            }, function (fail) {
              alert('encoding failed: ' + fail)
            }
            )
          } else {
            alert('error')
          }
        }
      )
    },
    SignTransaction(str1, str2, amount, key){
      let tx = new bitcoin.TransactionBuilder()
      tx.addInput(str1, 1)
      tx.addOutput(str2, amount * 1000000)
      tx.sign(0, key)
      return tx.build().toHex()
    },        
}
