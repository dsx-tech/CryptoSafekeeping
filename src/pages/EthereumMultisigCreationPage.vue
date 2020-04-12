<template>
  <q-page>

    <div class="q-pa-md">
      <div class="q-pt-lg">
        <div>
          <q-select outlined v-model="countHolders" :options="options" label="Number of owners"/>
        </div>
        <div style="height: 50px">
        </div>
        <div class="col-1">
          <q-select outlined v-model="countSigns" :options="options" label="Number of signs for transaction"/>
        </div>
      </div>
    </div>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" @click="cancel()"/>

      <q-btn flat label="Save" @click="SaveAddresses()" v-close-popup />
    </q-card-actions>


    <q-list>
      <q-item v-for="address in multAddresses" :key="address.id" class="q-my-sm" clickable v-ripple>

        <q-item-section>
          <q-item-label>{{ address }}</q-item-label>
        
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
import managBD from '../scripts/Ethereum/ManagBD.js';

let multAddresses = [];

export default {
  name: 'PageIndex',
  components: { QrcodeStream },
  data () {
    return {
      multAddresses: [],
      countSigns: 0,
      walletName: 0,
      countHolders: 0,
      address: 0,
      walletName: this.$route.params.walletName,
      isValid: undefined,
      camera: 'auto',
      result: null,
      showCamera: false,
      options: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      model: null,
    }
  },
  
  methods: {
    async onDecode (content) {
      this.result = content
      this.turnCameraOff()
    },
    turnCameraOn () {
      if (this.$q.platform.is.mobile){
        let temp = this.multAddresses
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            alert(result.text)
            temp.push(result.text)
          }
        )
        this.multAddresses = temp


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

    SaveAddresses(){
      let keyList = "";
      this.multAddresses.forEach(element => keyList += element.toString() + ';')
      managBD.InsertMultisigDb(null, this.walletName, this.countHolders, this.countSigns, keyList)
      alert("Saved successfully")
    },

    cancel(){
      this.$router.push ({name: 'Ethereum' })
    }
  }
}
</script>
