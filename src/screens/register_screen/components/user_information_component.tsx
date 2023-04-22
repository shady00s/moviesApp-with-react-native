import { View,Text,StyleSheet,TextInput, TouchableOpacity } from "react-native"
import React from "react"
import { backgroundColor, subBackGround, whiteColor, yellowColor } from "../../../constants"
import InputTextComponent from "../../components/input_text_component"
import { useNavigation } from "@react-navigation/native"
const UserIformationComponent:React.FC = ()=>{
    const navigation = useNavigation<any>()

    return(<>
            <View style={style.container}>
                <View style={style.inputContainer}>

                <InputTextComponent placeholder="Name"/>
                <InputTextComponent placeholder="Email"/>
                <InputTextComponent placeholder="Password"/>
                <InputTextComponent placeholder="Confirm password"/>


                </View>
                {/* login navigation button */}
                <View>
                        <View style={style.registerContainer}>
                    <Text style={style.regText}>Already have account?</Text>
                    <TouchableOpacity onPress={()=>{
                                        navigation.navigate("login")

                    }}>
                        <Text style={style.regButton} >Login</Text>

                    </TouchableOpacity>
                </View>

                </View>
                {/* touchable opacity */}
                
                <TouchableOpacity>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        </>)
}

export default React.memo(UserIformationComponent)

const style = StyleSheet.create({
    container:{
        flex:1,
        
        
    },
    inputContainer:{
        width:"95%",
        marginTop:"20%",
        height:"40%",
        justifyContent:"space-evenly"
    },
    text:{
        fontFamily:'bold',
        fontSize:31,
        color:whiteColor,

    },registerContainer:{
        paddingTop:9,
        flexDirection:"row",
        width:"55%",
        justifyContent:"space-between"
    },
    regText:{
        paddingRight:4,
        color:whiteColor,
        fontFamily:"medium"
    }
    ,regButton:{
        fontFamily:"bold",
        color:yellowColor
    }
})