<template>
 <div class="q-pa-sm">
  <div v-if="showCode">
    <canvas id="qr">
    </canvas>
  </div>
  <h6> Name:</h6>
  <p> {{name}} </p>
  <h6> Your address:</h6>
  <p> {{address}} </p>
  <h6> Your private key: </h6>
  <p v-if="show"> {{key}} </p>
  <div class="row justify-around">
    <q-btn color="black" label="Show" @click="show = !show" class="col-4.5"/>

    <q-btn color="black" label="Show As Qr-code" @click="showcode(key)"  class="col-4.5"/>
  </div>
   <q-item class="flex flex-center">
    <q-btn color="black" label="Sign transaction" @click="scan(key)"/>
   </q-item>
   <q-btn color="black" label="Back" @click="back()"/>
 </div>
</template>
<style>
  #qr{
    height: 200px
  }
</style>
<script>
var QRious = require('QRious')

var bitcoin = require('bitcoinjs-lib')
var testnet = bitcoin.networks.testnet
export default{
  

  data(){
   return{
    show: false,
    key: this.$route.params.key,
    name: this.$route.params.name,
    address: this.$route.params.address,
    showCode: false
   }
  },
  methods:{
   scan (key) {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          var bitcoin = require('bitcoinjs-lib')
          var text = confirm('We got a barcode\n' +
          'Result: ' + result.text + '\n')
          var tx = new bitcoin.TransactionBuilder()
          var pos1 = result.text.indexOf('"Input":"') + 8
          var pos2 = result.text.indexOf('"Output":"') + 9
          var pos3 = result.text.indexOf('"Amount":"') + 9
          let str1 = result.text.substring(pos1 + 1, result.text.indexOf('"', pos1 + 1))
          alert(str1)
          let str2 = result.text.substring(pos2 + 1, result.text.indexOf('"', pos2 + 1))
          alert(str2)
          let amount = result.text.substring(pos3 + 1, result.text.indexOf('"', pos3 + 1))
          alert(amount * 100000000)
          tx.addInput(str1, 1)
          tx.addOutput(str2, amount * 1000000)
          alert(key.toWIF())
          tx.sign(0, key)
          alert(tx.build().toHex())
          if (text !== Boolean(false)) {
            cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, tx.build().toHex(), function (success) {
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
    back(){
        this.$router.push ({name: 'Ethereum' })
    },
    showcode(key){
      this.showCode = true;
      var qr = new QRious({
        element: document.getElementById('qr'),
        value: key,
        level: 'H',
        size: 1000,
      })

      

    }
  }
} 
</script>