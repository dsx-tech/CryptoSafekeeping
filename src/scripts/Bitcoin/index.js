import { QrcodeStream } from 'vue-qrcode-reader'
import settings from './settings.js'
import managBD from './ManagBD.js'
let bitcoin = require('bitcoinjs-lib')

/*const contacts = [ {
  name: 'name 1',
  address: '1NeJEFzY8PbVS9RvYPfDP93iqXxHjav791',
  key: bitcoin.ECPair.makeRandom({ network: settings.data() })
},
{
  name: 'name 2',
  address: 'mj3GM8D2Q24XKRTdf13bB7oy2vCaS5oESk',
  key: bitcoin.ECPair.fromWIF('L4TTkYNJo6ZYW4rdLKp3gPyUnDuVrSHCTKW958HKouLymzwgE3m5')
}]
const multisigContacts = [ {
  name: 'name 1',
  address: '2MuvhtsnatLZbgmdBLmUNouHhd11fsvC89u',
  key: bitcoin.ECPair.makeRandom({ network: settings.data() }),
  holders: 2,
  signs: 1,
  keyList: [{ key: Buffer.from('n2t8F1D41xy6f3d2B6DtjXRRsn8dgUzQ6C'), name: 'Anna' }, { key: Buffer.from('mjgF67B4pyEHuGTLU5jS333EasUrZBaxMB'), name: 'Fred' }]
},
{
  name: 'name 2',
  address: '2MuvhtsnatLZbgmdBLmUNouHhd11fsvC89u',
  key: bitcoin.ECPair.fromWIF('L4TTkYNJo6ZYW4rdLKp3gPyUnDuVrSHCTKW958HKouLymzwgE3m5'),
  holders: 4,
  signs: 3,
  keyList: [{ key: Buffer.from('n2t8F1D41xy6f3d2B6DtjXRRsn8dgUzQ6C'), name: 'Bob' }, { key: Buffer.from('mjgF67B4pyEHuGTLU5jS333EasUrZBaxMB'), name: 'Kate' }]
},
{
  address: '2MuvhtsnatLZbgmdBLmUNouHhd11fsvC89u',
  name: 'name 3',
  key: bitcoin.ECPair.fromWIF('cP1tkWhhMbtuFPVpRcjS8s8Xae15gvUhchXWiwcWXJGfB7SCVHhq', settings.data()),
  holders: 2,
  signs: 1,
  keyList: [{ key: Buffer.from('039a696dbc7a422faa42688bfef236dd9b81585676a6c2cb185e1db39a195757d9', 'hex'), name: 'James' }, { key: Buffer.from('026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01', 'hex'), name: 'Alice' }]
}]*/
export default {
  components: { QrcodeStream },
  data () {
    return {
      contacts:[],
      multisigContacts:[],
      inception: false,
      CountDialog: false,
      CountRequared: false,
      countHolders: '',
      countSigns: '',
      tab: 'addresses',
      splitterModel: 20,
      walletName: ''
    }
  },

  beforeMount(){
    this.contacts = managBD.DownLoadAddresses();
    this.multisigContacts = managBD.DownLoadMultidigAdresses();
  },

  methods: {

    Address (name) {
      const keyPair = bitcoin.ECPair.makeRandom()
      const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: settings.data() })
      this.contacts.push({ address: address, key: keyPair, name: name })
      alert(keyPair.toWIF())
      managBD.InsertAddressDb(address, name.toString(), keyPair.toWIF())
    },
    MultisigAddress (holders, signs, name) {
      let keyList = []
      var yourKey = bitcoin.ECPair.makeRandom({ network: settings.data() })
      alert('Your public key: ' + yourKey.publicKey.toString('hex'))
      console.log('Your public key: ' + yourKey.publicKey.toString('hex'))
      alert('Your private key: ' + yourKey.privateKey.toString('hex'))
      console.log('Your private key: ' + yourKey.toWIF())
      keyList.push(yourKey.publicKey)
      for (let i = 0; i < holders - 1; i++) {
        let newKey = prompt('Enter public key')
        // let newKey = '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01' //  --- для electron, так как там  не работает prompt
        let publicKeyBuffer = newKey
        alert(newKey)
        console.log(newKey)
        keyList.push(publicKeyBuffer)
      }
      const pubkeys = keyList.map(hex => Buffer.from(hex, 'hex'))
      const { address } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({ m: signs, pubkeys, network: settings.data() })
      }, settings.data())
      alert(address)
      console.log(address)
      let json = JSON.stringify(keyList);
      multisigContacts.push({ address: address, key: yourKey, holders: holders, signs: signs, keyList: keyList, name: name })
      managBD.InsertMultisigDb()
    },

    SignTransaction(str1, str2, amount, key){
      let tx = new bitcoin.TransactionBuilder()
      tx.addInput(str1, 1)
      tx.addOutput(str2, amount * 1000000)
      tx.sign(0, key)
      return tx.build().toHex()
    },

    /*Scan (key) {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          let text = confirm('We got a barcode\n' +
          'Result: ' + result.text + '\n')
          let pos1 = result.text.indexOf('"Input":"') + 8
          let pos2 = result.text.indexOf('"Output":"') + 9
          let pos3 = result.text.indexOf('"Amount":"') + 9
          let str1 = result.text.substring(pos1 + 1, result.text.indexOf('"', pos1 + 1))
          let str2 = result.text.substring(pos2 + 1, result.text.indexOf('"', pos2 + 1))
          let amount = result.text.substring(pos3 + 1, result.text.indexOf('"', pos3 + 1))
          let tx = this.SignTransaction(str1, str2, amount, key)
          alert(tx)
          if (text !== Boolean(false)) {
            cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, tx, function (success) {
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
    },*/
    /*Scan(key) {
      this.result = result
    },*/
    GoToMultisigAddress (key, holders, signs, keyList, address, name) {
      console.log(keyList);
     this.$router.push({ name: 'BitcoinMultisigPage', params: { key: key, signs: signs, holders: holders, keyList: keyList, address: address, name: name } })
    },

    GoToAddress (name, address, key) {
      this.$router.push({ name: 'BitcoinPage', params: { key: key, name: name, address: address } })
    },
    GoBack () {
      this.$router.go(-1)
    },
    GoToSettings (name){
      this.$router.push({ name: 'SettingsPage', params: {name: name} })
    }
  }
}
