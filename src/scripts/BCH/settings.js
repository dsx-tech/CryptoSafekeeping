var bch = require('bitcore-lib-cash');
import { Networks } from 'bitcore-lib-cash';
export default {    
    data (net) {
        switch (net){
            case "livenet":
                return Networks.livenet
              case "testnet":
                return Networks.testnet
              default:
                return Networks.regtest
        }
    }
}