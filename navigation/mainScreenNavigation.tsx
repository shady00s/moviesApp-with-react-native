
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { TouchableOpacity, View,Text,StyleSheet } from 'react-native';
import { HomePage } from '../screens/homeScreen';
import { ProfileScreen } from './../screens/profileScreen';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { blackColor } from '../constants/Colors';
import { pinkColor, lightGreyColor } from './../constants/Colors';
import { useState } from 'react';
const BottomTab = createBottomTabNavigator()



export function HomePageNavigation(){
    return(
        <BottomTab.Navigator tabBar={()=><BottomNavBar/>}>
            <BottomTab.Screen name="HomeScreen" component={HomePage} options={{ headerShown: false }} />
            <BottomTab.Screen name="ProfilePage" component={ProfileScreen} options={{ headerShown: false }} />
        
        
        </BottomTab.Navigator>
    )
}

function BottomNavBar(){

   
    return(<View >


                <NavButtons/>
        
    </View>)
}

function NavButtons(){
    const [isActive,setIsActive]= useState<number>(0)
    type BottomnavigationList = {
        HomeScreen:undefined,
        ProfilePage:undefined,
        Details:{data:string}
    }

    type BottomnavigationProp = NativeStackNavigationProp<BottomnavigationList>
    const navigator = useNavigation<BottomnavigationProp>()


    type navListType = {name:any,title:string,iconName:string}
const navList:navListType[] = [
    {name:"HomeScreen",iconName:"home",title:"Home"},
    {name:"ProfilePage",iconName:"star",title:"My Movies"},
    {name:"HomeScreen",iconName:"person",title:"Profile"}]

    
    return(
        <View style={style.mainContainer}>
             { navList.map((element,index)=> <TouchableOpacity onPress={()=>{
                 setIsActive(index)
             
                 navigator.navigate(element.name
                    )
             }
               }>
        { isActive===index? <View style={style.indecator}></View>:null} 
        <View>
            <Icon color={lightGreyColor} name={element.iconName}/>
            <Text style={style.title}>
                {element.title}
            </Text>
        </View>
    </TouchableOpacity>)
    }
        </View>
      )
}

const style = StyleSheet.create({
    mainContainer:{
        paddingVertical:15,
        paddingHorizontal:20,
        height:65,
        backgroundColor:blackColor,
        justifyContent:"space-between",
        flexDirection:"row"
    },
    indecator:{
        position:"absolute",
        top:-15,
        width:"100%",
        height:3.5,
        borderRadius:2,
        backgroundColor:pinkColor
    },title:{
        paddingTop:3,
        color:lightGreyColor,
        fontFamily:'lato-regular'
    }
})