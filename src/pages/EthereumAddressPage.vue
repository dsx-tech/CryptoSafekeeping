<template>
 <div class="q-pa-sm">
  <q-dialog v-model="overridesGas">
    <q-card>
      <q-card-section>
        <div class="text-h6">Enter parameters of transaction</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled v-model="gasLimit" label="Gas limit"/>
        <q-input filled v-model="gasPrice" label="Gas Price in gwei"/>
        <q-input filled v-model="nonceSender" label="Nonce"/>
        <q-input filled v-model="trNumber" label="Transaction ID"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Create" color="primary" v-close-popup @click="confirmTransaction()"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
  
  <div v-show="showCode" class="flex flex-center">
    <canvas id="qr">
    </canvas>
  </div>
  <h6> Name:</h6>
  <p> {{name}} </p>
  <h6> Your address:</h6>
  <p> {{address}} </p>
  <h6> Your private key: </h6>
  <p v-if="show"> {{key}} </p>
  <div class="flex flex-center row">
    <q-btn class="nextButton col" label="Show" @click="show = !show"/>

    <q-btn class="nextButton col" label="Show As Qr-code" @click="showCode = !showCode" />
  </div>
   <div class="flex flex-center row">
    <q-btn class="nextButton col" label="Sign transaction"  @click="turnCameraOn()" v-show="!showCamera"/>
    <q-btn class="nextButton col" label="Send tokens"  @click="tokens = true; turnCameraOn()" v-show="!showCamera"/>
    <q-btn class="nextButton col" label="Confirm transaction"  @click="overridesGas = true" v-show="!showCamera"/>
   </div>
   <q-btn color="black" label="Back" @click="back()"/>
   <h6 v-if="trDetails">Scan transactiom details</h6>
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
import ERC20 from '../scripts/Ethereum/ERC20Token.js';
var QRious = require('QRious')


export default{
  name: 'PageIndex',
  components: { QrcodeStream },

  mounted (){
    let qr = new QRious({
      element: document.getElementById('qr'),
      value: this.$route.params.key,
      level: 'H',
      size: 1000,
    })
  },

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
    showCamera: false,
    confirmation: false,
    gasPrice: null,
    gasLimit: null,
    overridesGas: null,
    nonceSender: null,
    trNumber: null,
    networkId: 3,
    tokens: false,
    tokenAddressIdentify: false,
    tempTransaction: null,
    trDetails: false
   }
  },
  methods:{
   async onDecode (content) {
     var ethers = require('ethers')
     if (this.confirmation) {
      let overrides = {
          gasLimit: parseInt(this.gasLimit),
          gasPrice: ethers.utils.parseUnits(this.gasPrice, 'gwei'),
          nonce: parseInt(this.nonceSender),
          chainId: this.networkId
      }
       Transaction.confirmMultisigTransaction(this.key, overrides, content, this.trNumber)
       this.confirmation = false
       this.turnCameraOff()   
     }
     else if (this.tokenAddressIdentify){
       console.log(this.tempTransaction)
       ERC20.transfer(this.key, this.tempTransaction, content)
       this.tokenAddressIdentify = false
       this.turnCameraOff()
     }
     else { 
       this.result = content
       this.turnCameraOff()      
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
            gasPrice: ethers.utils.bigNumberify(json_result.gasPrice)._hex,
            to: json_result.to, 
            value: ethers.utils.parseEther(json_result.value + "")._hex,
            data: json_result.data,
            chainId: ethers.utils.getNetwork(json_result.chainId).chainId    
        }

        if (this.tokens){
          this.tokenAddressIdentify = true
          this.tempTransaction = transaction
          this.tokens = false
          this.turnCameraOn()
        }
        else {
          let wallet = new ethers.Wallet(this.key)
          Transaction.signing(wallet, transaction, false)
        }
    }
   },
   turnCameraOn () {
    this.trDetails = true
    if (this.$q.platform.is.mobile) {
        cordova.plugins.barcodeScanner.scan(
          async function (result) {
            var ethers = require('ethers')
            let json_result = JSON.parse(result.text)
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
                  gasPrice: ethers.utils.bigNumberify(json_result.gasPrice)._hex,
                  to: json_result.to, 
                  value: ethers.utils.parseEther(json_result.value + "")._hex,
                  data: json_result.data,
                  chainId: ethers.utils.getNetwork(json_result.chainId).chainId    
              }
              let wallet = new ethers.Wallet(key)
              if (this.tokens)
                this.tokenAddress(transaction)
              else Transaction.signing(wallet, transaction)
          }
        )
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
    confirmTransaction(){
      this.confirmation = true
      this.turnCameraOn()
    },
    tokenAddress(transaction){
        let privateKey = this.key
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            alert(result.text)
            ERC20.transfer(privateKey, transaction, result.text)
          }
        )
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
