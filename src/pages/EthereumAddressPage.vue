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

  <q-dialog v-model="manualParameters">
    <q-card>
      <q-card-section>
        <div class="text-h6">Enter parameters of transaction</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled autofocus v-model="trGasLimit" label="Gas limit"/>
        <q-input filled autofocus v-model="trGasPrice" label="Gas Price in gwei"/>
        <q-input filled autofocus v-model="trNonceSender" label="Nonce"/>
        <q-input filled autofocus v-model="trValue" label="Value"/>
        <q-input filled autofocus v-model="trData" label="Data" placeholder="0x"/>
        <q-input filled autofocus v-model="trAddress" label="Address"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Sign" color="primary" v-close-popup  @click="signManual(String(trGasLimit), String(trGasPrice), String(trNonceSender), String(trValue), String(trData), String(trAddress))"/>
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
          <b class="text-h6">{{key}}  </b>
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
    <q-btn class="mainButton col" label="Send tokens"  @click="tokens = true; turnCameraOn()" v-show="!showCamera"/>
  </div>
  <div class="row justify-between">
    <q-btn class="mainButton col" label="Sign transaction"  @click="typeEntering = true" v-show="!showCamera"/>
    <q-btn class="mainButton col" label="Confirm transaction"  @click="overridesGas = true" v-show="!showCamera"/>
  </div>
  
  
  <div style="width: 100%">
    <q-btn color="black" style="width: 6%; margin: 20px 0px;" label="Back" @click="back()"/>
    <q-btn class="mainButton" label="Remove the wallet" style="font-size: 0.8em; margin: 0px 40% 0px 34%; width: 20%; min-width: 200px; height: 40px; padding: 0px; background-color: #702A31" @click="deleting = true" v-show="!showCamera"/>
  </div>
   <h6 v-if="trDetails">Scan transactiom details</h6>
   <div v-if="showCamera">
          <q-btn color="black" label="Close" @click="turnCameraOff()"/>
          <qrcode-stream :camera="camera" @decode="onDecode">
          </qrcode-stream>
    </div>
  <div v-show="showCodeTr" class="flex flex-center code">
    <canvas id="qr-transaction">
    </canvas>
    <q-btn class="mainButton" label="Hide"  @click="showCodeTr = false" v-show="!showCamera"/>
  </div>
 </div>

</template>



<script>
  import { QrcodeStream } from 'vue-qrcode-reader';
  import QRcode from '../scripts/Ethereum/QRcode.js';
  import Transaction from '../scripts/Ethereum/Transaction.js';
  import ERC20 from '../scripts/Ethereum/ERC20Token.js';
  import managBD from '../scripts/Ethereum/ManagBD.js';

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
      });

      let qrAddress = new QRious({
        element: document.getElementById('qr-address'),
        value: this.$route.params.address,
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
      net: this.$route.params.net,
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
      trDetails: false,
      showCodeAddress: false,
      manualParameters: false,
      typeEntering: false,
      trAddress: '',
      trData: '',
      trValue: '',
      trNonceSender: '',
      trGasPrice: '',
      trGasLimit: '',
      deleting: false,
      showCodeTr: false
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
            chainId: this.net
        }
        Transaction.confirmMultisigTransaction(this.key, overrides, content, this.trNumber)
        this.showCodeTr = true
        this.confirmation = false
        this.turnCameraOff()   
      }
      else if (this.tokenAddressIdentify){
        console.log(this.tempTransaction)
        ERC20.transfer(this.key, this.tempTransaction, content)
        this.showCodeTr = true
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
                    'chain: ' + this.net
        )

        let transaction = {
              nonce: json_result.nonce,
              gasLimit: json_result.gasLimit,
              gasPrice: ethers.utils.bigNumberify(json_result.gasPrice)._hex,
              to: json_result.to, 
              value: ethers.utils.parseEther(json_result.value + "")._hex,
              data: json_result.data,
              chainId: ethers.utils.getNetwork(this.net).chainId    
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
            this.showCodeTr = true
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
                          'chain: ' + ethers.utils.getNetwork(this.net).chainId  
              )
              let transaction = {
                    nonce: json_result.nonce,
                    gasLimit: json_result.gasLimit,
                    gasPrice: ethers.utils.bigNumberify(json_result.gasPrice)._hex,
                    to: json_result.to, 
                    value: ethers.utils.parseEther(json_result.value + "")._hex,
                    data: json_result.data,
                    chainId: ethers.utils.getNetwork(this.net).chainId  
                }
                let wallet = new ethers.Wallet(this.key)
                if (this.tokens)
                  this.tokenAddress(transaction)
                else {
                  Transaction.signing(wallet, transaction)
                  this.showCodeTr = true
                }
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
              this.showCodeTr = true
            }
          )
      },
      signManual(trGasLimit, trGasPrice, trNonceSender, trValue, trData, trAddress){
        var ethers = require('ethers')
        if (trData == "")
          trData = "0x"
        let transaction = {
              nonce: parseFloat(trNonceSender),
              gasLimit: parseFloat(trGasLimit),
              gasPrice: ethers.utils.bigNumberify(trGasPrice)._hex,
              to: trAddress,
              value: ethers.utils.parseEther(trValue + "")._hex,
              data: trData,
              chainId: ethers.utils.getNetwork(this.networkId).chainId    
          }

        let wallet = new ethers.Wallet(this.key)
        Transaction.signing(wallet, transaction)
        this.showCodeTr = true
      },

      removeWallet(){
        managBD.RemoveAddressDB(this.name)
        this.$router.push ({name: 'Ethereum' })
      }
    }
  } 
</script>

<style src="../css/Ethereum/Ethereum.css"></style>
