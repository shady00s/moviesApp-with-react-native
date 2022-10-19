import { FC, useEffect } from "react";
import { View,Text,StyleSheet } from "react-native";
import { blackColor, whiteColor } from "../constants/Colors";
import { lightGreyColor } from './../constants/Colors';
import { useDispatch } from 'react-redux';
import { AppDispatch, useTypedSelector} from "../redux/store";
import { introMoviesThunk } from './../redux/thunk/introMovieThunk';
import { IntroSelectMovieList } from "../components/introSelectMovieComponent";
import { introMoviesState } from "../redux/slices/introMovieSlice";

export const IntroSelectionMovieScreen : FC<{}> = ()=>{
    const state = useTypedSelector(introMoviesState)
    const  dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{

        dispatch(introMoviesThunk())
        
    },[])
    return(
        <>
        <View style={style.mainConainer}>
             <View style={{marginTop:90}}>
                <Text style={style.title}>Tell us what you're into.</Text>
                <Text style={style.subTitle}>Pick 5 movies you like .Your experience will improve the more you stream</Text>
             
             
             
             <IntroSelectMovieList moviesList={state.moviesList}/>
             </View>
        </View>
           
        </>
        
    )
}

const style = StyleSheet.create({
    mainConainer:{
        backgroundColor:blackColor,flex:1
    },
    title:{
        padding:10,
        color:whiteColor,
        fontFamily:"lato-bold",
        fontSize:18
    },
    subTitle:{
        fontFamily:"lato-bold",
        padding:10,
        color:lightGreyColor,
    }
})