import { FC, useState } from "react"
import { View, Image, Text, StyleSheet, TouchableOpacity, FlatList,Animated } from "react-native"
import { lightGreyColor, separatorColor, whiteColor } from "../constants/Colors"
import { Icon, } from '@rneui/themed';
import { darkGreyColor } from './../constants/Colors';
import { optionObj } from "../globalTypes";
import { ShareComponent } from "./shareComponent";

const optionslist:optionObj[] = [{title:"Add to Favorite",iconName:"heart",onPress:()=>{}},{title:"Share with friends",iconName:"share-alt",onPress:()=>{
    ShareComponent()
}},] 
export const SmallMovieComponent: FC<{ title: string }> = ({ title }) => {
    return (<View style={style.mainContainer}>
        <View style={{ width: "25%" }}>
            <Image style={{ width: "100%", height: "90%", borderRadius: 10 }} resizeMode="contain" source={require('../assets/images/icon.png')} />

        </View>

        <View style={{ width: "60%", paddingHorizontal: 12 }}>

            <Text style={style.title}>The batman</Text>
            <Text style={style.subTitle}>TheBatman</Text>
            <Text style={style.subTitle}>TheBatman</Text>
        </View>

        <OptionsComponent optionsData={optionslist} />
    </View>)
}

export const OptionsComponent: FC<{optionsData:optionObj[]}> = ({optionsData}) => {
const [isOpend,setIsOpend]= useState<boolean>(false)
    


    return (
        <View>
            <TouchableOpacity onPress={()=>setIsOpend(!isOpend)}>
                <View ><Icon color={lightGreyColor} name="dots-three-horizontal" type="entypo" /></View>

            </TouchableOpacity>

          {isOpend ? <Animated.View style={style.optionsMenu}>
                <FlatList 
                
                    data={optionsData}
                    ItemSeparatorComponent ={()=><View style={{width:"100%",margin:5,height:1,borderRadius:1,backgroundColor:separatorColor}}></View>}
                    renderItem={(item)=><TouchableOpacity key={item.index} onPress={item.item.onPress}>
                        
                        <View style={{flexDirection:"row" ,alignItems: 'center',paddingVertical:3}}> 
                            <Icon size={15} color={lightGreyColor} name={item.item.iconName} type="font-awesome-5"/>
                            <Text style={{marginLeft:12 ,fontFamily:"lato-regular",color:lightGreyColor}}>{item.item.title}</Text>
                        </View>
                        </TouchableOpacity>}
                />
                
                
                    
                    
                    
                
                 </Animated.View>: null}  
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {

        height: 100,
        paddingHorizontal: 22,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",


    }, title: {
        color: whiteColor,
        fontSize: 18,
        fontFamily: "lato-bold",
        paddingBottom: 5
    }, subTitle: {
        color: lightGreyColor,
        paddingBottom: 3,
        fontFamily: "lato-regular",
    },
    optionsMenu:{
        position:'absolute',
        top: 10,
        left:-170,
        backgroundColor:darkGreyColor,
        width:160,
        padding:10,
        borderRadius:6

        
    }
})