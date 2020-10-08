import * as React from 'react';
import {StyleSheet} from 'react-native';
import Scanner from "../components/scanner";
import {Text, View} from '../components/Themed';

export default function ScanScreen() {
  return (
      <View style={styles.container}>
        <Text
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
          This page for scanning barcodes:
        </Text>
        <Scanner/>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
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
});
