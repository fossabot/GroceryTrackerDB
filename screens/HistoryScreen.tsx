import * as React from 'react';
import {SafeAreaView, StyleSheet, VirtualizedList} from 'react-native';

import StyledListItem from '../components/StyledListItem';
import {Text, View} from '../components/Themed';

// placeholder data. Need stuff from backend people if this is to actually work

// name, upc, qty, notes, date
var inventoryList = [["CHIPS AHOY! Original Chocolate Chip Cookies, Family Size, 18.2 Oz", '044000033385', 1, 'none', '2020-11-22 21:50:35'],
    ["Pepperidge Farm Goldfish Cheddar Crackers, 30 Oz. Carton", '014100096559', 1, 'none', '2020-11-22 22:50:35'],
    ["Granny Smith Apples, Granny Smith", '888670019894', 7, 'none', '2020-11-22 22:50:35'],
    ["Old Bay Crab Cake Classic Mix", '696551678722', 54, 'none', '2020-11-22 22:50:35'],
    ["Old Bay Seasoning (7.5 Lbs.)", '818227628118', 12, 'none', '2020-11-22 22:50:35'],
    ["Crab Meat", '858274001489', 89, 'none', '2020-11-22 22:50:35'],
    ["Rutter's Whole Milk, Half Gallon", '071156500676', 1, 'none', '2020-11-22 22:50:35'],
    ["Berger Cookies - Original 15oz pack (Set of 4) - Baltimore delicious, hand-dipped, chocolate fudge cookies. Original homemade recipe.", '052395923532', 1, 'none', '2020-11-22 22:50:35'],
    ["Yellow Cake Mix", '853243005055', 3, 'none', '2020-11-22 22:50:35'],
    ["Classic Chocolate Cake Mix", '099482468309', 2, 'none', '2020-11-22 22:50:35'],
    ["BANDAID Rolled Gauze Large 5 Each by BandAid", '381371161416', 7, 'none', '2020-11-22 22:50:35'],
    ["Biore Charcoal, Deep Cleansing Pore Strips, 6 Nose Strips for Blackhead Removal on Oily Skin, with Instant Blackhead Removal and Pore Unclogging, Feat", '019100207431', 1, 'none', '2020-11-22 22:50:35'],
    ["Refurbished Apple iPhone 11 Pro Max 64GB - Space Gray Unlocked", '190199380554', 1, 'none', '2020-11-22 22:50:35'],
    ["Nabisco Honey Maid, Honey Graham Crackers, 14.4 oz612", '100012770981 ', 1, 'none', '2020-11-22 22:50:35'],
    ["Ziploc Qt Ziploc Freezer Bag", '818210470908', 2, 'none', '2020-11-22 22:50:35']];

// @ts-ignore
const DATA = [];

// @ts-ignore
const getItem = (data, index) => {
    // console.log('log');
    return {
        id: Math.random().toString(12).substring(0),
        title: `${inventoryList[index][0]}`,
        upc: inventoryList[index][1],
        qty: inventoryList[index][2],
        notes: `${inventoryList[index][3]}`,
        date: `${inventoryList[index][4]}`,
    }
}

// @ts-ignore
const getItemCount = (data) => {
    return inventoryList.length;
}

// @ts-ignore
const Item = ({title, qty}) => {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export default function HistoryScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.table_header}>
                <Text style={styles.name}>Product Name</Text>
                <Text style={styles.qty}>Quantity</Text>
                <Text style={styles.delete}>Action</Text>
            </View>
            <VirtualizedList
                // @ts-ignore
                data={DATA}
                initialNumToRender={4}
                renderItem={({item}) => <StyledListItem name={item.title} qty={item.qty} id={item.id} upc={item.upc}
                                                        date={item.date} notes={item.notes} icon={'undo'}/>}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
        marginLeft: 7,
    },
    body: {
        fontSize: 14,
        justifyContent: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    table_header: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 5,
        backgroundColor: 'grey',
    },
    name: {
        flex: 6,
        marginLeft: 7,
    },
    qty: {
        flex: 2,
    },
    delete: {
        flex: 1,
    },
});
