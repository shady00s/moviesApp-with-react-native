import React, { FC, useState } from "react"
import { View,Text,StyleSheet ,FlatList,Animated,TouchableOpacity } from "react-native"
import { darkGreyColor, pinkColor, whiteColor } from '../constants/Colors';
export function MoviesCategoriesListComponent(){

    const [isActive, setIsActive] = useState(0)
    return(
        <FlatList style={{paddingVertical:10}}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            data={["ad","f","we","fdsfsa","Fds","d"]}
            renderItem={(item)=><CategoryComponent title={item.item} onPressed={function (): void {
                setIsActive(item.index)
            } } isActive={item.index === isActive?1:0}/>}
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