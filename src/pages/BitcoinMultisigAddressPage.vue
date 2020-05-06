<template>
  <div class="q-pa-sm">

  <q-dialog v-model="manualParameters">
    <q-card>
      <q-card-section>
        <div class="text-h6">Enter parameters of transaction</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input filled autofocus v-model="trValue" label="Value"/>
        <q-input filled autofocus v-model="trAddress" label="Address"/>
         <q-input filled autofocus v-model="transaction" label="ID transaction"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Sign" color="primary" v-close-popup  @click="signManual(String(trValue), String(trAddress), String(transaction))"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

      <q-dialog v-model="typeEntering">
    <q-card>
      
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="New transaction" @click="entering = true" v-close-popup/>
        <q-btn flat label="Import transaction" @click="turnCameraOn()" v-show="!showCamera" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>

<q-dialog v-model="entering">
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
    <div style="position: absolute; color: #ffffff; right: 1%; top: 60px">
      <p style="text-transform: uppercase;">{{net}}</p>
    </div>

    <div class="col" style="margin: 80px auto">
      <p class="text-h3" style="font-weight: bold; color: white">{{name}}</p>
    </div>
    <h6 v-if="done" class="text">Your address:</h6>
    <p v-if="done" class="white">{{address}}</p>
    <p
      v-else
      class="white"
    >import missing public keys, please ({{ countTEmpKeys}} / {{countHolders}})</p>
    <q-toolbar v-if="done" class="bg-primary text-white shadow-2">
      <q-toolbar-title class="text">Keys</q-toolbar-title>
    </q-toolbar>

    <div v-show="showCodeAddress" class="flex flex-center code">
      <canvas id="qr-key"></canvas>
      <q-btn class="mainButton" label="Hide" @click="showCodeAddress = false" v-show="!showCamera" />
    </div>

    <div v-show="showCode" class="flex flex-center code">
      <canvas id="qr"></canvas>
      <q-btn class="mainButton" label="Hide" @click="showCode = false" v-show="!showCamera" />
    </div>

    <q-list v-if="done" inset-separator bordered>
      <q-item class="white" v-for="(item, idx) in otherKeys" :key="idx" clickable v-ripple>
        {{ item.name }}
        <q-separator spaced inset />
        <q-btn round color="white" icon="more_vert" size="10px">
          <q-menu anchor="top right" self="top left">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label
                    style="color: black"
                    @click="showCodeAddress= !showCodeAddress"
                  >export public key</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced inset />
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label @click="ShowKey(item.key.toString('hex'))">show public key</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-item>
    </q-list>
    <q-list inset-separator bordered>
      <q-item v-for="(item, idx) in myKeys" :key="idx" class="white" clickable v-ripple>
        {{ item.name }} (your key)
        <q-separator inset />

        <q-btn round color="blue" icon="more_vert" size="10px">
          <q-menu anchor="top right" self="top left">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label
                    class="black"
                    @click="showCodeAddress= !showCodeAddress"
                  >export public key</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced inset />
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label
                    class="black"
                    @click="ShowKey(item.key.toString('hex'))"
                  >show public key</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced inset />
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label class="black" @click="ShowKey(privateKey)">show private key</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-item>
    </q-list>
    <q-btn class="mainButton col" label="Sign transaction"  @click="typeEntering = true" v-show="!showCamera"/>
    <button class="mainButton" @click="Import()">Import keys</button>
    <button class="mainButton" @click="Back()">Back</button>

    <div style="width: 100%">
      <q-btn
        class="mainButton"
        label="Remove the wallet"
        style="font-size: 0.8em; margin: 0px 40% 0px 34%; width: 20%; min-width: 200px; height: 40px; padding: 0px; background-color: #702A31"
        @click="deleting = true"
        v-show="!showCamera"
      />
    </div>

    <div v-if="showCamera">
      <qrcode-stream :camera="camera" @decode="onDecode"></qrcode-stream>
      <q-btn class="mainButton" label="Close" @click="turnCameraOff()" />
    </div>
      <div v-show="showCodeTr" class="flex flex-center code">
    <canvas id="qr-transaction">
    </canvas>
    <q-btn class="mainButton" label="Hide"  @click="showCodeTr = false" v-show="!showCamera"/>
  </div>
  </div>
</template>


<script>
import { QrcodeStream } from "vue-qrcode-reader";
import settings from "src/scripts/Bitcoin/settings.js";
import QRCode from "src/scripts/Bitcoin/QRCode.js";
import managBD from "src/scripts/Bitcoin/ManagBD.js";
import Transaction from '../scripts/Bitcoin/Transaction.js';
let bitcoin = require("bitcoinjs-lib");
var QRious = require('QRious')

