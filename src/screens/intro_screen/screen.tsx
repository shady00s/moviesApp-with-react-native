import React from "react"
import {View,StyleSheet,Text,Image, Button, TouchableOpacity} from "react-native"
import { backgroundColor, whiteColor, yellowColor } from "../../constants"
export default function IntroScreen(){
    return(<>
    <View style={style.mainContainer}>
        <View style={style.container}>
            <Image style={style.image} source={require("../../../assets/logo.png")}/>
            <Text style={style.text}>Your favorite movies are here.</Text>
        </View>
        <View style={style.containersButton}>
            <TouchableOpacity style={style.login}>
                <Text style={style.buttonText}>Login</Text>
            </TouchableOpacity>
           <View style={style.registerContainer}>
            <Text style={style.regText}>Don't have account?</Text>
            <TouchableOpacity >
                <Text style={style.regButton} >Register</Text>

            </TouchableOpacity>
           </View>
        </View>
    </View>
    </>)
}

const style = StyleSheet.create({
    mainContainer:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:backgroundColor
    },
    text:{
        padding:30,
        color:whiteColor
    },
    buttonText:{
        fontWeight:"800",
        fontSize:19
    },
    container:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        width:"100%"
    },
    containersButton:{
        position:"absolute",
        top:"85%",
        width:"100%",
        padding: 15,
        justifyContent:"center",
        alignItems:"center",
    },
    image:{
        resizeMode:'contain',
        height:70,
        width:'80%'
    },login:{
        borderRadius:8,
        width:"80%",
        padding:9,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:yellowColor

    },registerContainer:{
        paddingTop:9,
        flexDirection:"row",
        width:"60%",
        justifyContent:"space-between"
    },
    regText:{
        color:whiteColor
    }
    ,regButton:{
        color:yellowColor
    }


})