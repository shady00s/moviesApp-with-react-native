import React from "react";
import { View,StyleSheet, TextInput } from 'react-native';
import { whiteColor } from "../../constants";

export default function SearchComponent(){

    return(
        <>
            <View style={style.container}>
                <TextInput placeholderTextColor={whiteColor} placeholder="Search.." style={style.input}/>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    container:{
        marginTop:10,
        padding:20
    },
    input:{
        borderRadius:32,
        padding:10,
        backgroundColor:'#242529',
        color:whiteColor        
    }
})