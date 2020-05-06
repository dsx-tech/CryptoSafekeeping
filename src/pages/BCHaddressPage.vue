<template>
 <div class="q-pa-sm">
  <q-dialog v-model="deleting">
    <q-card>
      <q-card-section>
        All your funds will be lost! Do you really want to delete the wallet?
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Delete" color="primary" v-close-popup @click="removeWallet()"/>
      </q-card-actions>

    </q-card>
  </q-dialog>


  <q-dialog v-model="manualParameters">
    <q-card>
      <q-card-section>
        <div class="text-h6">Enter parameters of transaction</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled autofocus v-model="trValue" label="Value"/>
        <q-input filled autofocus v-model="trСomission" label="Comission"/>
        <q-input filled autofocus v-model="trAddress" label="Address"/>
         <q-input filled autofocus v-model="transaction" label="ID transaction"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Sign" color="primary" v-close-popup  @click="signManual(String(trValue), String(trAddress), String(transaction), String(trСomission))"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="typeEntering">
    <q-card>
      <q-card-section>
        <div class="text-h6">Chose the type of entering parameters</div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Manual" @click="manualParameters = true" v-close-popup/>
        <q-btn flat label="By QR-code" @click="turnCameraOn()" v-show="!showCamera" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <div class="prop-text flex column">
    <div class="col" style="margin: 80px auto">
      <p class="text-h3" style="font-weight: bold"> {{name}} </p>
    </div>
    <div style="padding: 0px 5%; width: 100%;  margin-bottom: 50px;">

      <div class="row" style="padding: 0px 0px;">
        <div class="col">
          <b class="text-h6">Your address:</b>
        </div>
        <div class="col" style="text-align: right">
          <b class="text-h6">{{address}} </b>
          <q-btn class="mainButton" label="show as Qr-code" style="width: 80%; margin-right: -2.5%; height: 40px; padding: 0px" @click="showCodeAddress= !showCodeAddress" />
        </div>
      </div> 

      <div v-if="show" class="row" style="padding: 0px 0px;">
        <div class="col">
          <b class="text-h6">Your private key:</b>
        </div>
        <div class="col-10" style="text-align: right;">
          <b class="text-h6">{{privateKey}}  </b>
          <q-btn class="mainButton" label="show as Qr-code" style="width: 50%; margin-right: -2.5%; height: 40px; padding: 0px" @click="showCode = !showCode" />
        </div>
      </div> 
    </div>
  </div>

  <div style="position: absolute; color: #ffffff; right: 1%; top: 60px">
    <p style="text-transform: uppercase;"> {{net}} </p>
  </div>

  <div v-show="showCode" class="flex flex-center code">
    <canvas id="qr">
    </canvas>
    <q-btn class="mainButton" label="Hide"  @click="showCode = false" v-show="!showCamera"/>
  </div>

  <div v-show="showCodeAddress" class="flex flex-center code">
    <canvas id="qr-address">
    </canvas>
    <q-btn class="mainButton" label="Hide"  @click="showCodeAddress = false" v-show="!showCamera"/>
  </div>

  <div class="row justify-between">
    <q-btn class="mainButton col" label="Show private key" @click="show = !show"/>

  </div>
  <div class="row justify-between">
    <q-btn class="mainButton" label="Back" @click="Back()"/>
    <q-btn class="mainButton col" label="Sign transaction"  @click="typeEntering = true" v-show="!showCamera"/>
  </div>
  
  
  <div style="width: 100%">
    <q-btn class="mainButton" label="Remove the wallet" style="font-size: 0.8em; margin: 0px 40% 0px 34%; width: 20%; min-width: 200px; height: 40px; padding: 0px; background-color: #702A31" @click="deleting = true" v-show="!showCamera"/>
  </div>
   <!-- <h6 v-if="trDetails" style="font-color = white">Scan transactiom details</h6> -->
   <div v-if="showCamera">
          <qrcode-stream :camera="camera" @decode="onDecode">
          </qrcode-stream>
          <q-btn class="mainButton" label="Close" @click="turnCameraOff()"/>
    </div>
  <div v-show="showCodeTr" class="flex flex-center code">
    <canvas id="qr-transaction">
    </canvas>
    <q-btn class="mainButton" label="Hide"  @click="showCodeTr = false" v-show="!showCamera"/>
  </div>
 </div>

