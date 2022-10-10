/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import { HomePage } from '../screens/homeScreen';
import { HomePageNavigation } from './mainScreenNavigation';
import { MovieDetailsScreen } from './../screens/movieDetailsScreen';


export default function Navigation() {
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