function Scan() {
  return new Promise((resolve, reject) => {
    cordova.plugins.barcodeScanner.scan(function(result) {
      let json_result = JSON.parse(result.text);
      var text = confirm(
        "Details" +
          "\n" +
          "from: " +
          "\n" +
          "\n" +
          "name: " +
          "\n" +
          json_result.name +
          "\n" +
          "\n" +
          "key: " +
          json_result.key +
          "\n"
      );
      resolve(json_result);
    });
  });
}

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
        element: document.getElementById('qr-key'),
        value: this.$route.params.address,
        level: 'H',
        size: 1000,
      })
    },
  data() {
    return {
      done: false,
      key: this.$route.params.key,
      publicKey: bitcoin.ECPair.fromWIF(
        this.$route.params.key,
        settings.data()
      ).publicKey.toString("hex"),
      privateKey: bitcoin.ECPair.fromWIF(
        this.$route.params.key,
        settings.data()
      ).privateKey.toString("hex"),
      signs: this.$route.params.signs,
      holders: this.$route.params.holders,
      keys: JSON.parse(this.$route.params.keyList),
      otherKeys: [], // this.$route.params.keyList.filter(x => x.key.toString('hex') != this.$route.params.key.publicKey.toString('hex')),
      myKeys: JSON.parse(this.$route.params.keyList).filter(
        x =>
          x.key ==
          bitcoin.ECPair.fromWIF(
            this.$route.params.key,
            settings.data()
          ).publicKey.toString("hex")
      ),
      address: "",
      name: this.$route.params.name,
      countHolders: 0,
      countTEmpKeys: 0,
      net: this.$route.params.net,
      showCodeAddress: false,
      showCamera: false,
      showCode: false,
      isValid: undefined,
      camera: "auto",
      result: null,
      deleteing: false,
      typeEntering: false,
      entering: false,
      manualParameters: false,
      deleting: false,
       trValue: '',
      trAddress: '',
      transaction: '',
      showCodeTr: false,
    };
  },

  beforeMount() {
    this.countHolders = this.holders;
    this.countTEmpKeys = this.keys.length;
    if (this.keys == "") {
      this.done = false;
      this.otherKeys = [];
      console.log(JSON.parse(this.$route.params.keyList));
    } else {
      this.otherKeys = JSON.parse(this.$route.params.keyList).filter(
        x =>
          x.key !=
          bitcoin.ECPair.fromWIF(
            this.$route.params.key,
            settings.data()
          ).publicKey.toString("hex")
      );
      this.address = this.$route.params.address;
    }
  },
  methods: {
   
    Back() {
      this.$router.go(-1);
    },
    async Import() {
      var keys = JSON.stringify(this.keys);
      var json = await Scan();

      this.keys.push(json);
      this.otherKeys.push(json);
      var v = this.keys;
      managBD.InsertAddress(keys, JSON.stringify(v));
      this.countTEmpKeys ++
      if (this.keys.length == Number(this.holders)) {
        var pubkeys = this.keys
          .map(x => x.key)
          .map(hex => Buffer.from(hex, "hex"));
        this.done = true;
        const { address } = bitcoin.payments.p2sh(
          {
            redeem: bitcoin.payments.p2ms({
              m: Number(this.signs),
              pubkeys,
              network: settings.data()
            })
          },
          settings.data()
        );
        console.log(address);
        this.address = address;
        managBD.InsertMainAddress(address);
      }
    },
    ExportKey(key) {
      if (key !== Boolean(false)) {
        cordova.plugins.barcodeScanner.encode(
          cordova.plugins.barcodeScanner.Encode.TEXT_TYPE,
          key,
          function(success) {
            alert("encode success: " + success);
          },
          function(fail) {
            alert("encoding failed: " + fail);
          }
        );
      } else {
        alert("error");
      }
    },
    async onDecode (content) {
        this.result = content
        this.turnCameraOff()      
        let json_result = JSON.parse(content)

        var text = confirm('Transaction details' +
                '\n' + 'from: ' + '\n' + '\n' +
                          'to: ' + '\n' + json_result.to + '\n' + '\n' +
                          'value: ' + json_result.value + '\n' +
                          'previous:' +  json_result.previous + '\n'
              )

        Transaction.MultisigTransaction(json_result.previous, this.signkey, json_result.to, json_result.value, json_result.to, this.net, this.signs, this.keys)
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
                          'previous:' +  json_result.previous + '\n'
              )
            Transaction.MultisigTransaction(json_result.previous, this.signkey, json_result.to, json_result.value, json_result.to, this.net, this.signs, this.keys)
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
    ShowKey(key) {
      alert(key);
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    },
      removeWallet(){
      managBD.RemoveMultiAddressDB(this.name)
      this.$router.go(-1);
    },
    signManual(transaction,  trAddress, trValue){
      Transaction.MultisigTransaction(transaction, this.signkey, trAddress,  trValue, this.net, this.signs, this.keys)
      this.showCodeTr = true
    }
  }
};
</script>
<style src="../css/Bitcoin/Bitcoin.css"></style>