</template>



<script>
import settings from "src/scripts/Bitcoin/settings.js";
import QRCode from "src/scripts/Bitcoin/QRCode.js";
import { QrcodeStream } from "vue-qrcode-reader";
import Transaction from '../scripts/BCH/Transaction.js';
let bitcoin = require("bitcoinjs-lib");
var bch = require('bitcore-lib-cash');
var QRious = require('QRious')
var Address = bch.Address;

export default {
    components: { QrcodeStream },

    mounted (){
      let qr = new QRious({
        element: document.getElementById('qr'),
        value: this.$route.params.key,
        level: 'H',
        size: 1000,
      });

      let qrAddress = new QRious({
        element: document.getElementById('qr-address'),
        value: this.$route.params.address,
        level: 'H',
        size: 1000,
      })
    },
  data() {
    return {
      show: false,
      name: this.$route.params.name,
      address: this.$route.params.address,
      signkey: bitcoin.ECPair.fromWIF(
        this.$route.params.key
      ),
      key: this.$route.params.key.toString("hex"),
      publicKey: bitcoin.ECPair.fromWIF(
        this.$route.params.key
      ).publicKey.toString("hex"),
      privateKey: bitcoin.ECPair.fromWIF(
        this.$route.params.key
      ).privateKey.toString("hex"),
      net: this.$route.params.net,
      showCode: false,
      isValid: undefined,
      camera: 'auto',
      result: null,
      showCamera: false,
      deleting: false,
      showCodeTr: false,
      manualParameters: false,
      trValue: '',
      trAddress: '',
      transaction: '',
      showCodeAddress: false,
      typeEntering: false,
      trDetails: false,
      trСomission: ''
    };
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
   async onDecode (content) {
        this.result = content
        this.turnCameraOff()      
        let json_result = JSON.parse(content)

        var text = confirm('Transaction details' +
                '\n' + 'from: ' + '\n' + '\n' +
                          'to: ' + '\n' + json_result.to + '\n' + '\n' +
                          'value: ' + json_result.value + '\n' +
                          'comission: ' + json_result.comission + '\n' +
                          'previous:' +  json_result.previous + '\n'
              )

        Transaction.Transaction(json_result.previous, this.signkey, json_result.value - json_result.comission, json_result.value, json_result.to, this.net, this.publicKey)
              this.showCodeTr = true
    },
    turnCameraOn () {
      this.trDetails = true
      if (this.$q.platform.is.mobile) {
          cordova.plugins.barcodeScanner.scan(
            async function (result) {
              let json_result = JSON.parse(result.text)
              var text = confirm('Transaction details' +
                '\n' + 'from: ' + '\n' + '\n' +
                          'to: ' + '\n' + json_result.to + '\n' + '\n' +
                          'value: ' + json_result.value + '\n' +
                          'comission: ' + json_result.comission + '\n' +
                          'previous:' +  json_result.previous + '\n'
              )
            Transaction.Transaction(json_result.previous, this.signkey, json_result.value - json_result.comission, json_result.value, json_result.to, this.net, this.publicKey)
              this.showCodeTr = true
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
    removeWallet(){
        managBD.RemoveAddressDB(this.name)
        this.$router.push ({name: 'Bitcoin' })
      },
    signManual(trValue, trAddress, transaction, trСomission){
        var a = new Address(trAddress);
        var b = a.toLegacyAddress()
       console.log(this.address)
      Transaction.Transaction(transaction, this.privateKey,  trValue, b, this.net, this.address)
      this.showCodeTr = true
    },
  }
};
</script>
<style src="../css/BCH/BCH.css"></style>