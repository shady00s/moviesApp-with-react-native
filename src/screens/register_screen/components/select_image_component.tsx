
import * as ImagePicker from 'expo-image-picker';
import React,{ useState } from 'react';
import { View ,Modal,Image,Text,TouchableOpacity,TouchableWithoutFeedback,StyleSheet} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { subBackGround, whiteColor } from '../../../constants';

export const SelectImageComponent:React.FC =()=>{
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
    return(<>
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
    </>)
}

const style = StyleSheet.create({
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 9999,
        margin:5
    },
    imagePicker: {
        flex:0.3,
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
    },    regText: {
        paddingRight: 4,
        color: whiteColor,
        fontFamily: "medium"
    }
})