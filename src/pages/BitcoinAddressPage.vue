<template>
 <div class="q-pa-sm">
   <h6> Name:</h6>
   <p> {{name}} </p>
   <h6> Your address:</h6>
   <p> {{address}} </p>
   <h6> Your private key: </h6>
   <p v-if="show"> {{privateKey}} </p>
   <button @click="show = !show">Hide / Show</button>
   <h6> Your public key:</h6>
   <p> {{publicKey}} </p>
   <q-item class="flex flex-center">
    <button @click="Scan(key)"> Sign transaction </button>
   </q-item>
   <button @click="Back()">Back</button>
 </div>
</template>

<script>
let bitcoin = require('bitcoinjs-lib')
let testnet = bitcoin.networks.testnet
export default{
  name:'bitcoinAddress',
  data(){
   return{
    show: false,
    key: this.$route.params.key,
    privateKey: this.$route.params.key.privateKey.toString('hex'),
    publicKey: this.$route.params.key.publicKey.toString('hex'),
    name: this.$route.params.name,
    address: this.$route.params.address
   }
  },
  methods:{
   Scan (key) {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          let text = confirm('We got a barcode\n' +
          'Result: ' + result.text + '\n')
          let tx = new bitcoin.TransactionBuilder()
          let pos1 = result.text.indexOf('"Input":"') + 8
          let pos2 = result.text.indexOf('"Output":"') + 9
          let pos3 = result.text.indexOf('"Amount":"') + 9
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
    Back(){
        this.$router.go(-1)
    }
  }
} 
</script>