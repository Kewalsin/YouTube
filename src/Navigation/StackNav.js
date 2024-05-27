import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Components/Home';
import VideoScreen from '../Components/VideoScreen';
import SearchScreen from '../Components/SearchScreen';

const Stack = createNativeStackNavigator();
const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Video" component={VideoScreen} />
        <Stack.Screen name='Search' component={SearchScreen}/>
      </Stack.Navigator> 
    </NavigationContainer>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
