
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

