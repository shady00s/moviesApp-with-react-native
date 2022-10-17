import React, { FC }  from 'react';

import {View,Text,FlatList,StyleSheet,Dimensions,ImageBackground,TouchableOpacity} from 'react-native';

import { Icon } from '@rneui/themed';
import { whiteColor } from '../constants/Colors';
import { darkGreyColor, lightGreyColor } from './../constants/Colors';
import { MovieModel } from './../models/movieModel';
import { useNavigation } from '@react-navigation/native';
const test = ["sda","dsa,","DSADASD","sda","dsa,","DSADASD","sda","dsa,","DSADASD"]
export const MoviesListComponent:FC<{moviesList:MovieModel[]}> = ({moviesList})=>{
    return(
        <View  style={{height:420}}>
            <FlatList
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
                data={moviesList}
                renderItem={({item,index}:{item:MovieModel,index:number})=><MovieContainer key={index} title={item.title} subTitle={item.release_date} rating={item.vote_average} id={item.id} imagePath={item.poster_path}/>}
            />
        </View>
    )
} 

const MovieContainer:FC<{title:string,subTitle:string,rating:number,id:number,imagePath:string}>=({title,subTitle,rating,id,imagePath})=>{
    const navigator = useNavigation<any>()
    
    
    return(
    <TouchableOpacity style={style.mainContainer} onPress={()=> navigator.push('movieScreen',{movieID:id})}>
            <ImageBackground style={{width:"95%",height:"90%",}} imageStyle={{borderRadius:15}} resizeMode='contain' source={{uri:`https://image.tmdb.org/t/p/w500${imagePath}`}}>
                
                <View style={style.IconCotainer}>
                    <Icon size={10} name='star-fill'type='octicon' color={whiteColor} />
                    <Text style={{paddingHorizontal:5,color:whiteColor}}>{rating}</Text>
                    </View>
                
                    
                
            </ImageBackground>
                <View style={{marginTop:-12,marginLeft:5,justifyContent:"space-between"}}>
                    <Text style={style.title}>{title}</Text>
                    <Text style={style.subTitle} >{ " release date  "+subTitle }</Text>
                </View>
    </TouchableOpacity>)
}

const style = StyleSheet.create({
    mainContainer:{
        margin:10,
        height:Dimensions.get("screen").height*0.35,
        width:Dimensions.get("screen").width*0.5,
    },
    IconCotainer:{
        
        flexDirection:"row",
        paddingHorizontal:8,
        alignItems:"center",
        justifyContent:"space-between",
        position:"absolute",
        top:10,
        left:10,
        backgroundColor:darkGreyColor,
        borderRadius:10,
    },title:{
        paddingBottom:10,
        color:whiteColor,
        fontFamily:'lato-bold',
        fontSize:17
    },
    subTitle:{

        paddingTop:3,
        color:lightGreyColor,
        fontFamily:'lato-regular',
       
    }
})