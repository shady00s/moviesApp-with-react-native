import { Animated, Text } from "react-native"
import { View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

interface IerrorText{
    error:string,
    color:string,
    icon:any
}

 const ErrorTextComponent:React.FC<IerrorText> = (props)=>{
    const initAnimation = useRef(new Animated.Value(0)).current
   
   
    useEffect(()=>{
        Animated.timing(initAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
      },[])
    return( <>
    <Animated.View style={[style.main,{opacity:initAnimation}]}>
        <Ionicons size={17} name={props.icon} style={{color:props.color,padding:3}}/>
        <Text style={{color:props.color}}>{props.error}</Text>
        
    </Animated.View>
    </>)
}

const style = StyleSheet.create({
    main:{
        padding:5,
        margin:3,
        width:"100%"
        ,flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center'
    }
})
export default ErrorTextComponent