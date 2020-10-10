import * as React from 'react';
import {StyleSheet} from 'react-native';

import {Text, View} from '../components/Themed';
import ToggleSwitch from "../components/settings/toggle_switch";

export default function SettingsScreen() {
  return (
      <View style={styles.main_container}>
        <View style={styles.heading_container}>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
        </View>
        <View style={styles.body_container}>
          <Text style={styles.body}>This page will have app settings</Text>
          <ToggleSwitch/>
          <Text style={styles.body}> Default Scanner to Camera On</Text>
        </View>
      </View>

  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  heading_container: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  body_container: {
    flex: 1,
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
