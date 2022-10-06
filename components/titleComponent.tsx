import { Icon } from "@rneui/base";
import React, { FC } from "react"
import { View, StyleSheet,Text,TouchableOpacity} from "react-native"
import { pinkColor, whiteColor, lightGreyColor } from './../constants/Colors';

export const TitleComponent:FC<{title:string,allButton:boolean}> =({title,allButton})=>{
    
    return(
    <View style={style.mainContainer}>
        <View style={style.textContainer}>
            <View style={style.pinkContainer}></View>
            <Text style={style.titleStyle}>{title}</Text>
        </View>
        
         {allButton?<TouchableOpacity style={{flexDirection:'row',alignContent:'center' }}>
                    <Text style={style.allText}>All</Text>
                    <Icon color={lightGreyColor} type="Entypo" name="chevron-right"/>
            </TouchableOpacity>:null}   
    </View>)
}

const style = StyleSheet.create({
    mainContainer:{
        paddingVertical:20,
        width:"100%",
        height:70,
        flexDirection:"row",
        paddingHorizontal:15,
        justifyContent:"space-between",
        alignItems:"center"
    },textContainer:{
        flexDirection:"row",
        alignItems:"center"
        
    },
    pinkContainer:{
        height:17,
        width:3,
        
        backgroundColor:pinkColor
    },
    titleStyle:{
        paddingLeft:10,
        fontFamily:'lato-bold',
        color:whiteColor,
        fontSize:17
    },
    allText:{
       
        paddingRight:10,
        color: lightGreyColor,
        fontFamily:"lato-regular",
        fontSize:16
    }
})