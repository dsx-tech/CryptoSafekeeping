<template>
 <div class="q-pa-sm">
   <q-card class="no-margin">
   <h6> Your name:</h6>
   <p> {{name}} </p>
   <h6> Your address:</h6>
   <p> {{address}} </p>
   </q-card>
   <h6>Owners:</h6>
   
  <q-list>
    <q-item v-for="item in keylist" :key="item" class="q-my-sm" clickable v-ripple>

      <q-item-section>
        <q-item-label>{{ item }}</q-item-label>
      
      </q-item-section>
    </q-item>
  </q-list>

  <div class="col text-center">
      <q-btn label="Add holder" class="nextButton" @click="turnCameraOn()" v-show="!showCamera"/>
        <p class="text-subtitle1" v-if="address">Wallet address: <b>{{ address }}</b></p>
      <div v-if="showCamera">

        <qrcode-stream :camera="camera" @decode="onDecode">
        </qrcode-stream>
      </div>
  </div>

  <q-card-actions align="right" class="text-primary">
    <q-btn flat label="Cancel" @click="cancel()"/>

    <q-btn flat label="Save" @click="SaveAddresses()" v-close-popup />
  </q-card-actions>

  <q-item class="flex flex-center">
    <button @click="createWallet()"> Create wallet </button>
  </q-item>
  <div class="wrap-code">
    <canvas id="qr-transaction"></canvas>
    <canvas id="qr-transaction-1" class="qr-code"></canvas>
    <canvas id="qr-transaction-2" class="qr-code"></canvas>
    <canvas id="qr-transaction-3" class="qr-code"></canvas>
    <canvas id="qr-transaction-4" class="qr-code"></canvas>
    <canvas id="qr-transaction-5" class="qr-code"></canvas>
    <canvas id="qr-transaction-6" class="qr-code"></canvas>
    <canvas id="qr-transaction-7" class="qr-code"></canvas>
    <canvas id="qr-transaction-8" class="qr-code"></canvas>
    <canvas id="qr-transaction-9" class="qr-code"></canvas>
    <canvas id="qr-transaction-10" class="qr-code"></canvas>
    <canvas id="qr-transaction-11" class="qr-code"></canvas>
    <canvas id="qr-transaction-12" class="qr-code"></canvas>
    <canvas id="qr-transaction-13" class="qr-code"></canvas>
    <canvas id="qr-transaction-14" class="qr-code"></canvas>
    <canvas id="qr-transaction-15" class="qr-code"></canvas>
    <canvas id="qr-transaction-16" class="qr-code"></canvas>
    <canvas id="qr-transaction-17" class="qr-code"></canvas>
    <canvas id="qr-transaction-18" class="qr-code"></canvas>
    <canvas id="qr-transaction-19" class="qr-code"></canvas>
    <canvas id="qr-transaction-20" class="qr-code"></canvas>
  </div>
    <button @click="Back()">Back</button>
 </div>
</template>

<style scoped>
  .class {
    width: 100%;
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

<script>
import QRcode from '../scripts/Ethereum/QRcode.js'
import { QrcodeStream } from 'vue-qrcode-reader'
import managBD from '../scripts/Ethereum/ManagBD.js'
import Address from '../scripts/Ethereum/Address.js'

export default{
  name: 'PageIndex',
  components: { QrcodeStream },
  data(){
   return{
    show: false, 
    signs: this.$route.params.signs,
    holders: this.$route.params.holders,
    keylist: this.$route.params.keylist.split(';'),
    address: this.$route.params.address,
    name: this.$route.params.name,
    isValid: undefined,
    camera: 'auto',
    result: null,
    showCamera: false,
   }
  },
  
  beforeMount(){
    console.log('res' + this.$route.params.keylist)
  },
  methods: {

    async onDecode (content) {
      this.result = content
      this.turnCameraOff()
    },
    turnCameraOn () {
      if (this.$q.platform.is.mobile){
        let temp = this.keylist.filter(function (el) {
          return el != "";
        })
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            alert(result.text)
            temp.push(result.text)
          }
        )
        this.keylist = temp
        console.log(temp)
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
    Back(){
      this.$router.push ({name: 'Ethereum' })
    },
    SaveAddresses(){
      let keyListStr = "";
      this.keylist.forEach(element => keyListStr += element.toString() + ';')
      managBD.InsertMultisigDb(null, this.walletName, this.countHolders, this.countSigns, keyListStr)
      alert("Saved successfully")
    },
    cancel(){
      for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
      this.$router.push ({name: 'Ethereum' })
    },
    createWallet(){
      let owners = this.keylist.filter(function (el) {
          return el != "";
        })
      console.log(owners)
      Address.newMultisigAddress(this.holders, owners)
    }
  }
}
</script>
