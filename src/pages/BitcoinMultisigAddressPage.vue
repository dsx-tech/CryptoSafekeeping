<template>
 <div class="q-pa-sm">
   <h6> Address name:</h6>
   <p> {{name}} </p>
   <h6 v-if = "done"> Your address:</h6>
   <p v-if="done"> {{address}} </p>
   <p v-else> import missing public keys, please</p>
    <q-toolbar v-if = "done" class="bg-primary text-white shadow-2">
      <q-toolbar-title>Keys</q-toolbar-title>
    </q-toolbar>
    <q-list v-if = "done" inset-separator bordered>
    <q-item v-for="(item, idx) in otherKeys" :key="idx" class="q-my-sm" clickable v-ripple>{{ item.name }}
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
  <button class="nextButton" @click="Back()">Back</button>
  <button class="nextButton" @click="Import()">Import keys</button>
 </div>
</template>


<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import settings from 'src/scripts/Bitcoin/settings.js'
import QRCode from 'src/scripts/Bitcoin/QRCode.js'
import managBD from 'src/scripts/Bitcoin/ManagBD.js'
let bitcoin = require('bitcoinjs-lib')

 function Scan() {
    return new Promise((resolve, reject) => {
     cordova.plugins.barcodeScanner.scan(
        function (result) {
       let json_result = JSON.parse(result.text)   
          var text = confirm('Details' +
              '\n' + 'from: ' + '\n' + '\n' +
                        'name: ' + '\n' + json_result.name + '\n' + '\n' +
                        'key: ' + json_result.key + '\n'
            )
        resolve(json_result)       
        }
      )
       }); 
    }

export default{      
data(){
  return{
    done: true,
    key: this.$route.params.key,
    publicKey: bitcoin.ECPair.fromWIF(this.$route.params.key, settings.data()).publicKey.toString('hex'),
    privateKey: bitcoin.ECPair.fromWIF(this.$route.params.key, settings.data()).privateKey.toString('hex'),
    signs: this.$route.params.signs,
    holders: this.$route.params.holders,
    keys: JSON.parse(this.$route.params.keyList),
    otherKeys:[],// this.$route.params.keyList.filter(x => x.key.toString('hex') != this.$route.params.key.publicKey.toString('hex')),    
    myKeys: JSON.parse(this.$route.params.keyList).filter(x => x.key == bitcoin.ECPair.fromWIF(this.$route.params.key, settings.data()).publicKey.toString('hex')),
    address: "",
    name: this.$route.params.name,
  }
},

 beforeMount(){
  if (this.keys == "")
  {
     this.done = false
     this.otherKeys = []
     console.log(JSON.parse(this.$route.params.keyList))
  }
  else {
    this.otherKeys =  JSON.parse(this.$route.params.keyList).filter(x => x.key != bitcoin.ECPair.fromWIF(this.$route.params.key, settings.data()).publicKey.toString('hex'))
    this.address = this.$route.params.address
  }

  },
   methods: {
    Back(){
      this.$router.go(-1)
    },
    async Import(){
      var keys = JSON.stringify(this.keys)
       var json = await(Scan())
  
        this.keys.push(json)
        this.otherKeys.push(json)
        var v = this.keys
        managBD.InsertAddress(keys, JSON.stringify(v))
        if (this.keys.length == Number(this.holders))
        {
     
          var pubkeys = this.keys.map(x => x.key).map(hex => Buffer.from(hex, 'hex'))
          this.done = true
          const { address } = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2ms({ m: Number(this.signs), pubkeys, network: settings.data() })
          }, settings.data())
          console.log(address)
          this.address = address
          managBD.InsertMainAddress(address)
        }
    },
   
   }
  
}
</script>
