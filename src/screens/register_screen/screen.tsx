import React from "react";
import { View,StyleSheet, Text, SafeAreaView } from "react-native";
import { backgroundColor, whiteColor } from '../../constants';
import Stepper from "../components/stepper_component";
import user_information_component from "./components/user_information_component";
import set_favorite_movies from "./components/set_favorite_movies";
export default function RegisterScreen(){

    return(
        <SafeAreaView>
            <View style={style.container}>
                
                    <Text style={style.text}>Create new account</Text>
                    <Stepper screens={[
                    {title:"User Information",screen:user_information_component},{title:"What movies you Prefer",screen:set_favorite_movies}
                    ]}  indexColor={""}/>
                
            </View>

        </SafeAreaView>
    )
}



const style = StyleSheet.create({
    container:{
        backgroundColor:backgroundColor,
        width:"100%",
        height:"100%"
    },
    text:{
        color:whiteColor,
        fontFamily:"bold",
        fontSize:21,
        fontWeight:"800"
    }

})