import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { subBackGround, whiteColor } from "../../constants";
import Ionicons from '@expo/vector-icons/Ionicons';
    interface IinputText{
        placeholder:string,
        onChange:(data:string)=>void
    }

 const InputTextComponent:React.FC<IinputText> = (props)=> {
    return (<>
        <View style={style.mainContainer}>
            <Ionicons style={{ color: whiteColor, padding: 4, marginRight: 8 }} name={'pencil-outline'} />
            <TextInput onChangeText={props.onChange} style={style.textInput } placeholderTextColor={whiteColor} placeholder={props.placeholder} />

        </View>
    </>)
}
const style = StyleSheet.create({
    mainContainer: { flexDirection: "row", alignItems: "center", width: "90%", padding: 10, borderRadius: 12, backgroundColor: subBackGround },
    textInput:{
        width:"100%",
        color:whiteColor,
    }
})

export default InputTextComponent