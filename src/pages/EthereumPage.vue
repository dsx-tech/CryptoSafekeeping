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
const contacts = [ 
    {name: 'first', key: '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a'}, //0x55D73ccA422253a8a287074c6f4857Dd15EFdC46
    {name: 'second', key: '0x1778b368d6847f01cc48dc891598675db61500b31cfe6448eb564ccfdcab698c'}, //0x00F7357E503B6cE0622Cf5311739dA27EDF4a875
    {name: 'third', key: '0x8358a123d279423f239dc2cbc5dede46975f9de654d800f594cbab4ae8faea34'}, //0xCe39AB30911Eeb024eB6316123339A4893337639
    {name: 'fourth', key: '0x51cf48d3ac567c2cf65540d49f92cb8f50bba3a8b9b329814d96ad188dd70da8'}, //0xE704eBE589b6ac907887D1997df7BF69A50D416E
    {name: 'fifth', key: '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a'}]
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
      var ethers = require('ethers')
      var pKey = ethers.Wallet.createRandom().privateKey
      alert('New wallets private key: ' + pKey)
      contacts.push({ id: 6, name: 'first wallet', key: pKey })
    },
    AddressPage () {

    },
    Scan (key) {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          var ethers = require('ethers')
          /* var bitcoin = require('bitcoinjs-lib')
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
          alert(tx.build().toHex()) */
          alert(result.text)
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

            //key = '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a'
            let wallet = new ethers.Wallet(key)
            // nonce: 24
            let signPromise = wallet.sign(transaction)
            signPromise.then((signedTransaction) => {
                    alert(signedTransaction)
                    try {
                        cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, signedTransaction, function (success) {
                            alert('encode success: ' + success)
                        }, function (fail) {
                            alert('encoding failed: ' + fail)
                        }
                            )
                    } catch (error) {
                        alert(error)
                    }
                        

                })

                

           

          /*
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
          */
        }
      )
    }
  }
}
</script>
