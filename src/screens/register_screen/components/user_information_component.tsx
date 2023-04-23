import { View, Text, StyleSheet, Modal, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import React, { useState } from "react"
import { backgroundColor, subBackGround, whiteColor, yellowColor } from "../../../constants"
import InputTextComponent from "../../components/input_text_component"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
const UserIformationComponent: React.FC = () => {
    const navigation = useNavigation<any>()
    const [image, setImage] = useState(null)
    const [openModel, setOpenModal] = useState(false)
    async function chooseImage() {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });
        if (!res.canceled) {
            setImage(res.assets[0].uri)
        }
    }

    async function takeNewImage() {
        let res = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!res.canceled) {
            setImage(res.assets[0].uri)
        }
    }
    return (<>
        <View style={style.container}>
            <View style={style.inputContainer}>
                {/* image picker */}
                <View style={style.imagePicker}>
                    {!image ? <Ionicons size={45} style={style.emptyImage} name="image-outline" /> : <Image style={style.profileImage} source={{ uri: image }} />
                    }
                      <TouchableOpacity onPress={()=>{setOpenModal(true)}}>
                                <Text style={style.regText}>{!image?"Add photo":"Change photo"}</Text>
                            </TouchableOpacity>
                    <Modal
                    visible={openModel}
                    onDismiss={()=>{
                        setOpenModal(false)
                    }}
                    onPointerCancel={()=>{
                        setOpenModal(false)
                    }} transparent={true} animationType="slide" style={style.modal}>
                       <View style={{flex:1}}>
                        <TouchableWithoutFeedback onPress={()=>{
                             setOpenModal(false)
                        }}>
                        <View style={{flex:1}}>

                        </View>

                        </TouchableWithoutFeedback>
                        <View style={style.modalOptions}>
                            <TouchableOpacity onPress={chooseImage}>
                                <Text style={style.imageButton}>Choose image</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={takeNewImage}>
                                <Text  style={style.imageButton}>Take a selfie</Text>
                            </TouchableOpacity>

                        </View>

                       </View>
                            
                      
                    </Modal>
                </View>

                <InputTextComponent placeholder="Name" />
                <InputTextComponent placeholder="Email" />
                <InputTextComponent placeholder="Password" />
                <InputTextComponent placeholder="Confirm password" />


            </View>
            {/* login navigation button */}
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
            {/* touchable opacity */}

            <TouchableOpacity>
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    </>)
}

export default React.memo(UserIformationComponent)

const style = StyleSheet.create({
    container: {
        flex: 1,


    },
    inputContainer: {
        width: "95%",
        marginTop: "20%",

        justifyContent: "space-evenly"
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
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 9999
    },
    imagePicker: {
        height: "30%",
        flexDirection: "row",
        alignItems: "center",

    },
    emptyImage: {
        width: 70,
        height: 70,
        color: subBackGround
    },
    modal: {
        height: 40
    },
    modalOptions:{
        position:"absolute",
        width:'100%',
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        height:"20%",
        bottom:0,
        backgroundColor:whiteColor,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    },
    imageButton:{
        padding:10,
        fontSize:16,
        fontFamily:"bold",
    }
})