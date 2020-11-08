import * as React from 'react';
import {Component} from 'react';
import {Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Scanner from "../components/scanner";
import {Text, View} from '../components/Themed';

export default class ScanScreen extends Component {
  state = {
    mode: '',
    name: '',
    UPC: '',
    qty: '',
    notes: '',
    message: "",
  };

  callbackFunction = (childData) => {
    this.setState({message: childData})
  }

  onSubmit() {
    const {mode, name, UPC, qty, notes} = this.state;
    if (mode === 'remove') {
      Alert.alert('Removing', `name: ${name}\nUPC: ${UPC}\nQTY: ${qty}\nNotes: ${notes}`);
    } else {
      Alert.alert('Adding', `name: ${name}\nUPC: ${UPC}\nQTY: ${qty}\nNotes: ${notes}`);
    }
  }

  onAddToggle() {
    this.state.mode = 'add';
  }

  onRemoveToggle() {
    this.state.mode = 'remove';
  }

  render() {
    return (
        <View style={styles.container}>
          <Text
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)">
            This page for scanning barcodes:
          </Text>

          <View style={styles.switchContainer}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={this.onAddToggle.bind(this)}
            >
              <Text style={styles.buttonText}> ADD </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={this.onRemoveToggle.bind(this)}
            >
              <Text style={styles.buttonText}> REMOVE </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            <TextInput
                value={this.state.name}
                keyboardType='default'
                onChangeText={(name) => this.setState({name})}
                placeholder='Product name'
                placeholderTextColor='grey'
                style={styles.fullWidthInput}
            />
          </View>
          <View style={styles.rowContainer}>
            <TextInput
                value={this.state.UPC}
                keyboardType='number-pad'
                onChangeText={(UPC) => this.setState({UPC})}
                placeholder='UPC (barcode)'
                placeholderTextColor='grey'
                style={styles.UpcInput}
            />
            <TextInput
                value={this.state.qty}
                keyboardType='number-pad'
                onChangeText={(qty) => this.setState({qty})}
                placeholder='QTY'
                placeholderTextColor='grey'
                style={styles.qtyInput}
            />
          </View>
          <View style={styles.rowContainer}>
            <TextInput
                value={this.state.notes}
                keyboardType='default'
                onChangeText={(notes) => this.setState({notes})}
                placeholder='Notes + Extra Info'
                placeholderTextColor='grey'
                style={styles.fullWidthInput}
            />
          </View>
          <Scanner/>
          <TouchableOpacity
              style={styles.button}
              onPress={this.onSubmit.bind(this)}
          >
            <Text style={styles.buttonText}> Submit </Text>
          </TouchableOpacity>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    borderRadius: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    marginLeft: 7,
    marginRight: 7,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '30%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00a8f3',
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 7,
    marginTop: 5,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#0ed145',
    flex: 1,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 0,
    marginBottom: 10,
  },
  removeButton: {
    alignItems: 'center',
    backgroundColor: '#ec1c24',
    flex: 1,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 0,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidthInput: {
    flex: 1,
    fontSize: 20,
    height: 44,
    padding: 1,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'grey',
    marginVertical: 1,
  },
  UpcInput: {
    flex: 3,
    fontSize: 20,
    height: 44,
    padding: 1,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'grey',
    marginVertical: 1,
    marginRight: 3,
  },
  qtyInput: {
    flex: 1,
    fontSize: 20,
    height: 44,
    padding: 1,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'grey',
    marginVertical: 1,
  },
});
