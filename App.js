/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import AppTabs from './src/navigation/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import Splash from './src/component/Splash';
import { Colors } from './src/common/colors';

export default function App() {
  const [isLoading,setIsLoading] = useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false);
    },1000)
   
  },[])
  return (
    <>
    <StatusBar backgroundColor={Colors.primaryGreen}/>
    <NavigationContainer>
      {
        isLoading?
        <Splash/>
        :<AppTabs />
    }
    </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

