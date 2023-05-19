import { useContext, useEffect, useState } from 'react';
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native';
import ThemeContext from '../../../context/theme_context';
import { subTextLightColorStyle, textLightColorStyle } from '../global_styles';
import { lightGrayColor, subBackGround, whiteColor, yellowColor } from '../../../constants';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import React from 'react';
import StorageManagerHandeler from '../../../utils/storage_manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
 const  FinishRegComponet =()=> {
    const {themeData} = useContext(ThemeContext)
    const [userName,setUserName] = useState("")

    const getUserNameFromAsyncStorage = async()=>{
        const storageData:string = await StorageManagerHandeler.getPageData("userData")
       const userNameFromStorage:string =  storageData
        // convert data from storage into object 
         const storageObject = JSON.parse(userNameFromStorage)
         setUserName(storageObject.name)
    }

    useEffect(()=>{
        getUserNameFromAsyncStorage()
    })
    return (<><View>
        <View style={{flexDirection:"row",alignItems:"center"}}>
            <Ionicons size={31} name={"color-wand-outline"} color={themeData === "dark"? yellowColor :subBackGround}/>
            <Text style={[style.title,themeData==="light"?textLightColorStyle:{}]}>All set {userName}</Text>
        </View>
            <Text style={[style.subTitle,themeData==="light"?subTextLightColorStyle:{}]}>Now your account has been created!</Text>
            <TouchableOpacity>
            <View style={style.button}>
                <Text style={{fontFamily:"bold"}}>Get started!</Text>
            </View>
            </TouchableOpacity>
            
        </View></>)
}  

const style = StyleSheet.create({
    title:{
        fontFamily:"bold",
        color:whiteColor,
        fontSize:21,
        paddingVertical:21,
        paddingHorizontal:4
    },
    subTitle:{
        fontFamily:"medium",
        color:lightGrayColor,

        padding: 12,
    },
    button:{
        backgroundColor:yellowColor,
        paddingHorizontal:21,
        paddingVertical:12,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:21

    }
})

export default FinishRegComponet