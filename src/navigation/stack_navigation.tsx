import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/main_screen/screen";
import SearchScreen from "../screens/search_screen/screen";
import { subBackGround, whiteColor } from "../constants";

const Stack = createStackNavigator()

export default function StackNavigation (){
  
   return( 
     <Stack.Navigator initialRouteName="home" screenOptions={{
        headerStyle:{
            backgroundColor:subBackGround,
        },
        headerTintColor:whiteColor
   }}>  
        <Stack.Screen options={{headerShown:false}}  name="home" component={MainScreen}/>
        <Stack.Screen options={{headerTitle: 'Search'}}  name="search" component={SearchScreen}/>
        
    </Stack.Navigator>)
}