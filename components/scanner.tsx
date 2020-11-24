import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';

import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: string) => {
    try {
        await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
        // saving error
        console.log('Upc storage error');
    }
}

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);


    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            // @ts-ignore
            setHasPermission(status === 'granted');
        })();
    }, []);

    // @ts-ignore
    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        storeData(data);
        //this.forceUpdate();
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    // @ts-ignore
    return (
        <View
            style={{
                flex: 1,

            }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.ean8,
                    BarCodeScanner.Constants.BarCodeType.upc_a, BarCodeScanner.Constants.BarCodeType.upc_e,
                    BarCodeScanner.Constants.BarCodeType.upc_ean]}
            />

            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
        </View>
    );
}
