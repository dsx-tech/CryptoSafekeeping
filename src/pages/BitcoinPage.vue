
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
          <q-item-label @click= "ScanForMultisig(multisigContact.key, multisigContact.holders, multisigContact.signs, multisigContact.keyList)">{{ multisigContact.name }}</q-item-label>
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
  name: 'name 1',
  address: '1NeJEFzY8PbVS9RvYPfDP93iqXxHjav791',
  key: bitcoin.ECPair.makeRandom({ network: testnet })
},
{
  id: 2,
  name: 'name 2',
  address: 'mj3GM8D2Q24XKRTdf13bB7oy2vCaS5oESk',
  key: bitcoin.ECPair.fromWIF('L4TTkYNJo6ZYW4rdLKp3gPyUnDuVrSHCTKW958HKouLymzwgE3m5')
}]
const multisigContacts = [ {
  id: 1,
  name: 'name 1',
  address: '2MuvhtsnatLZbgmdBLmUNouHhd11fsvC89u',
  key: bitcoin.ECPair.makeRandom({ network: testnet }),
  holders: 2,
  signs: 1,
  keyList: [Buffer.from('n2t8F1D41xy6f3d2B6DtjXRRsn8dgUzQ6C'), Buffer.from('mjgF67B4pyEHuGTLU5jS333EasUrZBaxMB')]
},
{
  id: 2,
  name: 'name 2',
  address: '2MuvhtsnatLZbgmdBLmUNouHhd11fsvC89u',
  key: bitcoin.ECPair.fromWIF('L4TTkYNJo6ZYW4rdLKp3gPyUnDuVrSHCTKW958HKouLymzwgE3m5'),
  holders: 4,
  signs: 3,
  keyList: [Buffer.from('n2t8F1D41xy6f3d2B6DtjXRRsn8dgUzQ6C'), Buffer.from('mjgF67B4pyEHuGTLU5jS333EasUrZBaxMB')]
},
{
  id: 3,
  address: '2MuvhtsnatLZbgmdBLmUNouHhd11fsvC89u',
  name: 'name 12151',
  key: bitcoin.ECPair.fromWIF('cP1tkWhhMbtuFPVpRcjS8s8Xae15gvUhchXWiwcWXJGfB7SCVHhq', testnet),
  holders: 2,
  signs: 1,
  keyList: [Buffer.from('039a696dbc7a422faa42688bfef236dd9b81585676a6c2cb185e1db39a195757d9', 'hex'), Buffer.from('026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01', 'hex')]
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
      contacts.push({ id: 7, address: address, key: keyPair, name: 'name' + randomInteger(1, 2525252) })
    },
    MultisigAddress (holders, signs) {
      let keyList = []
      var testnet = bitcoin.networks.testnet
      var yourKey = bitcoin.ECPair.makeRandom({ network: testnet })
      alert('Your public key: ' + yourKey.publicKey.toString('hex'))
      console.log('Your public key: ' + yourKey.publicKey.toString('hex'))
      alert('Your private key: ' + yourKey.privateKey.toString('hex'))
      console.log('Your private key: ' + yourKey.toWIF())
      keyList.push(yourKey.publicKey)
      for (let i = 0; i < holders - 1; i++) {
        var newKey = prompt('Enter public key')
        // var newKey = '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01' //  --- для electron, так как там  не работает prompt
        var publicKeyBuffer = Buffer.from(newKey, 'hex')
        alert(newKey)
        console.log(newKey)
        keyList.push(publicKeyBuffer)
      }
      const pubkeys = keyList.map(hex => Buffer.from(hex, 'hex'))
      const { address } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({ m: signs, pubkeys, network: testnet })
      }, testnet)
      alert(address)
      console.log(address)
      multisigContacts.push({ id: 7, address: address, key: yourKey, holders: holders, signs: signs, keyList: keyList, name: 'name' + randomInteger(1, 2525252) })
    },
    AddressPage () {

    },
    
    ScanForMultisig (key, holders, signs, keyList) {
      cordova.plugins.barcodeScanner.scan(
      function (result) {
      var bitcoin = require('bitcoinjs-lib')
      var testnet = bitcoin.networks.testnet
      var text = confirm('We got a barcode\n' +
      'Result: ' + result.text + '\n')
      var pos1 = result.text.indexOf('"Input":"') + 8
      var pos2 = result.text.indexOf('"Output":"') + 9
      var pos3 = result.text.indexOf('"Amount":"') + 9
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
      var tx = bitcoin.Transaction.fromHex(str1, { network: testnet })
      alert(tx.getId())
      const p2ms = bitcoin.payments.p2ms({ m: signs, pubkeys: keyList, network: testnet })
      const multisig = bitcoin.payments.p2sh({ redeem: p2ms, network: testnet })
      var data = { hash: tx.getId(), index: 1, nonWitnessUtxo: Buffer.from(str1, 'hex'), redeemScript: multisig.redeem.output}
      alert(multisig.redeem.output.toString('hex'))
      alert(tx.getHash().toString('hex'))
      const psbt = new bitcoin.Psbt({ network: testnet })
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
