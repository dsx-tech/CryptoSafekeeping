<template>
  <q-page>
  <q-item class="flex flex-center">
    <button @click="AddressPage"> AddressList </button>
  </q-item>
  <q-item class="flex flex-center">
    <button @click="Address"> New Address </button>
  </q-item>
  <q-item class="flex flex-center">
    <button @click="Scan">ScanQRCode</button>
  </q-item>
    <h5>{{ message }}</h5>
      <div class="q-pa-md" style="max-width: 350px">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Addresses</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>

        <q-item-section>
          <q-item-label @click= "Scan(contact.key)">{{ contact.name }}</q-item-label>
        </q-item-section>

      </q-item>

    </q-list>
  </div>
<q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"></span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
var bitcoin = require('bitcoinjs-lib')
var testnet = bitcoin.networks.testnet
const contacts = [ {
  id: 1,
  name: '1NeJEFzY8PbVS9RvYPfDP93iqXxHjav791',
  key: bitcoin.ECPair.makeRandom({ network: testnet })
},
{
  id: 2,
  name: 'mj3GM8D2Q24XKRTdf13bB7oy2vCaS5oESk',
  key: bitcoin.ECPair.fromWIF('L4TTkYNJo6ZYW4rdLKp3gPyUnDuVrSHCTKW958HKouLymzwgE3m5')
}]
export default {
  data () {
    return {
      message: '',
      contacts,
      confirm: false
    }
  },
  methods: {
    Address () {
      var bitcoin = require('bitcoinjs-lib')
      var testnet = bitcoin.networks.testnet
      const keyPair = bitcoin.ECPair.makeRandom()
      const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: testnet })
      this.message = address
      contacts.push({ id: 6, name: address, key: keyPair })
    },
    AddressPage () {

    },
    Scan (key) {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          var bitcoin = require('bitcoinjs-lib')
          var text = confirm('We got a barcode\n' +
          'Result: ' + result.text + '\n')
          var tx = new bitcoin.TransactionBuilder()
          var pos1 = result.text.indexOf('"Input":"') + 8
          var pos2 = result.text.indexOf('"Output":"') + 9
          var pos3 = result.text.indexOf('"Amount":"') + 9
          let str1 = result.text.substring(pos1 + 1, result.text.indexOf('"', pos1 + 1))
          alert(str1)
          let str2 = result.text.substring(pos2 + 1, result.text.indexOf('"', pos2 + 1))
          alert(str2)
          let amount = result.text.substring(pos3 + 1, result.text.indexOf('"', pos3 + 1))
          alert(amount * 100000000)
          tx.addInput(str1, 1)
          tx.addOutput(str2, amount * 1000000)
          alert(amount * 100000000)
          alert(key.toWIF())
          tx.sign(0, key)
          alert(tx.build().toHex())
          if (text !== Boolean(false)) {
            cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, tx.build().toHex(), function (success) {
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
    }
  }
}
</script>
