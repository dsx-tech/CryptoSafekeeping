import './shim.js'
import crypto from 'crypto'
import Bitcoin from 'react-native-bitcoinjs-lib'


import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { RNCamera } from 'react-native-camera';
import { ethers, Wallet } from 'ethers';
import  {createNewRandomWallet, createTransaction, createTransactionFromBarcode, saveWallet} from "./source/funs";


import { StyleSheet, Text, View, Button } from 'react-native';

let barcode;

class CameraScreen extends React.Component {  

  render() {  
      return (
        <View style={styles.container}>
          <RNCamera
                  ref={ref => {
                    this.camera = ref;
                  }}
                  style={{
                    flex: 1,
                    width: '100%',
                    
                  }}
                  captureAudio={false}
                  onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    
                    //barcode = ;
                    barcode = barcodes[0]
                    console.log(barcode);
                    console.log("++++")
                  }}
                >
          </RNCamera>
        </View>
      )
  }  
}

class ButtonsScreen extends React.Component {
  
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
    const keypair = Bitcoin.ECPair.makeRandom()
    console.log("BTC adress: " + keypair.getAddress())
    let password = "foo";

    //const wallet = createNewRandomWallet();
    const wallet = new Wallet("0x6aa6b11778e120f4e856693953c07b2c679397763fa8afc6d5984425bc456f1a")
    //TODO saving wallets

    console.log("adress: ", wallet.address)
    console.log("privateKey: ", wallet.privateKey)

    this.setState({
      name: "wallet has been created",
      wallet: wallet
    })

    this.render()
    //saveWallet(this.state.wallet, 'firstwallet', 'foo')

   };

   onClickSignTransaction = () => {

    /*
    {
              nonce: 0,
              gasLimit: 21000,
              gasPrice: 2000000000,

              to: "0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290",

              value: 1.0,
              data: "0x",

              // This ensures the transaction cannot be replayed on different networks
              chainId: "homestead"
            }
    */

    let transaction = createTransactionFromBarcode(barcode)
    
    console.log(transaction)

    let signPromise = this.state.wallet.sign(transaction)

    signPromise.then((signedTransaction) => {
      this.setState({
      name: signedTransaction
    });
      console.log(signedTransaction)
    
    
    
      console.log("transaction complete")


      //to DELETE!!! internet is here
      let provider = ethers.getDefaultProvider()
      provider.sendTransaction(signedTransaction).then((tx) => {

      console.log(tx);
      // {
      //    // These will match the above values (excluded properties are zero)
      //    "nonce", "gasLimit", "gasPrice", "to", "value", "data", "chainId"
      //
      //    // These will now be present
      //    "from", "hash", "r", "s", "v"
      //  }
      // Hash:
  })
})
                .catch((error) => console.log("ERROR!!!! : " + error))

   }
   
   barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach(barcode => console.warn(barcode.data))
  };

   render() {
   return (
     <View style={styles.container}>
       <Text>{this.state.name}</Text>
       <View style={styles.buttonStyle}>
          <Button
                onPress={() => {this.onClickCreateWallet()}} 
                title='Create'
                color='#4169E1'>
          </Button>
        </View>
        <View style={styles.buttonStyle}>
          <Button
                onPress={() => {this.onClickSignTransaction()}} 
                title='Sign Transaction'
                color='#4169E1'>
          </Button>
        </View>
        <Button
        title="Scan"
        onPress={() => {
          const { navigate } = this.props.navigation;
          navigate('Profile')
          }}>
        </Button>
     </View>
   );
   }
}

//нахвания поменять, убрать ошибкку 500 с навигатором траблы
const MainNavigator = createStackNavigator({
  Home: {screen: ButtonsScreen},
  Profile: {screen: CameraScreen},
});

const App = createAppContainer(MainNavigator);



export default App;


const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#888',
     alignItems: 'center',
     justifyContent: 'center',
   }, 
   nameText: {
     fontSize: 50,
     padding: 15,
   },
   buttonStyle: {
    color: 'red',
    marginTop: 20,
    padding: 20,
    width: 150
   }
});