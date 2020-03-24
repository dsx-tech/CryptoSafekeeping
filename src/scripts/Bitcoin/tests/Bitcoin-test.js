let bitcoin = require('bitcoinjs-lib')
import index from '../index.js'

function SignTransaction(str1, str2, amount){
  /*  let str1 = '7d067b4a697a09d2c3cff7d4d9506c9955e93bff41bf82d439da7d030382bc3e'
    let str2 = '1KRMKfeZcmosxALVYESdPNez1AP1mEtywp'
    let amount = 0.8 */
    let key = bitcoin.ECPair.fromWIF('L4TTkYNJo6ZYW4rdLKp3gPyUnDuVrSHCTKW958HKouLymzwgE3m5')

    return index.methods.SignTransaction(str1, str2, amount, key)
  }

module.exports = { SignTransaction };