import * as React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import {Text, View} from './Themed';

let empty = false;

function item_info({name, qty, id, upc, notes, date}: { name: string, qty: string | number, id: string, upc: string | number, notes: string, date: string }) {
    Alert.alert('Item Info', `id: ${id}\nName: ${name}\nUPC: ${upc}\nQTY: ${qty}\nNotes: ${notes}\nDate Added: ${date}`);
}

function set_state({state}: { state: boolean }) {
    empty = state;
    Alert.alert('Test', 'state = empty');
}

export default function StyledListItem({name, qty, id, upc, notes, date, icon}: { name: string, qty: string | number, id: string, upc: string | number, notes: string, date: string, icon: string }) {
    if (empty) {
        return null;
    }

    let state = true;

    return (
        <View style={styles.container_main}>
            <View style={styles.container}>
                <Text onPress={() => item_info({name, qty, id, upc, notes, date})} style={styles.name}>{name}</Text>
                <Text style={styles.qty}>{qty}</Text>
                <MaterialIcons name={icon} size={24} color='grey' style={styles.delete}
                               onPress={() => set_state({state})}/>
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
        marginLeft: 7,
    },
    delete: {
        flex: 1,
        paddingRight: 10,
    },
    separator: {
        marginVertical: 5,
        height: 1,
        width: '100%',
    },
});
