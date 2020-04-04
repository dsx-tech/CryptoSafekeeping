let bitcoin = require('bitcoinjs-lib')
export default {    
    data () {
        return bitcoin.networks.testnet
    }
}