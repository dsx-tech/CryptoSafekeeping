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
    <q-btn color="black" label="Sign transaction"  @click="turnCameraOn()" v-show="!showCamera"/>
   </q-item>
   <q-btn color="black" label="Back" @click="back()"/>

   <div v-if="showCamera">
          <q-btn color="black" label="Close" @click="turnCameraOff()"/>
          <qrcode-stream :camera="camera" @decode="onDecode">
          </qrcode-stream>
          
    </div>
    <canvas id="qr-transaction">
    </canvas>
 </div>

</template>



<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import QRcode from '../scripts/Ethereum/QRcode.js';
import Transaction from '../scripts/Ethereum/Transaction.js';
var QRious = require('QRious')


export default{
  name: 'PageIndex',
  components: { QrcodeStream },

  data(){
   return{
    show: false,
    key: this.$route.params.key,
    name: this.$route.params.name,
    address: this.$route.params.address,
    showCode: false,
    isValid: undefined,
    camera: 'auto',
    result: null,
    showCamera: false
   }
  },
  methods:{
   async onDecode (content) {
    this.result = content
    this.turnCameraOff()
    var ethers = require('ethers')
    
    let json_result = JSON.parse(content)

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
      let wallet = new ethers.Wallet(this.key)
      // nonce: 24
      Transaction.signing(wallet, transaction)
   },
   turnCameraOn () {
    if (this.$q.platform.is.mobile) {
      QRcode.ScanSingle(this.key);
    }
    else {  
      this.camera = 'auto'
      this.showCamera = true
    }
   },
   turnCameraOff () {
     this.camera = 'off'
     this.showCamera = false
   },

    back(){
        this.$router.push ({name: 'Ethereum' })
    },
    showcode(key){
      let qr = new QRious({
        element: document.getElementById('qr'),
        value: this.$route.params.key,
        level: 'H',
        size: 1000,
      })

      this.showCode = true
    },
  }
} 
</script>
<style scoped>
#qr{
  height: 200px
}
#qr-transaction{
  width: 70%;
}
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>