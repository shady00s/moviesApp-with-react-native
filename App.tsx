import { View,Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { store } from './redux/store';
import { Provider } from 'react-redux';
export default function App() {

 let isLoaded:boolean =  useCachedResources() 
 if (isLoaded) {
  return (
    <Provider store={store}>
        <SafeAreaProvider>
        <Navigation  />
      
        </SafeAreaProvider>
    </Provider>
    
  )
 }  else{
  return <View><Text>Loading</Text></View> ;
 } 
  }



