
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
import { MyMoviesScreen } from '../screens/myMoviesScreen';
const BottomTab = createBottomTabNavigator()



export function HomePageNavigation(){
    return(
        <BottomTab.Navigator tabBar={()=><NavButtons/>}>
            <BottomTab.Screen name="HomeScreen" component={HomePage} options={{ headerShown: false }} />
            <BottomTab.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <BottomTab.Screen name="MyMoviesScreen" component={MyMoviesScreen} options={{ headerShown: false }} />
        
        </BottomTab.Navigator>
    )
}



function NavButtons(){
    const [isActive,setIsActive]= useState<number>(0)
    type BottomnavigationList = {
        HomeScreen:undefined,
        ProfilePage:undefined,
        MyMoviesScreen:undefined
        Details:{data:string}
    }

    type BottomnavigationProp = NativeStackNavigationProp<BottomnavigationList>
    const navigator = useNavigation<BottomnavigationProp>()


    type navListType = {name:any,title:string,iconName:string}
const navList:navListType[] = [
    {name:"HomeScreen",iconName:"home",title:"Home"},
    {name:"MyMoviesScreen",iconName:"ios-play-circle-outline",title:"My Movies"},
    {name:"ProfileScreen",iconName:"person",title:"Profile"}]

    
    return(
        <View style={style.mainContainer}>
             { navList.map((element,index)=> <TouchableOpacity key={index} onPress={()=>{
                 setIsActive(index)
             
                 navigator.navigate(element.name
                    )
             }
               }>
        { isActive===index? <View style={style.indecator}></View>:null} 
        <View>
            <Icon  type={element.iconName === "ios-play-circle-outline"? "ionicon":""} color={lightGreyColor} name={element.iconName}/>
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