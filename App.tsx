import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './src/screens/main_screen/screen';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/stack_navigation';

export default function App() {
  return (
    <>
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
    </>
  );
}

