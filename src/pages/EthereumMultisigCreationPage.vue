<template>
  <q-page>

    <div class="q-pa-md q-pt-lg creationMs">
        <div class="row" style="padding: 20px 0px">
          <p class="col text-h6">Wallet name:</p>
          <q-input  class="col" filled autofocus v-model="walletName" :placeholder="walletName"/>
        </div>
        <div class="row justify-between" style="padding: 20px 0px">
          <p class="col-5 text-h6">Number of owners:</p>
          <q-select class="col-1" outlined v-model="countHolders" :options="options"/>
        </div>
        <div class="row justify-between" style="padding: 20px 0px">
          <p class="col-5 text-h6">Number of signs for transaction:</p>
          <q-select class="col-1" outlined v-model="countSigns" :options="options"/>
        </div>
        <div class="row justify-between" style="padding: 20px 0px">
          <p class="col-5 text-h6">Choose the net:</p>
          <q-select class="col-2" style="text-transform: uppercase;" outlined v-model="chosenNet" :options="nets"/>
        </div>
    </div>

    <q-card-actions align="right" class="text-primary">
      <q-btn class="mainButton" style="height: 50px; padding: 0px 15px" label="Cancel" @click="cancel()"/>

      <q-btn class="mainButton" style="height: 50px; padding: 0px 15px" label="Save" @click="SaveAddresses()" v-close-popup />
    </q-card-actions>


    <q-list>
      <q-item v-for="address in multAddresses" :key="address.id" class="q-my-sm" clickable v-ripple>

        <q-item-section>
          <q-item-label>{{ address }}</q-item-label>
        
        </q-item-section>
      </q-item>
    </q-list>


  </q-page>
</template>

<style src="../css/Ethereum/Ethereum.css"></style>

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
      nets: ['mainnet', 'ropsten', 'kovan', 'rinkeby', 'goerli'],
      options: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      model: null,
      chosenNet: 'mainnet'
    }
  },
  
  methods: {
    async onDecode (content) {
      this.result = content
      this.turnCameraOff()
    },
    turnCameraOn () {
      if (this.$q.platform.is.mobile){
        let temp = this.multAddresses.filter(function (el) {
          return el != "";
        })
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
    Back(){
        this.$router.push ({name: 'Ethereum' })
    },

    SaveAddresses(){
      let keyList = "";
      this.multAddresses.forEach(element => keyList += element.toString() + ';')
      managBD.InsertMultisigDb(null, this.walletName, this.countHolders, this.countSigns, keyList, this.chosenNet)
      alert("Saved successfully")
    },
    cancel(){
      this.$router.push ({name: 'Ethereum' })
    },
  }
}
</script>
