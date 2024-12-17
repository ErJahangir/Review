import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import ReviewForm from './ReviewForm';

const Navigation = () => {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="home" component={Home} />
      <stack.Screen name="reviewform" component={ReviewForm} />
    </stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
