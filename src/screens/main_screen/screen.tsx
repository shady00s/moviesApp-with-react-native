import React from "react";
import { Button, SafeAreaView, StyleSheet, View } from "react-native";
import { backgroundColor } from "../../constants";
import SearchComponent from "../search_screen/components/search_component";
import HeaderComponent from "../components/header_component";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function MainScreen(){
    return(<>
    <SafeAreaView>
        <View style={style.main}>
            <HeaderComponent/>
            <SearchComponent/>
            <Button onPress={()=>{
                AsyncStorage.clear()
            }} title="delete cache"/>
        </View>

    </SafeAreaView>
    </>)
}

const style = StyleSheet.create({
    main:{
        backgroundColor:backgroundColor,
        height:"100%",
        width:"100%"      
    }
})