let ethers = require('ethers');
import Addresses from './Address.js';
import Transaction from './Transaction.js';
import QRcode from './QRcode.js';
import ERC20Token from './ERC20Token.js';
import File from '../filesystem.js';
import managBD from './ManagBD.js';
import { QrcodeStream } from 'vue-qrcode-reader'


export default {
  name: 'PageIndex',
  components: { QrcodeStream },
  data () {
    return {
      contacts: [],
      multisigContacts: [],
      inception: false,
      importKey: false,
      CountDialog: false,
      CountRequared: false,
      countHolders: '',
      countSigns: '',
      tab: 'addresses',
      walletName: '',
      showCamera: false,
      walletNameImport: '',
      nets: ['mainnet', 'ropsten', 'kovan', 'rinkeby', 'goerli'],
      chosenNet: '',
      creating: false
    }
  },
  
  beforeMount(){
    this.contacts = managBD.DownLoadAddresses();
    this.multisigContacts = managBD.DownLoadMultidigAdresses();
    console.log(this.multisigContacts)
    for (var i = 1; i < 99999; i++)
      window.clearInterval(i);
  },
  
  methods: {
    Address (walletName, net) {
      let result = Addresses.newAddress();
      let address = result[0]
      let pKey = result[1]
      this.contacts.push({ address: address, key: pKey, name: walletName, net: net})
      managBD.InsertAddressDb(address, walletName.toString(), pKey, net)
    },

    MultisigAddress(walletName, countHolders, countSigns) {
      let arrOwners = [];
      
      for (let i = 0; i < countHolders; i++) {
        let newKey = prompt('Enter public key')
        alert(newKey)
        console.log(newKey)
        arrOwners.push(newKey)
      }

      this.$router.push({name: 'EthereumMultisigCreation'})
      Addresses.newMultisigAddress(countSigns, arrOwners);
      this.multisigContacts.push({name: walletName, address: 'undefined', holders: countHolders, signs: countSigns, ownersList: arrOwners})
      File.write('MultiSigEthereum.json', multisigContacts);
    },

    Scan (key) {
      return QRcode.Scan();
    },

    CallMultiSig(){

      let contractAddress = '0x6692d46B5319a0AE807264155C6725EF951378eD';

      let to = '0xE704eBE589b6ac907887D1997df7BF69A50D416E';

      let privateKey = '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a';

      var transaction = {
        gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
        gasLimit: 8000000,
        data: '0x',
        to: to,
        value: 5,
        nonce: 12,
        chainId: 3
      };

      return Transaction.createMultiSigTransaction(privateKey, transaction, contractAddress);
	  },

	  ConfirmMultiSig(){

      let contractAddress = '0x6692d46B5319a0AE807264155C6725EF951378eD';

      let to = '0xE704eBE589b6ac907887D1997df7BF69A50D416E';

      let privateKey = '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a';

      let txNumber = 9;

      var transaction = {
        gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
        gasLimit: 8000000,
        data: '0x',
        to: to,
        value: 5,
        nonce: 12,
        chainId: 3
      };

      return Transaction.confirmMultisigTransaction(privateKey, transaction, contractAddress, txNumber)
	  },
	
    TokenContract(){   //testing single-sig contract
      let nonce = 60;

      let privateKey = '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a';

      let tokenAddress = "0x3b94F6446C1EB46472B246d40dC99162C271c3D4";
      
      let reciever = '0x6692d46B5319a0AE807264155C6725EF951378eD';

      let transaction = {
          gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
          gasLimit: 8000000,
          data: '',
          value: 1000,
          to: reciever,
          nonce: nonce,
          chainId: 3
      }


		  return ERC20Token.transfer(privateKey, transaction, tokenAddress)
    },
    
    TokenMultiContractSubmit(){
      let nonce = 60;

      let privateKey = '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a';

      //Address: 0xE704eBE589b6ac907887D1997df7BF69A50D416E
      let contractAddress = "0x6692d46B5319a0AE807264155C6725EF951378eD";
  
      let tokenAddress = "0x3b94F6446C1EB46472B246d40dC99162C271c3D4";
  
      let reciever = '6692d46B5319a0AE807264155C6725EF951378eD'
  
      let transaction = {
          gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
          gasLimit: 8000000,
          data: '0x',//func.encode(['0xCe39AB30911Eeb024eB6316123339A4893337639', 5, '0x']),
          to: reciever,
          nonce: nonce,
          chainId: 3
      }
  
      console.log('Creating multisig transaction: \n')
      ERC20Token.transferMulti(privateKey, transaction, tokenAddress, contractAddress)
    },

    GoToMultisigAddress (holders, signs, keylist, address, name, net) {
     this.$router.push({ name: 'EthereumMultisigPage', params: {signs: signs, holders: holders, keylist: keylist, address: address, name: name, contacts: this.contacts, net: net } })
    },

    GoToAddress(name, address, key, net){
      this.$router.push ({name: 'EthereumPage', params:{key: key, name: name, address: address, net: net} })
    },

    GoToCreationMultisigAddress (walletName) {
      this.$router.push({ name: 'EthereumMultisigCreation', params: {walletName: walletName} })
     },

    ImportKey(walletName) {
      if (this.$q.platform.is.mobile){
        cordova.plugins.barcodeScanner.scan(
          function (resultKey) {
            alert(resultKey.text)
            let result = Addresses.newAddress(resultKey.text);
            let address = result[0]
            let pKey = result[1]
            this.contacts.push({ address: address, key: pKey, name: walletName })
            managBD.InsertAddressDb(address, walletName.toString(), pKey)
          }
        )
      }
      else {
        this.walletNameImport = walletName
        this.camera = 'auto'
        this.showCamera = true
      }
    },

    turnCameraOff () {
      this.camera = 'off'
      this.showCamera = false
    },

    async onDecode (content) {
      alert(content)
      let wallet = new ethers.Wallet(content);
      let pKey = wallet.privateKey;
      let address = wallet.address;
      this.contacts.push({ address: address, key: pKey, name: this.walletNameImport })
      managBD.InsertAddressDb(address, this.walletName.toString(), pKey)
      this.turnCameraOff()
    },

    GoBack () {
      this.$router.go(-1)
    },

  }
}
