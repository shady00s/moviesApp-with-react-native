import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/main_screen/screen";
import SearchScreen from "../screens/search_screen/screen";
import { backgroundColor, subBackGround, whiteColor } from "../constants";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userFirstTime } from '../constants';
import { useNavigation } from "@react-navigation/native";
import IntroScreen from "../screens/intro_screen/screen";
import LoginScreen from "../screens/login_screen/screen";
import { View } from "react-native";
import RegisterScreen from "../screens/register_screen/screen";

const Stack = createStackNavigator()

export default function StackNavigation (){

    const navigation = useNavigation<any>()
    const [isNewUser,setIsNewUser] = useState(null)
    // check if user is its first time 

  // useEffect(()=>{
  //  const  checkfirstTime = async()=>{ 
  //   AsyncStorage.getItem(userFirstTime,(err,userStatus)=>{
  //     if(err){
  //       console.log(err);
  //     }
  //     if(userStatus ==="false" || !userStatus){
  //       setIsNewUser(()=>true)
       
  //     }else{
  //       setIsNewUser(()=>false)

  //     }
  //   })
      
        
      
  // }
  // checkfirstTime().catch((err)=>{
  //   console.log(err)
  // })
   
  // },[])

  // useEffect(()=>{

  //   const setNewUser = async ()=>{
  //     await AsyncStorage.setItem(userFirstTime,"true",(err)=>{
  //     }).then(()=>{
  //       setIsNewUser(()=>false)

  //     })
  //   }
  //   if(isNewUser){
       
  //       setNewUser().then(()=>{
  //           navigation.navigate('intro-screen')
  //       })
        
  //     }else{

  //       navigation.navigate('home')
  //     }
   
  // },[isNewUser])
   
   return( 
     <Stack.Navigator  screenOptions={{
        headerStyle:{
            backgroundColor:subBackGround,
        },
        headerTintColor:whiteColor
   }}>  
        {/* <Stack.Screen options={{headerShown:false}}  name="home" component={MainScreen}/>
        <Stack.Screen options={{headerTitle: 'Search'}}  name="search" component={SearchScreen}/> 
        <Stack.Screen options={{headerShown:false}} name="login" component={LoginScreen}/>
      <Stack.Screen options={{headerShown:false}} name="intro-screen" component={IntroScreen}/> */}
        <Stack.Screen options={{headerShown:false}} name="register" component={RegisterScreen}/>

    
    </Stack.Navigator>)
}
