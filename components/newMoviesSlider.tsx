import React from "react";
import { ImageBackground, TouchableOpacity, View,Text,StyleSheet,Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { blackColor, darkGreyColor, whiteColor } from "../constants/Colors";
import { lightGreyColor } from './../constants/Colors';
const List = ["DSAD","SD","DFDFASF"]
export function ListOfMovies(){
    return(<View>
        <FlatList
            horizontal
            scrollEnabled
            data={List}
            renderItem={()=><MoviesContainer/>}
        /> 
        <View style={style.indecatorContainer}>
                {List.map((e)=><View style={style.ballIndicator}></View>)}
                </View>
    </View>   )
}

function MoviesContainer(){
    
        return(
        <TouchableOpacity onPress={()=>{}}>
                <View style={style.mainContainer}>
                <ImageBackground imageStyle={{borderRadius:15}} style={{width:"100%",height:"100%",justifyContent:"flex-end", }} resizeMode="cover" source={require("../assets/images/icon.png")}>
                
                    <View style={style.textContainer}>
                        <Text style={style.title}>The batman</Text>
                        <Text style={style.subTitle}>The batman ddsasfasdfsadfsadfsdfsadfsafdsdsdfsafsdfdsafsadfsadfsafasfsafafsadfsadfasf</Text>
                    </View>
                </ImageBackground>
        </View>
        </TouchableOpacity>
    
    
        )
    
}

const style = StyleSheet.create({
    mainContainer:{
        padding:5,
        width:Dimensions.get('screen').width *0.81
        ,height:Dimensions.get('screen').height *0.35
    },
   
    textContainer:{
        backgroundColor:blackColor,
        height:"35%",
        justifyContent:"space-evenly",
        borderBottomLeftRadius:13.5,
        borderBottomRightRadius:13.5,
    },
    title:{
        paddingHorizontal:10,
        color:whiteColor,
        fontFamily:"lato-bold",
        fontWeight:"300",
        fontSize:19
    },
    subTitle:{
        width:"90%",
        height:"45%",
        paddingHorizontal:12,
        color:whiteColor,
        fontFamily:"lato-regular",
        overflow:"hidden"
    }
    
    ,ballIndicator:{
        width:10,
        height:10,
        borderRadius:10/2,
        backgroundColor:lightGreyColor,
        margin: 10,
    },
    indecatorContainer:{
        marginTop:15,
        flexDirection:"row",
        justifyContent:"center"
    }


})