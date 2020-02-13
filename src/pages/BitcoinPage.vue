<template>
  <q-page>
  <q-item class="flex flex-center">
    <button @click="AddressPage"> AddressList </button>
  </q-item>
  <q-item class="flex flex-center">
    <button @click="inception = true"> New Address </button>
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
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Multisig addresses</q-toolbar-title>
    </q-toolbar>
    </q-list>
     <q-list bordered>
      <q-item v-for="multisigContact in multisigContacts" :key="multisigContact.id" class="q-my-sm" clickable v-ripple>

        <q-item-section>
          <q-item-label @click= "Scan(multisigContact.key)">{{ multisigContact.name }}</q-item-label>
        </q-item-section>

      </q-item>

    </q-list>
  </div>
  <q-dialog v-model="inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">Choose wallet type</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Standart" @click="Address" v-close-popup/>
          <q-btn flat label="Multisig" @click="CountDialog = true" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="CountDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Choose the number of address holders(maximum 15)</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="countHolders" autofocus @keyup.enter="CountDialog = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Ок" @click="CountRequared = true" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="CountRequared" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Select the number of signatures required to use your wallet(maximum 15)</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="countSigns" autofocus @keyup.enter="CountRequared = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Ok" @click="MultisigAddress(Number(countHolders), Number(countSigns))" v-close-popup />
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
const multisigContacts = [ {
  id: 1,
  name: 'name1',
  key: bitcoin.ECPair.makeRandom({ network: testnet })
},
{
  id: 2,
  name: 'name2',
  key: bitcoin.ECPair.fromWIF('L4TTkYNJo6ZYW4rdLKp3gPyUnDuVrSHCTKW958HKouLymzwgE3m5')
}]
export default {
  data () {
    return {
      message: '',
      contacts,
      multisigContacts,
      inception: false,
      CountDialog: false,
      CountRequared: false,
      countHolders: '',
      countSigns: ''
    }
  },
  methods: {
    Address () {
      var bitcoin = require('bitcoinjs-lib')
      var testnet = bitcoin.networks.testnet
      const keyPair = bitcoin.ECPair.makeRandom()
      const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: testnet })
      this.message = address
      contacts.push({ id: 7, name: address, key: keyPair })
    },
    MultisigAddress (holders, signs) {
      let keyList = []
      var testnet = bitcoin.networks.testnet
      var yourKey = bitcoin.ECPair.makeRandom({ network: testnet })
      alert('Your public key: ' + yourKey.publicKey.toString('hex'))
      alert('Your private key: ' + yourKey.privateKey.toString('hex'))
      keyList.push(yourKey.publicKey)
      for (let i = 0; i < holders - 1; i++) {
        var newKey = prompt('Enter public key')
        // var newKey = '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01'  --- для electron, так как там  не работает prompt
        alert(newKey)
        keyList.push(newKey)
      }
      const pubkeys = keyList.map(hex => Buffer.from(hex, 'hex'))
      const { address } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({ m: 2, pubkeys })
      })
      alert(address)
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
