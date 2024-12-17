import {StyleSheet, View} from 'react-native';
import React from 'react';

import Home from './Pages/Home';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './Pages/Navigation';

const App = () => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
