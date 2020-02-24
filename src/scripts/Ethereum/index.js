var ethers = require('ethers')

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
      var pKey = ethers.Wallet.createRandom().privateKey
      alert('New wallets private key: ' + pKey)
      contacts.push({ id: 6, name: 'first wallet', key: pKey })
    },

    MultisigAddress() {

    },

    AddressPage () {

    },

    Scan (key) {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          var ethers = require('ethers')
          
          alert(result.text)
          let json_result = JSON.parse(result.text)

           /*
            //TO enter in JSON
            {
                      nonce: 0,
                      gasLimit: 21000,
                      gasPrice: 2000000000,

                      to: "0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290",

                      value: 0.05,
                      data: "0x",

                      // This ensures the transaction cannot be replayed on different networks
                      chainId: "ropsten"
                    }
            */

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
        }
      )
    },

    CreateMultisigContract(){
      var fs = require("fs");

      //alert('ha a ghfhgvh');
      console.log("fff");
        // The Contract interface
      //let abi = fs.readFileSync("contracts/ABI.txt");
      let abi = [
       /*
        *  Events
        */
        "event Confirmation(address indexed sender, uint indexed transactionId)",
        "event Revocation(address indexed sender, uint indexed transactionId)",
        "event Submission(uint indexed transactionId)",
        "event Execution(uint indexed transactionId)",
        "event ExecutionFailure(uint indexed transactionId)",
        "event Deposit(address indexed sender, uint value)",
        "event OwnerAddition(address indexed owner)",
        "event OwnerRemoval(address indexed owner)",
        "event RequirementChange(uint required)",

        /*
        *  Constants
        */
        "uint constant public MAX_OWNER_COUNT = 50",

        /*
        *  Storage
        */
        "mapping (uint => Transaction) public transactions",
        "mapping (uint => mapping (address => bool)) public confirmations",
        "mapping (address => bool) public isOwner",
        "address[] public owners",
        "uint public required",
        "uint public transactionCount"

      ];
      alert("ffsadsadf");
      // The bytecode from Solidity, compiling the above source
      let bytecode = fs.readFileSync("contracts/Bytecode.txt")
      
      // Connect to the network
      let provider = ethers.getDefaultProvider('ropsten');
      
      // Load the wallet to deploy the contract with
      let privateKey = '0x1778b368d6847f01cc48dc891598675db61500b31cfe6448eb564ccfdcab698c';
      let wallet = new ethers.Wallet(privateKey, provider);
      
      // Deployment is asynchronous, so we use an async IIFE
      (async function() {
        let overrides = {
      
            // The maximum units of gas for the transaction to use
            gasLimit: 376000,
        
            // The price (in wei) per unit of gas
            gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
        
            // The nonce to use in the transaction
            nonce: 124,
        
            // The amount to send with the transaction (i.e. msg.value)
            //value: utils.parseEther('1.0'),
        
            // The chain ID (or network ID) to use
            //chainId: 1
        
        }
      
      
        // Create an instance of a Contract Factory
        let factory = new ethers.ContractFactory(abi, bytecode, wallet);
      
        // Notice we pass in "Hello World" as the parameter to the constructor
        let transaction = await factory.getDeployTransaction("Hello World", overrides);
        alert("ffsadsadf");
        let signPromise = wallet.sign(transaction);
        console.log("wallet : " + wallet.address);
      
        signPromise.then((signedTransaction) => alert("trans: " + signedTransaction));
      
      
      })();
        
      }
  }
}