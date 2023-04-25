import { View, Text, StyleSheet, Modal, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Dimensions, Platform } from "react-native"
import React, { useState } from "react"
import { backgroundColor, subBackGround, whiteColor, yellowColor } from "../../../constants"
import InputTextComponent from "../../components/input_text_component"
import { useNavigation } from "@react-navigation/native"
import { SelectImageComponent } from "./select_image_component"
import PasswordCheckerComponent from "../../components/password_checker_component"
import { KeyboardAvoidingView } from "react-native"
const height = Dimensions.get("screen").height
const UserIformationComponent: React.FC = () => {
    const navigation = useNavigation<any>()
    const [password,setPassword] = useState('')
    return (
        <View style={{flex:1}}>
            <View style={style.titleContainer}>
                    <Text style={style.introText}>Complete your profile</Text>
                    <Text style={style.introSubtext}>Add image for you, your name and set password for your profile.</Text>
            </View>
                <ScrollView contentContainerStyle={{flexGrow:0.7}}>
                {/* image picker */}
                <SelectImageComponent/>
            <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}>
                    

                    <InputTextComponent onChange={(data)=>{}} placeholder="Name" />
                    <InputTextComponent onChange={(data)=>{}} placeholder="Email" />
                    <InputTextComponent onChange={(data)=>{setPassword(data)}} placeholder="Password" />
                    <PasswordCheckerComponent password={password}/>
                    <InputTextComponent onChange={(data)=>{}} placeholder="Confirm password" />
                   
                    <View>
                    <View style={style.registerContainer}>
                        <Text style={style.regText}>Already have account?</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("login")

                        }}>
                            <Text style={style.regButton} >Login</Text>

                        </TouchableOpacity>
                    </View>

                </View> 
                    </KeyboardAvoidingView>

                    <View>
        
                    <TouchableOpacity>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>

                </ScrollView>


        </View>

    )
}

export default React.memo(UserIformationComponent)

const style = StyleSheet.create({
    titleContainer:{
        marginTop:"20%"
    },
   

    text: {
        fontFamily: 'bold',
        fontSize: 31,
        color: whiteColor,

    }, registerContainer: {
        paddingTop: 9,
        flexDirection: "row",
        width: "55%",
        
        justifyContent: "space-between"
    },
    regText: {
        paddingRight: 4,
        color: whiteColor,
        fontFamily: "medium"
    }
    , regButton: {
        fontFamily: "bold",
        color: yellowColor
    },
   
    introText:{
        color:whiteColor,
        fontFamily:"bold",
        fontSize:19
    },
    introSubtext:{
        fontFamily:'normal',
        color:"rgba(162,162,162,0.6)",
        padding:12
    }
})