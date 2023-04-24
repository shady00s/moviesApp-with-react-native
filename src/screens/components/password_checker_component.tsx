import { useEffect, useState } from "react"
import { View,StyleSheet,Text, Dimensions } from "react-native"
import { subBackGround } from "../../constants"
import React from "react"

interface Ipassword{
    password:string
}
interface Ierror{
    errorColor:string,
    errorIndex:number
}
const width = Dimensions.get('screen').width
const PasswordCheckerComponent:React.FC<Ipassword> = (props)=>{
    const [text,setText] = useState("weak")
    const [color,setColor] = useState("red")
    const [error,setError] = useState("")
    const [errorColor,setErrorColor] = useState<Ierror>()
    function checkPasswordLength():void{
        if(props.password.length < 8){
                    setText('weak')
            return setError("password must have at least 8 characters.")
       }
       setError("")
    }
    function checkPasswordHaveCapitalLetter(){
        const passwordHaveCapitalLetterRegex = /^(?=.*[A-Z])[A-Za-z]{8,}$/g
        console.log(passwordHaveCapitalLetterRegex.test(props.password));
        if(!passwordHaveCapitalLetterRegex.test(props.password)){
          return  setError("password must have capital letter")
        }
        setError('')
    }
    useEffect(()=>{
        checkPasswordLength();
        checkPasswordHaveCapitalLetter();
    },[props.password])
    return(
    
        <View style={[props.password ===""?{...style.hideContainer}:{...style.mainContainer}]}>
          <View style={style.indecatorContainer}>
            <View style={[props.password ===""?{...style.hideContainer}:{...style.checkerContainer}]}>
                <View style={style.containerInitStyle}></View>
                <View style={style.containerInitStyle}></View>
                <View style={style.containerInitStyle}></View>
                <View style={style.containerInitStyle}></View>
                <View style={style.containerInitStyle}></View>
            </View>
            <Text style={{color,fontFamily:"normal"}}>{text}</Text>

          </View>
          <Text style={style.errorText}>{error}</Text>
        </View>
    )
}
const style = StyleSheet.create({
    mainContainer:{
        width:"90%",
        flexDirection:"column",
        overflow:"hidden",
        alignItems:"center"
    },
    hideContainer:{
        display:"none",
        padding:0,
        margin:0,
        height:0,
        width:0
    },
    indecatorContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:'center'
    },
    containerInitStyle:{
        height:5,
        margin:1,
        padding:2,
        backgroundColor:'red',
        width:width * 0.12
    },

    checkerContainer:{
        width:"80%",
        height:"80%",
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    errorText:{
        color:"orange"
    }
})
export default React.memo(PasswordCheckerComponent)