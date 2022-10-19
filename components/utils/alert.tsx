import { Button } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { darkGreyColor, whiteColor, lightGreyColor } from './../../constants/Colors';
import { StackActions, useNavigation } from '@react-navigation/native';

export const AlertComponent: FC<{ title: string, content: string, iconName: string }> = ({
    title, content, iconName
}) => {
    const navigator = useNavigation<any>()
    return (
        <>
            <View style={style.mainBackground}>
                <View style={style.alertContainer}>
                    <Icon style={{paddingVertical:10}} size={40} name={iconName} color={"green"} type="feather" />
                    <Text style={style.title}>{title}</Text>
                    <Text style={style.subTitle}>{content}</Text>

                    <Button onPress={()=>{
                        navigator.dispatch(   
                            StackActions.replace('mainPage'),
                            StackActions.push('mainPage')
                        );
                    }}>Okay</Button>
                </View>
            </View>
        </>

    )
}

const style = StyleSheet.create({
    mainBackground:{
        backgroundColor:"rgba(18,29,46,0.55)",
        position:"absolute",
        top:0,
        left:0,
        flex:1,
        height:"100%",
        width:"100%",
        alignItems:"center",
        justifyContent:"center"
    },
    alertContainer:{
        padding:15,
        backgroundColor:darkGreyColor,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        fontSize:21,
        color:whiteColor,
        fontFamily:"lato-bold",
        paddingVertical:5
    },
    subTitle:{
        color:lightGreyColor,
        fontFamily:"lato-regular",
        paddingVertical:10
    }
})