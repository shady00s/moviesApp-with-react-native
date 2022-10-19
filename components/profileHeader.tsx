import React, { FC, memo } from "react";
import {Icon} from '@rneui/themed';
import { StyleSheet, View,Text, TouchableOpacity } from "react-native";

const ProfileHeader:FC<{userName:String}>  = ({userName})=>{
    return (
       
        <>
        
            <View style={style.mainContainer}>
                    <View style={style.textContainer}>
                        <Text style={style.mainTitle}>
                            Welcome back {userName}
                        </Text>
                        <Text style={style.subTitle}>
                            Let's stream your favorite movie.
                        </Text>
                    </View>
                    <TouchableOpacity style={style.IconContainer}>
                    <View style={style.iconContainer}>
                        <Icon  name='search'  color={'white'}/>
                    </View>
                    </TouchableOpacity>
                    
            </View>
        </>
        
    );
} 

const style = StyleSheet.create({
    mainContainer:{
        paddingTop:45,
        paddingHorizontal:35,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center'

    },
    textContainer:{
        flexDirection:"column"
    },
    IconContainer:{
        marginTop:"auto",
        width:45,
        height:45,
        borderRadius: 45/2
    },
    mainTitle:{
        color:'white',
        paddingVertical:15,
        fontFamily:"lato-regular",
        fontSize:18
       
    },subTitle:{
        fontFamily:"lato-regular",
        color:'grey',

    },
    iconContainer:{
       justifyContent:"center",
        width:45,
        height:45,
        borderRadius: 45/2,
        backgroundColor:"rgba(202, 196, 190,0.3)"
    }

})

export default memo(ProfileHeader)