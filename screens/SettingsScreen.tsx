import * as React from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Divider, Subheading} from 'react-native-paper';
import SettingsItem from '../components/SettingsItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('@barcode_Key', value)
  } catch (e) {
    // saving error
    console.log('key storage storage error');
  }
}

function handle_key_change() {
  Alert.prompt(
      'Enter API Key',
      'Enter your API key for barcodelookup.com',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: password => storeData(password),
        },
      ],
      'plain-text'
  );
}

export default function SettingsScreen() {

  let GTDB_Demo: { app_mode: boolean; };

  let demo_mode = false;

  // @ts-ignore
  return (
      <ScrollView
          style={styles.main_container}
      >
        <Divider/>
        <SettingsItem
            label="Demo Mode"
            value={demo_mode}
            onValueChange={() => {
              AsyncStorage.setItem(
                  'demo_key',
                  demo_mode ? 'true' : 'false'
              );
            }}
        />
        <Divider/>
        <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
        >
          <Subheading onPress={() => handle_key_change()}>Change Barcode API Key</Subheading>
        </View>
        <Divider/>
        <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
        >
          <Subheading onPress={() => {
            storeData("pdd978huo2zcxnz2dp4tb4f9vjgl6d");
            Alert.alert("Success", "Key Stored");
          }}>Reset to default Barcode API Key</Subheading>
        </View>
        <Divider/>
      </ScrollView>

  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  switch_container: {
    flexWrap: 'wrap',
    width: 100,
  },
  heading_container: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  body_container: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
