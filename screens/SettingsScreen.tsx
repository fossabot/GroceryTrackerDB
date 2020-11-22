import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Divider,} from 'react-native-paper';
import SettingsItem from '../components/SettingsItem';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SettingsScreen() {

  let GTDB_Demo: { app_mode: boolean; };

  let demo_mode = false;

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
