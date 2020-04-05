<template>
  <q-page>
        <q-card-section>
          <div class="text-h6">Choose the number of address holders(maximum 15)</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="countHolders" autofocus @keyup.enter="CountDialog = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Ок" @click="CountRequared = true" v-close-popup />
        </q-card-actions>



        <q-card-section>
          <div class="text-h6">Select the number of signatures required to use your wallet(maximum 15)</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="countSigns" autofocus @keyup.enter="CountRequared = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />

          <q-btn flat label="Ok" @click="MultisigAddress(String(walletName), Number(countHolders), Number(countSigns))" v-close-popup />
        </q-card-actions>

        <q-card-section>
          <canvas id="qr">
          </canvas>
        </q-card-section>

        <div class="col text-center">
            <span class="text-subtitle1 text-grey-9">Press the button and scan a qrcode.</span>
            <q-btn color="blue-grey-10" rounded icon="camera_alt" label="Read QRCode"
              class="full-width" size="lg" @click="turnCameraOn()"
              v-show="!showCamera"/>

              <p class="text-subtitle1" v-if="address">Wallet address: <b>{{ address }}</b></p>
            <div v-if="showCamera">

              <qrcode-stream :camera="camera" @decode="onDecode">
              </qrcode-stream>
            </div>
        </div>

        <button @click="codeCordova()">for cordova</button>


  </q-page>

  




  
</template>

<style scoped>
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
import Addresses from '../scripts/Ethereum/Address.js'
import QRcode from '../scripts/Ethereum/QRcode.js'
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: 'PageIndex',
  components: { QrcodeStream },
  data () {
    return {
     countSigns: 0,
     walletName: 0,
     countHolders: 0,
     address: 0,
     walletName: this.$route.params.walletName,
     isValid: undefined,
     camera: 'auto',
     result: null,
     showCamera: false
    }
  },
  methods: {
    async onDecode (content) {
      this.result = content
      this.turnCameraOff()
    },
    turnCameraOn () {
      if (this.$q.platform.is.mobile){
        return QRcode.Scan();
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
    ExportKey(key){
    if (key !== Boolean(false)) {
            cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, key, function (success) {
              alert('encode success: ' + success)
            }, function (fail) {
              alert('encoding failed: ' + fail)
            }
            )
          } else {
            alert('error')
          }
    },
    Back(){
        this.$router.push ({name: 'Ethereum' })
    },

    MultisigAddress(walletName, countHolders, countSigns) {
      let arrOwners = [];
      
      for (let i = 0; i < countHolders; i++) {
        let newKey = prompt('Enter public key')
        alert(newKey)
        console.log(newKey)
        arrOwners.push(newKey)
      }

      this.$router.push({name: 'EthereumMultisigCreation'})
      Addresses.newMultisigAddress(countSigns, arrOwners);
      multisigContacts.push({name: walletName, address: 'undefined', holders: countHolders, signs: countSigns, ownersList: arrOwners})
    },

    codeCordova(){
      return QRcode.Scan();
    }
  }
}
</script>
