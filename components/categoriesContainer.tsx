import React, { FC, useState, useEffect } from "react";

import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import { whiteColor } from "../constants/Colors";
import { pinkColor } from '../constants/Colors';


export function CategoriesContainer() {

    const catName: string[] = ["Movies", "Series", "Cartoon"]

    const [isActive, setIsActive] = useState(0)

    return (

        <View style={{ backgroundColor: "transparent" ,paddingBottom:30}}>

            <FlatList
                keyExtractor={()=>(Math.random()*100).toString()}
                horizontal
                data={catName}
                renderItem={(item) => <CategoryButton testFunc={() => {
                    setIsActive(item.index)


                }} title={item.item} index={item.index === isActive ? 1 : 0} />}

            />


        </View>);
}


const CategoryButton: FC<{ testFunc: () => void, title: string, index: number }> = ({ title, index, testFunc }) => {



    return (
        <TouchableOpacity
            key={index}
            onPress={(item) => {
                testFunc()
            }}>
            <View style={style.container}>
                <Text style={style.title}>{title}</Text>

                <View style={index === 1 ? style.indexContainer : { backgroundColor: 'transparent' }}></View>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    title: {
        color: whiteColor,
        paddingVertical: 12,
        paddingHorizontal: 20,
        fontSize: 20, fontFamily: "lato-regular"

    }, container: {
        width: Dimensions.get("screen").width * 0.33,
        alignItems: "center",
    },

    indexContainer: {
        width: 80,
        height: 2,

        backgroundColor: pinkColor
    }
})