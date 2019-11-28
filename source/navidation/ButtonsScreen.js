import React from 'react';
import { ethers, Wallet } from 'ethers';
//import { BarcodeScan, BarcodeGeneration} from ''
import  {createNewRandomWallet, createTransaction, createTransactionFromBarcode, saveWallet} from '../funs';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class ButtonsScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Welcome',
  }

   constructor(props){
     super(props);
     this.state = {
     name: '',
     }
   }

   onClickCreateWallet = () => {

    //const wallet = createNewRandomWallet();
    const wallet = new ethers.Wallet("0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a")
    //address = 0x55D73ccA422253a8a287074c6f4857Dd15EFdC46
    
    //TODO saving wallets
    console.log("adress: ", wallet.address)
    console.log("privateKey: ", wallet.privateKey)

    this.setState({
      name: "wallet has been created",
      wallet: wallet
    })

    this.render()
   };

   onClickSignTransaction = () => {
    /*
    //TO enter in JSON
    {
              nonce: 0,
              gasLimit: 21000,
              gasPrice: 2000000000,

              to: "0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290",

              value: 0.05,
              data: "0x",

              // This ensures the transaction cannot be replayed on different networks
              chainId: "ropsten"
            }
    */
    let transaction = createTransactionFromBarcode(barcode)

    console.log(transaction)

    let signPromise = this.state.wallet.sign(transaction)
    console.log("wallet : " + this.state.wallet.address)

    signPromise.then((signedTransaction) => {
      const { navigate } = this.props.navigation;
      //navigate('Profile')
      

      console.log(signedTransaction)
      console.log("transaction complete")      
})
    .catch((error) => console.log("ERROR in singing transaction: " + error))

   }
   
   barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach(barcode => console.warn(barcode.data))
  };

   render() {
   return (
     <View style={styles.container}>
       <View style={styles.buttonView}>
          <Text
                style={styles.button}
                onPress={() => {this.onClickCreateWallet()}} 
                >
            Create wallet
          </Text>
        </View>
        <View style={styles.buttonView}>
          <Text
                style={styles.button}
                onPress={() => {this.onClickSignTransaction()}}
                >
            Sign Transaction
          </Text>
        </View>
        <View style={styles.buttonView}>
          <Text
                style={styles.button}
                onPress={() => {
                  const { navigate } = this.props.navigation;
                  navigate('ScanBarcode')
                }}>
              Scan
          </Text>
        </View>
     </View>
   );
   }
}