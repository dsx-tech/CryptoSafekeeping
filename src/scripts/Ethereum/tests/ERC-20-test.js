var ethers = require('ethers');
import ERC20Token from '../ERC20Token.js';
import Transaction from '../Transaction.js';

function sendToken(nonce){
    let privateKey = '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a';

    let tokenAddress = "0x3b94F6446C1EB46472B246d40dC99162C271c3D4";

    let transaction = {
        gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
        gasLimit: 8000000,
        data: '',
        value: 1000,
        to: tokenAddress,
        nonce: nonce,
        chainId: 3
    }
    console.log('Single sig token sending: \n')
    ERC20Token.transfer(privateKey, transaction)
}

function sendTokenMulti(nonce, nonce2, txNum){
    //Address: 0x55D73ccA422253a8a287074c6f4857Dd15EFdC46
    let privateKey = '0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a';

    //Address: 0xE704eBE589b6ac907887D1997df7BF69A50D416E
    let secondPrivateKey = '0x51cf48d3ac567c2cf65540d49f92cb8f50bba3a8b9b329814d96ad188dd70da8';

    let contractAddress = "0x6692d46B5319a0AE807264155C6725EF951378eD";

    let tokenAddress = "0x3b94F6446C1EB46472B246d40dC99162C271c3D4";

    let reciever = '6692d46B5319a0AE807264155C6725EF951378eD'

    let transaction = {
        gasPrice: ethers.utils.parseUnits('40.0', 'gwei'),
        gasLimit: 8000000,
        data: '',//func.encode(['0xCe39AB30911Eeb024eB6316123339A4893337639', 5, '0x']),
        to: contractAddress,
        nonce: nonce,
        chainId: 3
    }

    console.log('Creating multisig transaction: \n')
    ERC20Token.transferMulti(privateKey, transaction, tokenAddress, reciever)

    transaction.nonce = nonce2;

    console.log('Confirming multisig transacrion: \n')
    Transaction.confirmMultisigTransaction(secondPrivateKey, transaction, txNum)
}

module.exports = { sendToken, sendTokenMulti };