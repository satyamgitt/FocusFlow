/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AppListScreen from './screens/AppListScreen';
import TriggerAssignScreen from './screens/TriggerAssignScreen';

const Stack = createNativeStackNavigator();

const MotivationLibraryScreen = () => (
  <View style={styles.screen}><Text style={styles.text}>Motivation Library Screen</Text></View>
);
const SubscriptionScreen = () => (
  <View style={styles.screen}><Text style={styles.text}>Subscription Screen</Text></View>
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#6C5CE7' },
            headerTintColor: '#fff',
            contentStyle: { backgroundColor: '#FFEAA7' },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="AppList" component={AppListScreen} />
          <Stack.Screen name="TriggerAssign" component={TriggerAssignScreen} />
          <Stack.Screen name="MotivationLibrary" component={MotivationLibraryScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEAA7',
    borderRadius: 16,
    margin: 16,
  },
  text: {
    color: '#2D3436',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
