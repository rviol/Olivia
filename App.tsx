import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/index';
import AuthProvider from './src/contexts/auth';



export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor="#A020F0" />
      <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}
