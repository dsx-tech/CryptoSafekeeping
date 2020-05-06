import settings from "src/scripts/Bitcoin/settings.js";
var QRious = require('QRious')
let bitcoin = require("bitcoinjs-lib");
var bch = require('bitcore-lib-cash');
var Transaction = bch.Transaction;
var Script = bch.Script;

export default {
  Transaction(hash, key, valuesend, getter, net, address) {
    console.log(hash)
    console.log(key)
    console.log(Math.floor(Number(valuesend) * 100000000))
    console.log(getter)
    console.log(address)
    var simpleUtxoWith100000Satoshis = {
        address: address,
        txId: hash,
        outputIndex: 0,
        script: Script.buildPublicKeyHashOut(address).toString(),
        satoshis: Math.floor(Number(valuesend) * 100000000)
      };
    var tr = new Transaction()
    .from(simpleUtxoWith100000Satoshis)
    .to(getter, Math.floor(Number(valuesend) * 100000000))
    .sign(key)
    .sign(key);

    console.log("transaction: " + tr)
    var qr = new QRious({
      element: document.getElementById('qr-transaction'),
      value: tr.toString('hex'),
      level: 'L',
      size: 500,
    })

  },
  MultisigTransaction(hash, key, getter, amount, net, signs, keyList) {
        let tx = bitcoin.Transaction.fromHex(hash, { network: settings.data(net) })
        const p2ms = bitcoin.payments.p2ms({ m: signs, pubkeys: keyList, network: settings.data() })
        const multisig = bitcoin.payments.p2sh({ redeem: p2ms, network: settings.data() })
        let data = { hash: tx.getId(), index: 1, nonWitnessUtxo: Buffer.from(str1, 'hex'), redeemScript: multisig.redeem.output }
        const psbt = new bitcoin.Psbt({ network: settings.data() })
          .addInput(data)
          .addOutput({
            address: getter,
            value: amount * 100000000
          })
          .signInput(0, key)
        const txLast = psbt.toBase64()
        console.log(txLast)
        psbt.validateSignaturesOfInput(0)
        psbt.finalizeAllInputs()
        var tr = psbt.extractTransaction().toHex()
        console.log(psbt.extractTransaction().toHex())

        var qr = new QRious({
          element: document.getElementById('qr-transaction'),
          value: tr,
          level: 'L',
          size: 500,
        })
  }
}
