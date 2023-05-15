import { View,Text, FlatList } from "react-native"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import axiosInstance from "../../../instance"
import IntroSelectMovies from "../../components/intro_select_movies"
import {  darkYellowColor, lightGrayColor, lightSubbackground, lightbackground, subBackGround, whiteColor, yellowColor } from "../../../constants"
import StepperNavButton from "../../components/stepper/stepper_nav_button"
import { TouchableOpacity } from "react-native-gesture-handler"
import ThemeContext from "../../../context/theme_context"
import { subTextLightColorStyle, textLightColorStyle } from "../global_styles"

const SetFavoriteMoviesComponent:React.FC = ()=>{
    const [movies,setMovies] = useState([])
    const [selectedMovies,setSelectedMovies] = useState(new Set([]))
    const {themeData} = useContext(ThemeContext)
    const getMoviesData = useCallback( async ()=>{
        
        await axiosInstance.get('/getIntroSelectMovies').then(data=>{
            setMovies(data.data.data)
        }).catch(err=>{console.log(err);})
    },[])

    function selectedMoviesHandler(movieData){
        let newSelectedMovies = selectedMovies;

        if (!newSelectedMovies.has(movieData) && newSelectedMovies.size < 4){
            newSelectedMovies.add(movieData)
            setSelectedMovies(()=>new Set(newSelectedMovies))
        }   
    }

    function removeSelectedMoviesHandler(movieData){
        let newSelectedMovies = selectedMovies;
        if(newSelectedMovies.has(movieData)){
            newSelectedMovies.delete(movieData)
            setSelectedMovies(()=>new Set(newSelectedMovies))

        }
    }
    useEffect(()=>{
     getMoviesData()
    },[])
    return(
            <View style={style.main}>
                <Text style={[style.title,themeData === "light"? textLightColorStyle:{}]}>Select your favorite movies</Text>
                <Text style={[style.subTitle,themeData === "light"? subTextLightColorStyle:{}]}>you need to select at least 4 movies</Text>
                   
                <View style={style.image_container}>
                    <FlatList 
                        contentContainerStyle={{justifyContent:"center",alignItems:"center"}}
                    scrollEnabled numColumns={2} data={movies} renderItem={(data)=><IntroSelectMovies onSelection={()=>{selectedMoviesHandler(data.item)}} title={data.item.title} key={data.index} poster_path={data.item.poster_path} selected={false}/>}/>
                </View>
                 {/* categories container */}
                 <View >
                        <Text style={[style.title,themeData === "light"? textLightColorStyle:{}]}>You love</Text>
                        <View style={style.selectedMoviesContainer}>
                        {[...selectedMovies].map((data:any,index)=> <TouchableOpacity key={index} onPress={()=>{removeSelectedMoviesHandler(data)}} style={{borderRadius:21}}><Text style={[style.category,themeData === "light"?{backgroundColor:lightbackground,color:darkYellowColor}:{}]} >{data.category}</Text></TouchableOpacity>)}

                        </View>

                     </View>
                <View style={{height:"15%"}}>
                  <StepperNavButton screensNumber={4} navToNextPage={true} isMiddle={true} onNext={function (): void {
                    
                } } />

                  </View>
            </View>
        )
}
const style = StyleSheet.create({
    main:{
        flex:1
    },
    title:{
        fontFamily:"bold",
        fontSize:21,
        padding:3,
        color:whiteColor
    },
    subTitle:{
        fontFamily:"normal",
        color:lightGrayColor,
        padding:2
    },
    image_container:{
        flexWrap:"wrap",
        flexDirection:"row",
        flex:1,
        width:"90%",
        height:"80%",
        justifyContent:"center",
        alignItems:"center"
    },selectedMoviesContainer:{
        flexDirection:"row",
        flexWrap:"wrap"
    },
    category:{
        margin:3,
        paddingVertical:5,
        paddingHorizontal:8,
        justifyContent:"center",
        borderRadius:21,
        backgroundColor:subBackGround,
        color:yellowColor
    }
})

export default React.memo(SetFavoriteMoviesComponent)