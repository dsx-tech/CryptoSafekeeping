export default {
    Address () {
    alert("ddd");
  var pKey = ethers.Wallet.createRandom().privateKey;
  alert('New wallets private key: ' + pKey);
  contacts.push({ id: 6, name: 'first wallet', key: pKey });
    }
};
