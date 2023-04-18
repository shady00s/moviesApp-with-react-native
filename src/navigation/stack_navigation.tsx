import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/main_screen/screen";
import SearchScreen from "../screens/search_screen/screen";
import { subBackGround, whiteColor } from "../constants";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userFirstTime } from '../constants';
import { useNavigation } from "@react-navigation/native";
import IntroScreen from "../screens/intro_screen/screen";
import LoginScreen from "../screens/login_screen/screen";

const Stack = createStackNavigator()

export default function StackNavigation (){

    const navigation = useNavigation<any>()
    const [isNewUser,setIsNewUser] = useState(false)
  async function checkfirstTime():Promise<boolean> {
      const userStatus:string = await AsyncStorage.getItem(userFirstTime)
      
      if(userStatus =="false" || !userStatus){
        setIsNewUser(()=>true)
        return true
      }else{
        setIsNewUser(()=>false)
        return false
      }
  }

  async function setNewUser():Promise<void>{
        await AsyncStorage.setItem(userFirstTime,"true")
        setIsNewUser(()=>false)
  }
  useEffect(()=>{
    checkfirstTime()
  },[])

  useEffect(()=>{
    if(isNewUser){
       
        setNewUser().then(()=>{
            navigation.navigate('intro-screen')
        })
    }
  },[isNewUser])
   return( 
     <Stack.Navigator  screenOptions={{
        headerStyle:{
            backgroundColor:subBackGround,
        },
        headerTintColor:whiteColor
   }}>  
        {/* <Stack.Screen options={{headerShown:false}}  name="home" component={MainScreen}/>
        <Stack.Screen options={{headerTitle: 'Search'}}  name="search" component={SearchScreen}/> */}
        {/* <Stack.Screen options={{headerShown:false}} name="intro-screen" component={IntroScreen}/> */}
        <Stack.Screen options={{headerShown:false}} name="login" component={LoginScreen}/>
    
    </Stack.Navigator>)
}