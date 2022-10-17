import React, { FC, useState, useEffect } from "react";

import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import { whiteColor } from "../constants/Colors";
import { pinkColor } from '../constants/Colors';


export const CategoriesContainer:FC<{catName:string[],index:number|null,onPress:()=>void}>=({catName,index,onPress})=> {


    const [isActive, setIsActive] = useState(0)
   

    useEffect(()=> setIsActive(index === null? 0 : index),[index]);
    return (

        
        <View style={{ backgroundColor: "transparent" }}>

            <FlatList
                keyExtractor={()=>(Math.random()*100).toString()}
                horizontal
                centerContent
                data={catName}
                renderItem={(item) => <CategoryButton testFunc={() => {

                        onPress()

                    setIsActive(item.index);


                } } title={item.item} index={item.index === isActive ? 1 : 0} currentIndex={item.index} />}

            />
                
           

        </View>);
}


const CategoryButton: FC<{ testFunc: () => void, title: string, index: number,currentIndex:number }> = ({currentIndex, title, index, testFunc }) => {

    const [current,setCurrent]=useState<number>(currentIndex)
   
    return (
       
             <TouchableOpacity
            style={style.container}
            key={index}
            onPress={(item) => {
                testFunc()
                setCurrent(currentIndex)
                
            }}>
            <View style={{width:"100%",justifyContent:"center",alignItems:"center" }}>
                <Text style={style.title}>{title}</Text>

                <View style={index === 1 ? style.indexContainer : { backgroundColor: 'transparent' }}></View>
            </View>
        </TouchableOpacity>
       
    )
}

const style = StyleSheet.create({
    title: {
       
        color: whiteColor,
        paddingVertical: 8,
        paddingHorizontal: 18,
        fontSize: 18, fontFamily: "lato-regular"

    }, container: {
        height:100,
        justifyContent:"space-evenly",
        paddingBottom:30,
       
        alignItems: "center",
    },

    indexContainer: {
        width: "86%",
        margin:"auto",
        height: 2,

        backgroundColor: pinkColor
    }
})