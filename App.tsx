import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import Navigation from './navigation';

export default function App() {
  const [fonts] = useFonts({
    'lato-regular':require('./assets/fonts/Lato-Regular.ttf')
  })

    return (
      <SafeAreaProvider>
        <Navigation  />
        
      </SafeAreaProvider>
    );
  }

