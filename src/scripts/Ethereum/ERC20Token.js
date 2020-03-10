import MultisigContract from './contracts/MultisigContract.js'
import Transaction from './Transaction.js'
var ethers = require('ethers');

export default {
    transfer(){

        let abiToken = new MultisigContract().abiJSON;
        let provider = ethers.getDefaultProvider('ropsten');
        let privateKey = '0x9EA9EDB02DEA132BBF903299397496E51B6068D12DA040F0BD9FC503F60673B0';
        let wallet = new ethers.Wallet(privateKey, provider);
        
        //TO DO scan from QR-code
        let contractAddress = "0x3b94F6446C1EB46472B246d40dC99162C271c3D4";
        
        var iface = new ethers.utils.Interface(abiToken);
        var func = iface.functions.transfer;
        //var func = contract.functions.isOwner('0x00F7357E503B6cE0622Cf5311739dA27EDF4a875')
        
        //console.log('func data: ' + func.encode(['0x98773812A261A98Bb73d00EC9B72dEA0BD2a9479', '0x6692d46B5319a0AE807264155C6725EF951378eD', 1000]))

        var transaction = {
            gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
            gasLimit: 8000000,
            data: func.encode(['0x6692d46B5319a0AE807264155C6725EF951378eD', 1000]),
            to: contractAddress,
            nonce: 10,
            chainId: 3
        }

        new Transaction.signing(wallet, transaction)
    }
}