import { ethers } from 'ethers';
//mport * as RNFS from 'react-native-fs';

export function createNewRandomWallet(){
    //TODO autentification
    console.log("creating wallet...");

    let wallet = ethers.Wallet.createRandom();

    return wallet
}

export function createTransaction(to, gasLimit, gasPrice, value, chainId, tr_data){
    
    let data = {
        nonce: 0,
        gasLimit: gasLimit,
        gasPrice: gasPrice,

    
        to: to,
        // ... or supports ENS names
        // to: "ricmoo.firefly.eth",
    
        value: value,
        data: tr_data,
        
        // This ensures the transaction cannot be replayed on different networks
        chainId: chainId
    }

    return data
}


export function createTransactionFromBarcode(barcode){
    console.log(barcode.data)

    let json = JSON.parse(barcode.data)

    let tr_data = createTransaction(json.to, 
                    json.gasLimit, 
                    ethers.utils.bigNumberify(json.gasPrice), 
                    ethers.utils.parseEther(json.value + ""), 
                    ethers.utils.getNetwork(json.chainId).chainId, 
                    json.data)
    
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