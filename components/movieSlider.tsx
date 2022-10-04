import React from "react";

import {View,ImageBackground,StyleSheet, Dimensions,Text} from "react-native";


export function MovieSlider(){
    return <View style={style.mainContainer}>
            <ImageBackground imageStyle={{borderRadius:15}} style={{width:"100%",height:"100%",justifyContent:"flex-end", }} resizeMode="cover" source={require("../assets/images/icon.png")}>
            
                <View style={style.textContainer}>
                    <Text>The batman</Text>
                    <Text>The batman</Text>
                </View>
            </ImageBackground>
    </View>
}

const style = StyleSheet.create({
    mainContainer:{
        
        padding:4,
        width: Dimensions.get('screen').width * 0.8,
        height: Dimensions.get('screen').height * 0.3,
        borderRadius:30
    },
    textContainer:{
            padding:4,
            height:"30%",
            backgroundColor:"#121212",
            borderBottomLeftRadius:15,
            borderBottomRightRadius:15
    }
    

})