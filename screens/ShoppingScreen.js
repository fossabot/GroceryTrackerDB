import React, {useState} from 'react';
import {ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {Text, View} from '../components/Themed';

const db = SQLite.openDatabase("list.db");
// @ts-ignore
const DATA = [];

// @ts-ignore
const getItem = (data, index) => {
    return {
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`
    }
}

// @ts-ignore
const getItemCount = (data) => {
    return 50;
}

// @ts-ignore
const Item = ({title}) => {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

function Items({done: doneHeading, onPressItem}) {
    const [items, setItems] = React.useState(null);

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                `select * from items where done = ?;`,
                [doneHeading ? 1 : 0],
                (_, {rows: {_array}}) => setItems(_array)
            );
        });
    }, []);

    const heading = doneHeading ? "Bought" : "To Buy";

    if (items === null || items.length === 0) {
        return null;
    }

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>{heading}</Text>
            {items.map(({id, done, value}) => (
                <TouchableOpacity
                    key={id}
                    onPress={() => onPressItem && onPressItem(id)}
                    style={{
                        backgroundColor: done ? "#06905f" : "#fff",
                        borderColor: "#000",
                        borderWidth: 1,
                        padding: 8
                    }}
                >
                    <Text style={{color: done ? "#fff" : "#000"}}>{value}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default function ShoppingScreen() {
    const [text, setText] = React.useState(null)
    const [forceUpdate, forceUpdateId] = useForceUpdate()

    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists items (id integer primary key not null, done int, value text);"
            );
        });
    }, []);

    const add = (text) => {
        // is text empty?
        if (text === null || text === "") {
            return false;
        }

        db.transaction(
            tx => {
                tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
                tx.executeSql("select * from items", [], (_, {rows}) =>
                    console.log(JSON.stringify(rows))
                );
            },
            null,
            forceUpdate
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <TextInput
                    onChangeText={text => setText(text)}
                    onSubmitEditing={() => {
                        add(text);
                        setText(null);
                    }}
                    placeholder="What do you need to buy?"
                    style={styles.input}
                    value={text}
                />
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <ScrollView style={styles.listArea}>
                <Items
                    key={`forceupdate-todo-${forceUpdateId}`}
                    done={false}
                    onPressItem={id =>
                        db.transaction(
                            tx => {
                                tx.executeSql(`update items set done = 1 where id = ?;`, [
                                    id
                                ]);
                            },
                            null,
                            forceUpdate
                        )
                    }
                />
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
        </View>
    );
}

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
    },
    body: {
        fontSize: 14,
        justifyContent: 'center',
    },
    separator: {
        height: 1,
        width: '100%',
        marginBottom: 7,
    },
    sectionContainer: {
        marginBottom: 16,
        marginHorizontal: 16
    },
    sectionHeading: {
        fontSize: 18,
        marginBottom: 8
    },
    input: {
        flex: 1,
        height: 36,
        fontSize: 16,
        margin: 16,
        padding: 8,
        color: 'black',
    },
    flexRow: {
        flexDirection: "row"
    },
});
