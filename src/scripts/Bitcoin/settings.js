let bitcoin = require('bitcoinjs-lib')
export default {    
    data (net) {
        switch (net){
            case "bitcoin":
                return bitcoin.networks.bitcoin
              case "testnet":
                return bitcoin.networks.testnet
              default:
                return bitcoin.networks.regtest
        }
    }
}