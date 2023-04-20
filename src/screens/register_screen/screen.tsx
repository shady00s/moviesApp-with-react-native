import React from "react";
import { View,StyleSheet, Text, SafeAreaView } from "react-native";
import { backgroundColor, whiteColor } from '../../constants';
import Stepper from "../components/stepper_component";

export default function RegisterScreen(){

    return(
        <SafeAreaView>
            <View style={style.container}>
                
                    <Text style={style.text}>Create new account</Text>
                    <Stepper screens={[
                    Test1,Test2,Test3,Test4,Test5,Test6
                    ]} titleList={[]} indexColor={""}/>
                
            </View>

        </SafeAreaView>
    )
}

const Test1: React.FC<any> =(props)=>{
    return(<>
        <View style={{flex:1,backgroundColor:backgroundColor,justifyContent:"center",alignItems:'center'}}><Text style={{color:whiteColor}}>x1</Text></View>
    </>)
}
const Test2: React.FC<any> =(props)=>{
    return(<>
        <View style={{flex:1,backgroundColor:backgroundColor,justifyContent:"center",alignItems:'center'}}><Text style={{color:whiteColor}}>x1</Text></View>
    </>)
}
const Test3: React.FC<any> =(props)=>{
    return(<>
        <View style={{flex:1,backgroundColor:backgroundColor,justifyContent:"center",alignItems:'center'}}><Text style={{color:whiteColor}}>x1</Text></View>
    </>)
}
const Test4: React.FC<any> =(props)=>{
    return(<>
        <View style={{flex:1,backgroundColor:backgroundColor,justifyContent:"center",alignItems:'center'}}><Text style={{color:whiteColor}}>x1</Text></View>
    </>)
}
const Test5: React.FC<any> =(props)=>{
    return(<>
        <View style={{flex:1,backgroundColor:backgroundColor,justifyContent:"center",alignItems:'center'}}><Text style={{color:whiteColor}}>x1</Text></View>
    </>)
}
const Test6: React.FC<any> =(props)=>{
    return(<>
        <View style={{flex:1,backgroundColor:backgroundColor,justifyContent:"center",alignItems:'center'}}><Text style={{color:whiteColor}}>x1</Text></View>
    </>)
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