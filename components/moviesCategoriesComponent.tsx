import React, { FC, useState } from "react"
import { View,Text,StyleSheet ,FlatList,Animated,TouchableOpacity } from "react-native"
import { darkGreyColor, pinkColor, whiteColor } from '../constants/Colors';
import { MoviesCategory } from "../models/movieModel";
export const  MoviesCategoriesListComponent:FC<{catList:MoviesCategory[]}>=({catList})=>{

    const [isActive, setIsActive] = useState(0)
    return(
        <FlatList style={{paddingVertical:10}}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            data={catList}
            renderItem={({item,index})=><CategoryComponent title={item.name} onPressed={function (): void {
                setIsActive(index)
            } } isActive={index === isActive?1:0}/>}
        />
    )
}

const CategoryComponent:FC<{title:string,onPressed:()=>void,isActive:number}>=({isActive,title,onPressed})=>{
    return(
        <TouchableOpacity onPress={()=>onPressed()} style={[style.mainContainer,isActive ===1 ? {backgroundColor:pinkColor} :{backgroundColor: darkGreyColor}]}>
             <View>
                 <Text style={style.text}>{title}</Text>
             </View>
        </TouchableOpacity>
       
    )
}

const style = StyleSheet.create({
    mainContainer:{
        borderRadius:23,
        paddingHorizontal:20,
        paddingVertical:10
        
        ,marginLeft:10
    },
    text:{
        color:whiteColor,
        fontFamily:'lato-regular'
    }
})