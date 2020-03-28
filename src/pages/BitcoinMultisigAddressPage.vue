<template>
 <div class="q-pa-sm">
   <h6> Address name:</h6>
   <p> {{name}} </p>
   <h6> Your address:</h6>
   <p> {{address}} </p>
   <!--<h6> Your private key: </h6>
   <p v-if="show"> {{privateKey}} </p>
   <button @click="show = !show">Hide / Show</button>
    <h6> Your public key:</h6>
   <p> {{publicKey}} </p>
   <q-item class="flex flex-center">
      <button @click="ExportKey(publicKey)"> Export your public key </button>
   </q-item>
  <h6>Keys:</h6>
   <ul>
       <li v-for="item in keyList" :key="item.address">{{ item.key.toString('hex') }}</li>
   </ul>
   <q-item class="flex flex-center">
    <button @click="ScanForMultisig(key, holders, signs, BufferKeyList)"> Sign transaction </button>
  </q-item> -->

    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Keys</q-toolbar-title>
    </q-toolbar>
    <q-list inset-separator bordered>
    <q-item v-for="(item, idx) in keyList" :key="idx" class="q-my-sm" clickable v-ripple>{{ item.name }}
      <q-separator spaced inset />
        <q-btn round color="blue" icon="more_vert" size="10px">
        <q-menu
          anchor="top right"
          self="top left"
        >
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>
                 <q-item-label @click= "ExportKey(item.key.toString('hex'))"> export public key</q-item-label>
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
    <q-item v-for="(item, idx) in myKeys" :key='idx' class="q-my-sm" clickable v-ripple>{{ item.name }} (your key)

      <q-separator inset />
               
        <q-btn round color="blue" icon="more_vert" size="10px">
    
        <q-menu
          anchor="top right"
          self="top left"
        >
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>
                 <q-item-label @click= "ExportKey(item.key.toString('hex'))"> export public key</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator spaced inset />
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label @click="ShowKey(item.key.toString('hex'))">show public key</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator spaced inset />
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label @click="ShowKey(privateKey)">show private key</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-item>
  </q-list>
  <button @click="Back()">Back</button>
 </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import settings from 'src/scripts/Bitcoin/settings.js'
let bitcoin = require('bitcoinjs-lib')

export default{
  components: { QrcodeStream },
  name:'bitcoinAddress',
  data(){
   return{
    show: false, 
    key: this.$route.params.key,
    privateKey: this.$route.params.key.privateKey.toString('hex'),
    publicKey: this.$route.params.key.publicKey.toString('hex'),
    signs: this.$route.params.signs,
    holders: this.$route.params.holders,
    keyList: this.$route.params.keyList.filter(x => x.key.toString('hex') != this.$route.params.key.publicKey.toString('hex')),
    myKeys: this.$route.params.keyList.filter(x => x.key.toString('hex') == this.$route.params.key.publicKey.toString('hex')),
    BufferKeyList: this.$route.params.keyList.map(x => x.key),
    address: this.$route.params.address,
    name: this.$route.params.name,
    result: ''
   }
  },
  methods: {
   /* ScanForMultisig (key, holders, signs, keyList) {
      cordova.plugins.barcodeScanner.scan(
      function (result) {
      let text = confirm('We got a barcode\n' +
      'Result: ' + result.text + '\n')
      let pos1 = result.text.indexOf('"Input":"') + 8
      let pos2 = result.text.indexOf('"Output":"') + 9
      let pos3 = result.text.indexOf('"Amount":"') + 9
      let str1 = result.text.substring(pos1 + 1, result.text.indexOf('"', pos1 + 1))
      alert(str1)
      let str2 = result.text.substring(pos2 + 1, result.text.indexOf('"', pos2 + 1))
      alert(str2)
      let amount = result.text.substring(pos3 + 1, result.text.indexOf('"', pos3 + 1))
      alert(amount * 100000000)
      // let str1 = '020000000001017bf42e80c9bdc9f6f53745a22d2d6419222898964ed34aa3a4cc7f94d2535b1d0000000017160014e33d537b846ca80f2cf09afd593c9bf71676a666feffffff02607d02000000000017a91446e3999ccdfc70af679269ac3e4318b748033bb987a08601000000000017a9141d67c4fc32ee63b15628ef123c90842e12929a1b87024730440220102c15afb43143a5f3c36a0a7e667055fc3c84d18de2288f9c4d42e868caf648022034bfbbeedf16511b60eff578b23ac08fede04b85d2fb1c4bbe3744d9c85348960121027c7bdae677db82e8d162a9b5d3e80f110f9cd3dc18042b6ceb8ea66bf340d79c396e1900'
      // let str2 = 'n4VQ5YdHf7hLQ2gWQYYrcxoE5B7nWuDFNF'
      // let amount = 1000000
      // let text = true
      let tx = bitcoin.Transaction.fromHex(str1, { network: settings.data() })
      alert(tx.getId())
      const p2ms = bitcoin.payments.p2ms({ m: signs, pubkeys: keyList, network: settings.data() })
      const multisig = bitcoin.payments.p2sh({ redeem: p2ms, network: settings.data() })
      let data = { hash: tx.getId(), index: 1, nonWitnessUtxo: Buffer.from(str1, 'hex'), redeemScript: multisig.redeem.output}
      alert(multisig.redeem.output.toString('hex'))
      alert(tx.getHash().toString('hex'))
      const psbt = new bitcoin.Psbt({ network: settings.data() })
        .addInput(data)
        .addOutput({
          address: str2,
          value: amount * 100000000
        })
        .signInput(0, key)
      const txLast = psbt.toBase64()
      alert(txLast)
      psbt.validateSignaturesOfInput(0)
      psbt.finalizeAllInputs()
      alert(psbt.extractTransaction().toHex())
      if (text !== Boolean(false)) {
        cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, psbt.extractTransaction().toHex(), function (success) {
          alert('encode success: ' + success)
        }, function (fail) {
          alert('encoding failed: ' + fail)
        }
        )
      } else {
        alert('error')
      }
       }
      )
    },  */
    ScanForMultisig (key, holders, signs, keyList) {
      this.result = result
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
        this.$router.go(-1)
    },
    ShowKey(key){
    alert(key)
    },
     async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  }
}
</script>
