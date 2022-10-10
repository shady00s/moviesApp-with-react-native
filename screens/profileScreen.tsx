import React, { useRef } from "react";
import {useState } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView,  NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { AppBar } from "../components/appBarComponent";
import { PersonalDataComponent } from "../components/profileComponents/personalDataComponent";
import { PurchasesDataComponent } from "../components/profileComponents/purchasesComponent";
import { SettingsDataComponent } from "../components/profileComponents/settingsComponent";
import { blackColor, whiteColor } from "../constants/Colors";
import { CategoriesContainer } from './../components/categoriesContainer';


let index:number = 0;

export function ProfileScreen() {
    const [index,setIndex] = useState<number>(0)
    const settingRef = useRef(null)
    let x = 0;

    //ref={ (settingRef)=> settingRef?.scrollTo({animated:true,x:0,y:2}) }

   
    return (
        <View style={style.mainContianer}>
            <AppBar title={""} iconName={""} path={""} secButton={false} isTransparent={false}/>
            <Text style={style.title}>Profile</Text>
            <View style={{ height: 80, padding: 3 }}>
                
                <CategoriesContainer catName={["Personal data", "My purchases", "Settings"]} index={index} />

              

            </View>

            <ScrollView>
               
                <ScrollView
                
                onScroll={(event:NativeSyntheticEvent<NativeScrollEvent>)=> {
                     x = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get("screen").width)
                    setIndex(x)
                    
                  }}
                    pagingEnabled
                    horizontal>
                        
                    <PersonalDataComponent />
                    <SettingsDataComponent />
                    <PurchasesDataComponent />
                </ScrollView>
                
                
              
            </ScrollView>






        </View>
    )
}

const style = StyleSheet.create({
    mainContianer: {
        backgroundColor: blackColor,
        flex: 1,


    }, title: {
        left: "40%",
        fontFamily: "lato-bold",
        fontSize: 21,
        color: whiteColor,
        paddingTop: Dimensions.get("screen").height * 0.05,
        paddingBottom: 20,
    }
})