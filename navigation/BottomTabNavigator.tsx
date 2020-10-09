import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import GroceriesScreen from '../screens/GroceriesScreen';
import ScanScreen from '../screens/ScanScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HistoryScreen from "../screens/HistoryScreen";
import ShoppingScreen from "../screens/ShoppingScreen";
import {
    BottomTabParamList,
    GroceriesParamList,
    HistoryParamList,
    ScanParamList,
    SettingsParamList,
    ShoppingParamList
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Scan"
            tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
            <BottomTab.Screen
                name="Inventory"
                component={GroceriesNavigator}
                options={{
                    tabBarIcon: ({color}) => <Ionicons name="ios-list" size={24} color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Shopping"
                component={ShoppingNavigator}
                options={{
                    tabBarIcon: ({color}) => <Ionicons name="ios-cart" size={24} color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Scan"
                component={ScanNavigator}
                options={{
                    tabBarIcon: ({color}) => <Ionicons name="ios-barcode" size={24} color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="History"
                component={HistoryNavigator}
                options={{
                    tabBarIcon: ({color}) => <Ionicons name="ios-clock" size={24} color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-settings" color={color}/>,
                }}
            />
        </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const GroceriesStack = createStackNavigator<GroceriesParamList>();

function GroceriesNavigator() {
  return (
      <GroceriesStack.Navigator>
          <GroceriesStack.Screen
              name="GroceriesScreen"
              component={GroceriesScreen}
              options={{headerTitle: 'Groceries List'}}
          />
      </GroceriesStack.Navigator>
  );
}

const ShoppingStack = createStackNavigator<ShoppingParamList>();

function ShoppingNavigator() {
    return (
        <ShoppingStack.Navigator>
            <ShoppingStack.Screen
                name="ShoppingScreen"
                component={ShoppingScreen}
                options={{headerTitle: 'Shopping List'}}
            />
        </ShoppingStack.Navigator>
    );
}

const ScanStack = createStackNavigator<ScanParamList>();

function ScanNavigator() {
    return (
        <ScanStack.Navigator>
            <ScanStack.Screen
                name="ScanScreen"
                component={ScanScreen}
                options={{headerTitle: 'Scan'}}
            />
        </ScanStack.Navigator>
    );
}

const HistoryStack = createStackNavigator<HistoryParamList>();

function HistoryNavigator() {
    return (
        <HistoryStack.Navigator>
            <HistoryStack.Screen
                name="HistoryScreen"
                component={HistoryScreen}
                options={{headerTitle: 'History'}}
            />
        </HistoryStack.Navigator>
    );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{headerTitle: 'Tab Two Title'}}
            />
        </SettingsStack.Navigator>
    );
}
