import { Icon } from "@rneui/themed";
import { FC } from "react";
import { View,StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { blackColor, lightGreyColor } from "../constants/Colors";
import { useNavigation } from '@react-navigation/native';

export const AppBar:FC<{title:string,iconName:string,path:string ,secButton:boolean,isTransparent:boolean}> = ({secButton,title,iconName,path,isTransparent})=>{

    const navigator = useNavigation()
    return (
        <View style={ {...style.mainContainer ,backgroundColor: isTransparent? "rgba(0,0,0,0.2)": blackColor, }}>

            <TouchableOpacity style={style.button} onPress={()=>navigator.goBack()}>
                <Icon color={lightGreyColor} name="chevron-left" type="octicon"/>
            </TouchableOpacity>

          {secButton?<TouchableOpacity  style={style.button}>
                <Icon color={lightGreyColor} name="search" type="octicon"/>
            </TouchableOpacity>:null}  
        </View>
    )
    
}


const style = StyleSheet.create({
    mainContainer:{
       
       
        width:"100%",
        marginTop:60,
        height:70,
        paddingHorizontal:40,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },button:{
        borderWidth:1,
        paddingVertical:15,
        paddingHorizontal:24,
        borderColor:lightGreyColor,
        borderRadius:15
    }
})