<template>
 <div class="q-pa-sm">
   <h6> Name:</h6>
   <p> {{name}} </p>
   <h6> Your address:</h6>
   <p> {{address}} </p>
    
   <h6> Your private key: </h6>
   <p v-if="show"> {{privateKey}} </p>
   <button class="nextButton" @click="show = !show">Show/Hide</button>
   <h6> Your public key:</h6>
   <p> {{publicKey}} </p>
    
   <q-item class="flex flex-center">
   <button class="nextButton" @click="turnCameraOn(key)" v-show="!showCamera"> Sign transaction </button>
   </q-item>
   <button class="nextButton" @click="Back()">Back</button>
   <div v-if="showCamera">
    <qrcode-stream :camera="camera" @decode="onDecode">
    </qrcode-stream>
  </div>
 </div>
</template>

<script>
import settings from 'src/scripts/Bitcoin/settings.js'
import QRCode from 'src/scripts/Bitcoin/QRCode.js'
import { QrcodeStream } from 'vue-qrcode-reader'
let bitcoin = require('bitcoinjs-lib')

export default {
  data () {
    return {
      show: false,
      name: this.$route.params.name,
      address: this.$route.params.address,
      key: bitcoin.ECPair.fromWIF(this.$route.params.key).toString('hex'),
      publicKey: bitcoin.ECPair.fromWIF(this.$route.params.key).publicKey.toString('hex'),
      privateKey: bitcoin.ECPair.fromWIF(this.$route.params.key).privateKey.toString('hex'),
      camera: 'auto',
      result: null,
      showCamera: false
    }
  },
  methods: {
   Back(){
      this.$router.go(-1)
    },
    async onDecode (content) {
      this.result = content
      this.turnCameraOff()
    },
    turnCameraOn (key) {
      if (this.$q.platform.is.mobile){
        QRCode.Scan(key)
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
  }
}
</script>