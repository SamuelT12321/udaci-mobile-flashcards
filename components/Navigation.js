import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import DeckList from './DeckList';
import AddDeck from './AddDeck';
import DeckDetail from './DeckDetail';
import AddDeckCard from './AddDeckCard';
import TakeQuiz from './TakeQuiz';
import Setting from './Setting'

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={DeckList} />
      <Tab.Screen name="New Deck" component={AddDeck} />
      <Tab.Screen name="App Setting" component={Setting} />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Deskboard"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="DeckDetail" component={DeckDetail} />
      <Stack.Screen name="AddDeckCard" component={AddDeckCard} />
      <Stack.Screen name="TakeQuiz" component={TakeQuiz} />
    </Stack.Navigator>
  );
}
class Navigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
}

export default Navigation;
