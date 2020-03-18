var ethers = require('ethers');
var QRious = require('QRious')
//var QRCode = require('./qr-code/qrcode.js');
//import QRcode2 from './qr-code/qrcode.js';
import Addresses from './Address.js';
import Transaction from './Transaction.js';
import QRcode from './QRcode.js'
import Desktop from './Desktop.js';
import ERC20Token from './ERC20Token.js';
import Vue from 'vue';
//import QrcodeVue from 'qrcode.vue'


const contacts = [ 
  {name: 'first', key: '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a'}, //0x55D73ccA422253a8a287074c6f4857Dd15EFdC46
    //4 ethers
  {name: 'second', key: '0x1778b368d6847f01cc48dc891598675db61500b31cfe6448eb564ccfdcab698c'}, // 0x00F7357E503B6cE0622Cf5311739dA27EDF4a875
    //3 ethers
  {name: 'third', key: '0x8358a123d279423f239dc2cbc5dede46975f9de654d800f594cbab4ae8faea34'}, //0xCe39AB30911Eeb024eB6316123339A4893337639
  {name: 'fourth', key: '0x51cf48d3ac567c2cf65540d49f92cb8f50bba3a8b9b329814d96ad188dd70da8'}, //0xE704eBE589b6ac907887D1997df7BF69A50D416E
	{name: 'fifth', key: '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a'},
	{name: 'sixth', key: '0x9EA9EDB02DEA132BBF903299397496E51B6068D12DA040F0BD9FC503F60673B0'}, //0x98773812A261A98Bb73d00EC9B72dEA0BD2a9479
]

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
      var qr = new QRious({

        element: document.getElementById('qr'),
        value: 'fff'
        
      })
      //new Vue({ el: '#components-demo' })
		  return Addresses.newAddress();
    },

    MultisigAddress() {
		  return Addresses.newMultisigAddress();
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
    }
  }
}