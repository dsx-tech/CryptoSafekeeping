<template>
 <div class="q-pa-sm main">
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
        <q-btn flat label="Manual" @click="checkConditions()" v-close-popup/>
        <q-btn flat label="By QR-code" @click="createTransaction()" v-show="!showCamera" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>


  <q-dialog v-model="scanOwner" transition-show="rotate" transition-hide="rotate">
    <q-card>
      <q-card-section>
        <div class="text-h6">Scan new address or add from existing wallets?</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Scan new" color="primary" v-close-popup @click="turnCameraOn()"/>
        <q-btn flat label="From existing" color="primary" v-close-popup @click="choiceOwner = true"/>
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
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Create" color="primary" v-close-popup @click="createWallet()"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="choiceOwner"  v-close-popup>
    <q-card>
      <q-card-section>
        <q-list>
          <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>

            <q-item-section>
              <q-item-label @click= "keylist.push(contact.address); choiceOwner = false">{{ contact.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
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
          <b class="text-h6">{{address[0]}} </b>
          <q-btn class="mainButton" label="show as Qr-code" style="width: 80%; margin-right: -2.5%; height: 40px; padding: 0px" @click="showCodeAddress= !showCodeAddress" />
        </div>
      </div> 

      <div class="row" style="padding: 0px 0px;">
        <div class="col">
          <b class="text-h6">Needed signers for transactiom:</b>
        </div>
        <div class="col" style="text-align: right;">
          <b class="text-h6">{{signs}}  </b>
        </div>
      </div> 

      <div class="row" style="padding: 0px 0px;">
        <div class="col">
          <b class="text-h6">Holders of wallet:</b>
        </div>
        <div class="col" style="text-align: right;">
          <b class="text-h6">{{holders}}  </b>
        </div>
      </div> 

      <div style="position: absolute; color: #ffffff; right: 1%; top: 60px">
        <p style="text-transform: uppercase;"> {{net}} </p>
      </div>
      <div v-if="showCodeTransaction">
        <canvas id="qr-transaction">
        </canvas>
        <q-btn label="hide" class="mainButton" @click="hideCodeTransaction()"/>
      </div>
    
    <div class="col">
      <h6>Owners:</h6>
    
      <q-list>
        <q-item v-for="item in keylist" :key="item" class="q-my-sm" clickable v-ripple>
          <q-item-section>
            <q-item-label>{{ item }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div>
        <div class="row">
          <h6 class="col">Choose single wallet for deploy creation</h6>
          <q-btn flat style="margin: auto" class="mainButton col" label="choose wallet" v-show="btnChoice" @click="choiceSingle = true; btnChoice = false"/>
        </div>
        <div>
          
          <q-list v-show="choiceSingle">
            <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>

              <q-item-section>
                <q-item-label @click= "chooseWallet(contact.name, contact.key)">{{ contact.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="chose row" v-show="choseSingle">
          <p class="col" style="margin: auto">{{ nameSingle }} </p>
          <q-btn flat class="mainButton col" id="activateChoice" label="change wallet" @click="activateChoice()"/>
        </div>
      </div>
    </div>
    </div>




  </div>





  <div class="col text-center msButtons" style="padding: 0px 5%">
      <div class="row justify-between">
        <q-btn label="Add holder" class="mainButton  col" @click="checkOwnersNumber()" v-show="!showCamera"/>
        <q-btn label="Import wallet address" class="mainButton  col" @click="importAddress()" v-show="!showCamera"/>
      </div>
      <div class="row justify-between">
        <q-btn label="Create wallet" class="mainButton  col" @click="overridesGas = true" />
        <q-btn label="Create transaction" class="mainButton  col" @click="typeEntering = true" />
      </div>
      <div class="row justify-between">
        <q-btn label="Transfer ERC-20 tokens" class="mainButton  col" @click="tokens = true; createTransaction()" />
        <q-btn class="mainButton col" label="Remove the wallet"  @click="deleting = true" v-show="!showCamera"/>
      </div>
      <h6 v-if="trDetails">Scan transactiom details</h6>
      <h6 v-if="tokenAddres">Scan token address</h6>
      <h6 v-if="walletAddres">Scan wallet address</h6>
      <div v-if="showCamera">
        <qrcode-stream :camera="camera" @decode="onDecode">
        </qrcode-stream>
      </div>
      <div v-if="showCameraTransaction">
        <qrcode-stream :camera="camera" @decode="onDecodeTransaction">
        </qrcode-stream>
      </div>
  </div>

  <q-card-actions align="right" class="text-primary">
    <q-btn flat label="Back" @click="Back()"  style="color: #ffffff"/>

    <q-btn flat label="Save" @click="SaveAddresses()" v-close-popup  style="color: #ffffff"/>
  </q-card-actions>

  <div class="wrap-code" v-show="showAllCodes">
    <q-btn label="hide" class="mainButton" @click="hideCodeTransaction()"/>
    <canvas id="qr-transaction"></canvas>
  </div>
 </div>
</template>

<style src="../css/Ethereum/Ethereum.css"></style>
<script>
import QRcode from '../scripts/Ethereum/QRcode.js'
import { QrcodeStream } from 'vue-qrcode-reader'
import managBD from '../scripts/Ethereum/ManagBD.js'
import Address from '../scripts/Ethereum/Address.js'
import Transaction from '../scripts/Ethereum/Transaction.js'
import ERC20 from '../scripts/Ethereum/ERC20Token.js'

export default{
  name: 'PageIndex',
  components: { QrcodeStream },

  beforeDestroy(){
    for (var i = 1; i < 99999; i++)
      window.clearInterval(i);
  },
  data(){
   return{
    show: false, 
    signs: this.$route.params.signs,
    holders: this.$route.params.holders,
    keylist: this.$route.params.keylist.split(';').filter(function (el) {
          return el != "";
        }),
    address: [this.$route.params.address],
    name: this.$route.params.name,
    net: this.$route.params.net,
    isValid: undefined,
    camera: 'auto',
    result: null,
    showCamera: false,
    showCameraTransaction: false,
    showAllCodes: false,
    showCodeTransaction: false,
    contacts: this.$route.params.contacts,
    nameSingle: null,
    choseSingle: false,
    choiceSingle: false,
    pKey: null,
    btnChoice: true,
    scanOwner: false,
    choiceOwner: false,
    gasPrice: null,
    gasLimit: null,
    overridesGas: null,
    nonceSender: null,
    networkId: 3,
    tokens: false,
    tempTransaction: null,
    walletAddres: false,
    tokenAddres: false,
    trDetails: false,
    manualParameters: false,
    typeEntering: false,
    trAddress: '',
    trData: '',
    trValue: '',
    trNonceSender: '',
    trGasPrice: '',
    trGasLimit: '',
    deleting: false
   }
  },
  
  beforeMount(){
  },
  methods: {

    async onDecode (content) {
      if (!this.tokens){
        this.walletAddres = false
        this.address = [content]
        this.turnCameraOff()
      }
      else {
        this.tokenAddres = false
        ERC20.transferMulti(this.pKey, this.tempTransaction, content, this.address[0])
        this.tokens = false
        this.turnCameraOff()
      }
      
    },
    async onDecodeTransaction (content) {
      this.trDetails = false
      this.result = content
      this.turnCameraOff()
      var ethers = require('ethers')
    
      let json_result = JSON.parse(content)
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
            gasPrice: ethers.utils.bigNumberify(json_result.gasPrice)._hex,//.toString(16),//_hex, 
            to: json_result.to, 
            value: ethers.utils.parseEther(json_result.value + "")._hex,//.toString(16),//._hex, 
            data: json_result.data,
            chainId: ethers.utils.getNetwork(this.net).chainId    
        }

        if (this.tokens)
          this.tokenAddress(transaction)
        else Transaction.createMultiSigTransaction(this.pKey, transaction, this.address[0])
        this.showCodeTransaction = true
        this.showCameraTransaction = false
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
    SaveAddresses(){
      let keyListStr = "";
      this.keylist.forEach(element => keyListStr += element.toString() + ';')
      managBD.UpdateMultisigDb(this.address[0], this.name, keyListStr)
      alert("Saved owners successfully")
    },
    Back(){
      for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
      this.$router.push ({name: 'Ethereum' })
    },
    createWallet(){
      var ethers = require('ethers')
      this.SaveAddresses()
      console.log(this.pKey)
      if (this.pKey == null) alert("Choose the single wallet for deploying Transaction")
      else {
        if (Object.keys(this.keylist).length != this.holders)
          alert("You have not enough addresses of owners for creation. \nYou have: " + Object.keys(this.keylist).length +"\nYou need: " + this.holders)
        else {
          if (this.showAllCodes) {
            this.showAllCodes = false
            for (var i = 1; i < 99999; i++)
              window.clearInterval(i);
            //this.$router.push ({name: 'Ethereum' })
          }
          else {
            this.showAllCodes = true
            let owners = this.keylist.filter(function (el) {
                return el != "";
              })
            let overrides = {
                gasLimit: parseInt(this.gasLimit),
                gasPrice: ethers.utils.parseUnits(this.gasPrice, 'gwei'),
                nonce: parseInt(this.nonceSender),
                chainId: ethers.utils.getNetwork(this.net).chainId  
            }

            console.log(overrides)
            Address.newMultisigAddress(this.pKey, this.holders, owners, overrides)
          }
        }
      }
    },

    importAddress () {
      this.walletAddres = true
      if (this.$q.platform.is.mobile){
        let temp = []
        this.address = temp
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            alert(result.text)
            temp.push(result.text)
          }
        )
        this.SaveAddresses()
      }
      else {
        this.camera = 'auto'
        this.showCamera = true
      }
    },

    tokenAddress(transaction){
      this.tokenAddres = true
      if (this.$q.platform.is.mobile){
        let privateKey = this.pKey
        let contractAddress = this.address[0]
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            alert(result.text)
            ERC20.transferMulti(privateKey, transaction, result.text, contractAddress)
          }
        )
        this.SaveAddresses()
      }
      else {
        this.tempTransaction = transaction
        this.camera = 'auto'
        this.showCamera = true
      }
    },

    async createTransaction(){
      if (this.pKey == null) alert("Choose the single wallet for deploying Transaction")
      else {
        if (this.$route.params.address == 'null') alert("You have to import wallet address.")
        else {
          this.trDetails = true
          if (this.$q.platform.is.mobile) {
            let pKey = this.pKey;
            let address = this.address[0];
            cordova.plugins.barcodeScanner.scan(
              function (result) {
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
                      gasPrice: ethers.utils.bigNumberify(json_result.gasPrice)._hex,//.toString(16),//_hex, 
                      to: json_result.to, 
                      value: ethers.utils.parseEther(json_result.value + "")._hex,//.toString(16),//._hex, 
                      data: json_result.data,
                      chainId: ethers.utils.getNetwork(this.net).chainId  
                  }
                  this.trDetails = false
                  if (this.tokens)
                    this.tokenAddress(transaction)
                  else Transaction.createMultiSigTransaction(pKey, transaction, address)
                  this.showCodeTransaction = true
              }
            )
            this.showCodeTransaction = true
          }
          else {  
            this.camera = 'auto'
            this.showCameraTransaction = true
          } 
        }
      }
    },

    chooseWallet(name, pKey){
      this.pKey = pKey
      this.nameSingle = name
      this.choiceSingle = false
      this.choseSingle = true
    },
    activateChoice(){
      this.choiceSingle = true
      this.choseSingle = false
    },
    hideCodeTransaction(){
      if (this.showAllCodes) {
        this.showAllCodes = false
        for (var i = 1; i < 99999; i++)
          window.clearInterval(i);
        //this.$router.push ({name: 'Ethereum' })
      }
      this.showCodeTransaction = false
      
    },
    checkOwnersNumber(){
      if (Object.keys(this.keylist).length < this.holders) 
        this.scanOwner = true; 
      else alert( 'You have enough owners') 
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
              chainId: ethers.utils.getNetwork(this.net).chainId     
          }

          let wallet = new ethers.Wallet(this.pKey)
          Transaction.createMultiSigTransaction(this.pKey, transaction, this.address[0])
          this.showCodeTransaction = true
      },

    checkConditions(trGasLimit, trGasPrice, trNonceSender, trValue, trData, trAddress){
    if (this.address[0] == null) 
      alert('Enter the wallet address')
    else {
      if (this.pKey == null) 
        alert("Choose the single wallet for deploying Transaction")
      else {
        if (this.$route.params.address == 'null') 
          alert("You have to import wallet address.")
        else {
            this.manualParameters = true
          }
        }
      }
    },

    removeWallet(){
      managBD.RemoveMultiAddressDB(this.name)
      this.$router.push ({name: 'Ethereum' })
    }
  }
}
</script>
