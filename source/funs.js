import { ethers } from 'ethers';
//mport * as RNFS from 'react-native-fs';

export function createNewRandomWallet(){
    //TODO autentification
    console.log("creating wallet...");

    let wallet = ethers.Wallet.createRandom();

    return wallet
}

export function createTransaction(to, gasLimit, gasPrice, value, chainId, tr_data, nonce){
    
    let data = {
        nonce: nonce,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        to: to,
        value: value,
        data: tr_data,
        chainId: chainId
    }

    return data
}


export function createTransactionFromBarcode(barcode){
    console.log(barcode.data)

    let json = JSON.parse(barcode.data)

    let tr_data = createTransaction(json.to, 
                    json.gasLimit, 
                    ethers.utils.bigNumberify(json.gasPrice)._hex, 
                    ethers.utils.parseEther(json.value + "")._hex, 
                    ethers.utils.getNetwork(json.chainId).chainId, 
                    json.data,
                    json.nonce)
    
                    console.log("]]]]]]")
    return tr_data
}

export function saveWallet(wallet, name, password){
    //is not working!!!
    let data = {
        name: name,
        privateKey: wallet.privateKey,
        password: password
    }

    let json = JSON.stringify(data)

    let path = RNFS.DocumentDirectoryPath + 'wallets/' + name + '.json';

    RNFS.writeFile(path, json)
                                    .then((success) => {
                                    console.log('FILE WRITTEN!');
                                    })
                                    .catch((err) => {
                                    console.log(err.message);
});

}