import * as React from 'react';
import {SafeAreaView, StyleSheet, VirtualizedList} from 'react-native';

import StyledListItem from '../components/StyledListItem';
import {Text, View} from '../components/Themed';

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

export default function HistoryScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Name, Quantity</Text>
            <VirtualizedList
                data={DATA}
                initialNumToRender={4}
                renderItem={({item}) => <StyledListItem name={item.title} qty={2} id={'h24'}/>}
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
});
