import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import StyledListItem from '../components/StyledListItem';
import {Text, View} from '../components/Themed';

import * as SQLite from 'expo-sqlite';
import {SQLResultSetRowList} from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

//[["Eggs",2],["Muffins",4],["Chips",6]];
var inventoryList: SQLResultSetRowList;

// @ts-ignore
const DATA = [];

// @ts-ignore
const getItem = (data, index) => {
    return {
        id: Math.random().toString(12).substring(0),
        title: `${inventoryList[index][0]}`,
        qty: inventoryList[index][1],
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

function Items({done: doneHeading, onPressItem}) {
    const [items, setItems] = React.useState(null);
    let results;

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql("select * from inventory;", [], (_, {rows}) =>
                results = JSON.stringify(rows)
            );
        });
    }, []);

    if (items === null || items.length === 0) {
        return (
            <View>
                <Text>Empty {results}</Text>
            </View>
        );
    }

    return (
        <View>
            {items.map(({id, name, qty, upc, notes, date}) => (
                <StyledListItem name={name} qty={qty} id={id}/>
            ))}
        </View>
    );
}

export default function TabOneScreen() {
    const [text, setText] = React.useState(null)
    const [forceUpdate, forceUpdateId] = useForceUpdate()

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists inventory (id integer primary key not null, name text not null, qty integer not null, upc int, notes text);"
            );
        });
    }, []);

    const [value, onChangeText] = React.useState('Useless Placeholder');
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Name, Quantity</Text>
                <Items
                    done
                    key={`forceupdate-done-${forceUpdateId}`}
                    onPressItem={id =>
                        db.transaction(
                            tx => {
                                tx.executeSql(`delete from items where id = ?;`, [id]);
                            },
                            null,
                            forceUpdate
                        )
                    }
                />
            </ScrollView>
        </SafeAreaView>
    );
}

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
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
});
