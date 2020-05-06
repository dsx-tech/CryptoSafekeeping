import settings from "src/scripts/Bitcoin/settings.js";
var QRious = require('QRious')
let bitcoin = require("bitcoinjs-lib");

export default {
  Transaction(hash, key, valueget, valuesend, getter, net, publicKey) {
    let tx = bitcoin.Transaction.fromHex(hash, { network: settings.data(net) })
    const psbt = new bitcoin.Psbt({ network: settings.data(net) });

    psbt.addInput({
      // if hash is string, txid, if hash is Buffer, is reversed compared to txid
      hash: tx.getId(),
      index: 0,

      // non-segwit inputs now require passing the whole previous tx as Buffer
      nonWitnessUtxo: Buffer.from(
        hash +
        // value in satoshis (Int64LE) = 0x015f90 = 90000
        valuesend +
        // scriptPubkey length
        publicKey.length +
        // scriptPubkey
        publicKey +
        // locktime
        '00000000',
        'hex',
      ),

    });

    psbt.addOutput({
      address: getter,
      value: valueget * 100000000,
    });
    psbt.signInput(0, key);
    psbt.validateSignaturesOfInput(0);
    psbt.finalizeAllInputs();
    var tr = psbt.extractTransaction().toHex()

    console.log("transaction: " + tr)
    var qr = new QRious({
      element: document.getElementById('qr-transaction'),
      value: tr,
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
