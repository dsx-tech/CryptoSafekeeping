<template>
  <div class="q-pa-sm">
      <div v-if="showCode">
    <canvas id="qr">
    </canvas>
  </div>
    <h6>Name:</h6>
    <p>{{name}}</p>
    <h6>Your address:</h6>
    <p>{{address}}</p>

    <h6>Your private key:</h6>
    <p v-if="show">{{privateKey}}</p>
    <button class="nextButton" @click="show = !show">Show/Hide</button>
    <h6>Your public key:</h6>
    <p>{{publicKey}}</p>

    <q-item class="flex flex-center">
      <button class="nextButton" @click="turnCameraOn(key)" v-show="!showCamera">Sign transaction</button>
    </q-item>

    <div class="list">
      <button @click="showcode(privateKey)" class="nextButton">Export private key</button>
      <button @click="showcode(publicKey)" class="nextButton">Export public key</button>
    </div>
    <button class="nextButton" @click="Back()">Back</button>
    <div v-if="showCamera">
      <button @click="turnCameraOff()" class="nextButton"> Close</button>
      <qrcode-stream :camera="camera" @decode="onDecode"></qrcode-stream>
    </div>
    <canvas id="qr-transaction"></canvas>
  </div>
</template>

<script>
import settings from "src/scripts/Bitcoin/settings.js";
import QRCode from "src/scripts/Bitcoin/QRCode.js";
import { QrcodeStream } from "vue-qrcode-reader";
let bitcoin = require("bitcoinjs-lib");
var QRious = require('QRious')

export default {
  components: { QrcodeStream },
  data() {
    return {
      show: false,
      name: this.$route.params.name,
      address: this.$route.params.address,
      key: bitcoin.ECPair.fromWIF(this.$route.params.key).toString("hex"),
      publicKey: bitcoin.ECPair.fromWIF(
        this.$route.params.key
      ).publicKey.toString("hex"),
      privateKey: bitcoin.ECPair.fromWIF(
        this.$route.params.key
      ).privateKey.toString("hex"),
      showCode: false,
      isValid: undefined,
      camera: 'auto',
      result: null,
      showCamera: false
    };
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    async onDecode(content) {
      this.result = content;
      this.turnCameraOff();
    },
    turnCameraOn(key) {
      if (this.$q.platform.is.mobile) {
        QRCode.Scan(key);
      } else {
        this.camera = "auto";
        this.showCamera = true;
      }
    },
    turnCameraOff() {
      this.camera = "off";
      this.showCamera = false;
    },
    showcode(key) {
      alert("fc")
      let qr = new QRious({
        element: document.getElementById('qr'),
        value: key,
        level: 'H',
        size: 1000,
      })
       this.showCode = true
       this.showCamera = true
    }
  }
};
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