/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomePageNavigation } from './mainScreenNavigation';
import { MovieDetailsScreen } from './../screens/movieDetailsScreen';

import { homePageThunk } from '../redux/thunk/homePageThunk';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

export default function Navigation() {
  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(()=>{
    
    dispatch(homePageThunk())
  } ,[])
  return (
    <NavigationContainer>
      
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="mainPage" component={HomePageNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="movieScreen" component={MovieDetailsScreen} options={{ headerShown: false }} />
      

      
    </Stack.Navigator>
  );
}

