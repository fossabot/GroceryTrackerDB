import React, {Component} from 'react';
import {Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Scanner from "../components/scanner";
import {Text, View} from '../components/Themed';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

// these sql functions don't seem to be working
function addToInventory({name, qty, UPC, notes}: { name: string, qty: string, UPC: string, notes: string }) {
    db.transaction(tx => {
        tx.executeSql(
            "create table if not exists inventory (id integer primary key not null, name text not null, qty integer not null, upc int, notes text, date DATETIME);"
        );
    });

    db.transaction(
        tx => {
            tx.executeSql("insert into inventory (name, qty, upc, notes, date) values (?, ?, ?, ?, datetime('now'))", [name, qty, UPC, notes]);
            tx.executeSql("select * from items", [], (_, {rows}) =>
                console.log(JSON.stringify(rows))
            );
        },
    );
}

function removeFromInventory() {

}

export default class ScanScreen extends Component {

    state = {
        mode: 'add',
        name: '',
        UPC: '',
        qty: '',
        notes: '',
        message: "",
    addbgColor: '#0ed145',
    removebgColor: '#BEA6A1',
  };

  onSubmit() {
      const {mode, name, UPC, qty, notes} = this.state;
      if (name === '' || qty === '') {
          Alert.alert("Error", 'Make sure you have something in all the required fields!');
          return false;
      }
      if (mode === 'remove') {
          Alert.alert('Removing', `name: ${name}\nUPC: ${UPC}\nQTY: ${qty}\nNotes: ${notes}`);
      } else {
          Alert.alert('Adding', `name: ${name}\nUPC: ${UPC}\nQTY: ${qty}\nNotes: ${notes} `);
          addToInventory({name, qty, UPC, notes});
      }
  }

  onAddToggle() {
    this.state.mode = 'add';
    this.setState({addbgColor: '#0ed145', removebgColor: '#BEA6A1',});
  }

  onRemoveToggle() {
    this.state.mode = 'remove';
    this.setState({addbgColor: '#A1AFA0', removebgColor: '#ec1c24',});
  }

  render() {

    return (
        <View style={styles.container}>

          <View style={styles.switchContainer}>
            <TouchableOpacity
                style={{
                    backgroundColor: this.state.addbgColor,
                    alignItems: 'center',
                    flex: 1,
                    height: 44,
                    padding: 10,
                    borderWidth: 0,
                    borderRadius: 0,
                    marginBottom: 10,
                }}
                onPress={() => this.onAddToggle()}
            >
                <Text style={styles.buttonText}> Add </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: this.state.removebgColor,
                    alignItems: 'center',
                    flex: 1,
                    height: 44,
                    padding: 10,
                    borderWidth: 0,
                    borderRadius: 0,
                    marginBottom: 10,
                }}
                onPress={() => this.onRemoveToggle()}
            >
                <Text style={styles.buttonText}> Remove </Text>
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
      backgroundColor: '#f2f2f7',
  },
  switchContainer: {
      flexDirection: 'row',
      paddingTop: 5,
      marginHorizontal: 3,
      backgroundColor: '#f2f2f7',
  },
  rowContainer: {
      flexDirection: 'row',
      marginLeft: 7,
      marginRight: 7,
      backgroundColor: '#f2f2f7',
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
      borderWidth: 0,
      borderRadius: 10,
      marginHorizontal: 7,

      marginBottom: 7,
      marginTop: 5,
  },
  buttonText: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidthInput: {
      flex: 1,
      fontSize: 16,
      height: 44,
      padding: 1,
      borderWidth: 0,
      borderRadius: 7,
      backgroundColor: '#e3e3e8',
      marginVertical: 1,
      marginBottom: 5,
      paddingHorizontal: 8,
  },
  UpcInput: {
      flex: 3,
      fontSize: 16,
      height: 44,
      padding: 1,
      borderWidth: 0,
      borderRadius: 7,
      backgroundColor: '#e3e3e8',
      marginRight: 3,
      marginBottom: 5,
      paddingHorizontal: 8,
  },
  qtyInput: {
      flex: 1,
      fontSize: 16,
      height: 44,
      padding: 1,
      borderWidth: 0,
      borderRadius: 7,
      backgroundColor: '#e3e3e8',
      marginBottom: 5,
      paddingHorizontal: 8,
  },
});
