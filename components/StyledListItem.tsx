import * as React from 'react';
import {StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import {Text, View} from './Themed';

export default function StyledListItem({name, qty, id}: { name: string, qty: number, id: string }) {
    return (
        <View style={styles.container_main}>
            <View style={styles.container}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.qty}>{qty}</Text>
                <MaterialIcons name='delete' size={24} color='grey' style={styles.delete}/>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    container_main: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        flex: 9,
        marginLeft: 7,
    },
    qty: {
        flex: 2,
    },
    delete: {
        flex: 1,
    },
    separator: {
        marginVertical: 5,
        height: 1,
        width: '100%',
    },
});
