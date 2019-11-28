import '../..//shim';
import React from 'react';
import QRCode from 'react-native-qrcode-image';
import { StyleSheet, View } from 'react-native';

export class BarcodeGeneration extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <QRCode
              value = {this.props.navigation.getParam('transaction')}
              size={400}
              bgColor='#FFFFFF'
              fgColor='#000000'></QRCode>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginLeft: 5
  }
});