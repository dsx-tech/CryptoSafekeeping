import MultisigContract from './contracts/MultisigContract.js'
import Contract from './contracts/Contract.js'
import Transaction from './Transaction.js'
var ethers = require('ethers');

export default {

    transfer(privateKey, transaction){

        let abiToken = new MultisigContract().abiJSON;
        //to do: get provider by id from transaction
        let provider = ethers.getDefaultProvider('ropsten');
        let wallet = new ethers.Wallet(privateKey, provider);
        
        var iface = new ethers.utils.Interface(abiToken);
        var func = iface.functions.transfer;
        
        transaction.data =  func.encode(['0x6692d46B5319a0AE807264155C6725EF951378eD', transaction.value])
        transaction.value = 0

        return Transaction.signing(wallet, transaction)
    },

    transferMulti(privateKey, transaction, tokenAddress, reciever){      

        let abiJSON = new Contract().abiJSON
        //to do: get provider by id from transaction
        let provider = ethers.getDefaultProvider('ropsten');
        let wallet = new ethers.Wallet(privateKey, provider);
        
        let iface = new ethers.utils.Interface(abiJSON);
        let func = iface.functions.submitTransaction;
        transaction.data = func.encode([tokenAddress, 0, '0xa9059cbb000000000000000000000000' + reciever + '00000000000000000000000000000000000000000000000000000000000003e8']),

        transaction.value = 0

        return Transaction.signing(wallet, transaction)
    }
}