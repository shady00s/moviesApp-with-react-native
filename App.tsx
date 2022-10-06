import { View,Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {

 let isLoaded:boolean =  useCachedResources() 
 if (isLoaded) {
  return (
    <SafeAreaProvider>
      <Navigation  />
      
    </SafeAreaProvider>
  )
 }  else{
  return <View><Text>Loading</Text></View> ;
 } 
  }



