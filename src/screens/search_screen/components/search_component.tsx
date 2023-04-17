import React, { useContext, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, NativeSyntheticEvent, TextInputChangeEventData, TextInputProps } from 'react-native';
import { subBackGround, whiteColor, yellowColor } from "../../../constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export default function SearchComponent() {
        const [text, setText] = useState("")

    const navigation = useNavigation<any>()
    return (
        <>
            <View style={style.container}>
                <TextInput value={text} onChangeText={(event) => {
                
                    setText(() => event)
                }} placeholderTextColor={whiteColor} placeholder="Search.." style={style.input} />
                {text !== "" ? <TouchableOpacity onPress={()=>{
                        const data={targetedName:text}

                    navigation.navigate("search",data)
                    setText("")
                }}>
                    <Text style={style.text}>Search</Text>
                </TouchableOpacity> : null}
            </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft:5,
        marginRight:5,
        borderRadius: 32,
        backgroundColor: subBackGround,
        flexDirection: "row",
        alignItems: "center",

    },
    input: {
        width: "80%",
        padding: 10,

        color: whiteColor
    },
    text:{
        color:yellowColor
    }
})