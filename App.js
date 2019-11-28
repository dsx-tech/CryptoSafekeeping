import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { ethers, Wallet } from 'ethers';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ChoicePrompt } from './src/navigation/ChoicePrompt';
import { ButtonsScreenEther } from './src/navigation/ButtonsScreenEther';
import { BarcodeScan } from './src/navigation/BarcodeScan';
import { BarcodeGeneration } from './src/navigation/BarcodeGeneration';

let barcode;

const MainNavigator = createStackNavigator({
  Home : {screen: ChoicePrompt},
  Ethereum: {screen: ButtonsScreenEther},
  ScanBarcode: {screen: BarcodeScan},
  BarcodeGeneration: {screen: BarcodeGeneration}
});

const App = createAppContainer(MainNavigator);

export default App;