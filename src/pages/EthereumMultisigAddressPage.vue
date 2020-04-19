<template>
 <div class="q-pa-sm">
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

  <div class="no-margin wallet-properties">
    <div v-if="showCodeTransaction">
      <canvas id="qr-transaction">
      </canvas>
      <q-btn label="hide" class="nextButton" @click="hideCodeTransaction()"/>
    </div>
    <h6> Your name:</h6>
    <p> {{name}} </p>
    <h6> Your address:</h6>
    <p> {{address[0]}} </p>
    <h6> Needed signers for transactiom:</h6>
    <p> {{signs}} </p>
    <h6> Holders of wallet:</h6>
    <p> {{holders}} </p>

    <h6>Owners:</h6>
   
    <q-list>
      <q-item v-for="item in keylist" :key="item" class="q-my-sm" clickable v-ripple>
        <q-item-section>
          <q-item-label>{{ item }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div>
      <h6>Choose single wallet for deploy creation</h6>
      <div>
        <q-btn flat style="margin: auto" class="nextButton" label="choose wallet" v-show="btnChoice" @click="choiceSingle = true; btnChoice = false"/>
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
        <q-btn flat class="nextButton col" id="activateChoice" label="change wallet" @click="activateChoice()"/>
      </div>
    </div>

  </div>

  <div class="col text-center">
      <q-btn label="Add holder" class="nextButton" @click="checkOwnersNumber()" v-show="!showCamera"/>
      <q-btn label="Import wallet address" class="nextButton" @click="importAddress()" v-show="!showCamera"/>
      <q-btn label="Create wallet" class="nextButton" @click="overridesGas = true" />
      <q-btn label="Create transaction" class="nextButton" @click="createTransaction()" />
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
    <q-btn flat label="Back" @click="Back()"/>

    <q-btn flat label="Save" @click="SaveAddresses()" v-close-popup />
  </q-card-actions>

  <div class="wrap-code" v-show="showAllCodes">
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
 </div>
</template>

<style scoped>
  .class {
    width: 100%;
  }
  .wallet-properties{
    color: rgb(105, 105, 105);
    padding: 5%;

  }
  h6{
    margin-top: 30px;
  }
  p{
    margin-top: -30px;
  }
  #activateChoice{
    margin: 0;
    font-size: 10px;
    height: 50px;
  }
  .validation-success,
  .validation-failure,
  .validation-pending {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(85, 85, 85, 0.8);
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
import Transaction from '../scripts/Ethereum/Transaction.js'

export default{
  name: 'PageIndex',
  components: { QrcodeStream },
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
    nonceSender: null
   }
  },
  
  beforeMount(){
  },
  methods: {

    async onDecode (content) {
      this.result = content
      this.turnCameraOff()
    },
    async onDecodeTransaction (content) {
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
                  'chain: ' + json_result.chainId
      )

      let transaction = {
            nonce: json_result.nonce,
            gasLimit: json_result.gasLimit,
            gasPrice: ethers.utils.bigNumberify(json_result.gasPrice)._hex,//.toString(16),//_hex, 
            to: json_result.to, 
            value: ethers.utils.parseEther(json_result.value + "")._hex,//.toString(16),//._hex, 
            data: json_result.data,
            chainId: ethers.utils.getNetwork(json_result.chainId).chainId    
        }
        Transaction.createMultiSigTransaction(this.pKey, transaction, this.address)
        this.showCodeTransaction = true
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
      alert("Saved successfully")
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
                nonce: 1,
                chainId: 3
            }

            
        //  overrides = {
        //     gasLimit: 8000000,
        //     gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
        //     nonce: 1,
        //     chainId: 3
        // }
            console.log(owners)
            Address.newMultisigAddress(this.pKey, this.holders, owners, overrides)
          }
        }
      }
    },

    importAddress () {
      if (!this.$route.params.address)
        alert("You cannot import address before creation.")
      else {
        if (this.$q.platform.is.mobile){
          let temp = []
          this.address = temp
          cordova.plugins.barcodeScanner.scan(
            function (result) {
              alert(result.text)
              temp.push(result.text)
            }
          )
        }
        else {
          this.camera = 'auto'
          this.showCamera = true
        }
      }
    },

    async createTransaction(){
      if (this.pKey == null) alert("Choose the single wallet for deploying Transaction")
      else {
        if (this.$route.params.address == 'null') alert("You have to import wallet address.")
        else {
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
                            'chain: ' + json_result.chainId
                )
                let transaction = {
                      nonce: json_result.nonce,
                      gasLimit: json_result.gasLimit,
                      gasPrice: ethers.utils.bigNumberify(json_result.gasPrice)._hex,//.toString(16),//_hex, 
                      to: json_result.to, 
                      value: ethers.utils.parseEther(json_result.value + "")._hex,//.toString(16),//._hex, 
                      data: json_result.data,
                      chainId: ethers.utils.getNetwork(json_result.chainId).chainId    
                  }
                  Transaction.createMultiSigTransaction(pKey, transaction, address)
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
      this.showCodeTransaction = false
    },
    checkOwnersNumber(){
      if (Object.keys(this.keylist).length < this.holders) 
        this.scanOwner = true; 
      else alert( 'You have enough owners') 
    }

    
  }
}
</script>
