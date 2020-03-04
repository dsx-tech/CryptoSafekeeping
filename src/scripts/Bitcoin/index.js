var bitcoin = require('bitcoinjs-lib')
var testnet = bitcoin.networks.testnet
const contacts = [ {
  name: 'name 1',
  address: '1NeJEFzY8PbVS9RvYPfDP93iqXxHjav791',
  key: bitcoin.ECPair.makeRandom({ network: testnet })
},
{
  name: 'name 2',
  address: 'mj3GM8D2Q24XKRTdf13bB7oy2vCaS5oESk',
  key: bitcoin.ECPair.fromWIF('L4TTkYNJo6ZYW4rdLKp3gPyUnDuVrSHCTKW958HKouLymzwgE3m5')
}]
const multisigContacts = [ {
  name: 'name 1',
  address: '2MuvhtsnatLZbgmdBLmUNouHhd11fsvC89u',
  key: bitcoin.ECPair.makeRandom({ network: testnet }),
  holders: 2,
  signs: 1,
  keyList: [Buffer.from('n2t8F1D41xy6f3d2B6DtjXRRsn8dgUzQ6C'), Buffer.from('mjgF67B4pyEHuGTLU5jS333EasUrZBaxMB')]
},
{
  name: 'name 2',
  address: '2MuvhtsnatLZbgmdBLmUNouHhd11fsvC89u',
  key: bitcoin.ECPair.fromWIF('L4TTkYNJo6ZYW4rdLKp3gPyUnDuVrSHCTKW958HKouLymzwgE3m5'),
  holders: 4,
  signs: 3,
  keyList: [Buffer.from('n2t8F1D41xy6f3d2B6DtjXRRsn8dgUzQ6C'), Buffer.from('mjgF67B4pyEHuGTLU5jS333EasUrZBaxMB')]
},
{
  address: '2MuvhtsnatLZbgmdBLmUNouHhd11fsvC89u',
  name: 'name 3',
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
      contacts.push({ address: address, key: keyPair, name: 'name ' + Math.floor(Math.random() * 1000000) })
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
      multisigContacts.push({ address: address, key: yourKey, holders: holders, signs: signs, keyList: keyList, name: 'name ' + Math.floor(Math.random() * 1000000) })
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
    },
    GoToMultisigAddress(key, holders, signs, keyList, address, name){
        this.$router.push ({name: 'BitcoinMultisigPage', params:{key: key, signs: signs, holders: holders, keyList: keyList, address: address, name: name} })
    },

    GoToAddress(name, address, key){
      this.$router.push ({name: 'BitcoinPage', params:{key: key, name: name, address: address} })
  }
  }
}