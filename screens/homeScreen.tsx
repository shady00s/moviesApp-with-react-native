import React from "react";
import {ImageBackground, Text ,View,StyleSheet} from "react-native";
import { ProfileHeader } from "../components/profileHeader";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CategoriesContainer } from "../components/categoriesContainer";
import { MovieSlider } from "../components/movieSlider";
const TopTab = createMaterialTopTabNavigator();

export function HomePage(){
    return (
        <>
        <View style={style.parent}>
            <ImageBackground style={style.image} resizeMode="cover" source={require("../assets/images/group3.png")}>
            {/* Profile */}
            <ProfileHeader userName={"shady"}/>

             {/* movies categories button Group */}
            <View style={{flex:1 ,paddingTop:80}}>
            <CategoriesContainer/>

            <MovieSlider/>
            </View>
            
            </ImageBackground>
        </View>
       
        </>
        
        
    )
}

const style = StyleSheet.create({
    parent:{
        backgroundColor:"rgb(15,15,15)",
        width:"100%",
        height:"100%",
       flex:1
    },image:{
       
        flex:1
    },navigatorStyle:{
        backgroundColor:"red"
    }

});