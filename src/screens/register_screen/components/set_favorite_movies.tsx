import { View,Text, FlatList ,Animated, Dimensions} from "react-native"
import React, { useCallback, useContext, useEffect, useRef, useState } from "react"
import { StyleSheet } from "react-native"
import axiosInstance from "../../../instance"
import IntroSelectMovies from "../../components/intro_select_movies"
import {  darkYellowColor, lightGrayColor, lightSubbackground, lightbackground, subBackGround, whiteColor, yellowColor } from "../../../constants"
import StepperNavButton from "../../components/stepper/stepper_nav_button"
import { TouchableOpacity } from "react-native-gesture-handler"
import ThemeContext from "../../../context/theme_context"
import { subTextLightColorStyle, textLightColorStyle } from "../global_styles"
import ErrorTextComponent from "../../components/error_text_component"

const SetFavoriteMoviesComponent:React.FC = ()=>{
    const [movies,setMovies] = useState([])
    const [selectedMovies,setSelectedMovies] = useState(new Set([]))
    const [navToNextScreen,setNavToNextScreen] = useState(false)
    const {themeData} = useContext(ThemeContext)
    const heightAnimation = useRef(new Animated.Value(0)).current
    const errorheightAnimation = useRef(new Animated.Value(0)).current
    const getMoviesData = useCallback( async ()=>{
        await axiosInstance.get('/getIntroSelectMovies',{params:{region:"EG",language:"eg-US"}}).then(data=>{
            setMovies(data.data.data)
        }).catch(err=>{console.log(err);})
    },[])

    useEffect(()=>{
        Animated.timing(heightAnimation,{
            useNativeDriver:false,
            duration:120,
            toValue:selectedMovies.size ==0? Dimensions.get("screen").height * 0.04: Dimensions.get("screen").height * 0.12,

        }).start()

        if(selectedMovies.size === 4){
            Animated.timing(errorheightAnimation,{
                useNativeDriver:false,
                toValue:0,
                duration:120
            }).start(()=>{
                setNavToNextScreen(true)
            })
        }
    },[selectedMovies])
    function selectedMoviesHandler(movieData){
        let newSelectedMovies = selectedMovies;

        if (!newSelectedMovies.has(movieData) && newSelectedMovies.size < 4){
            newSelectedMovies.add(movieData)
            setSelectedMovies(()=>new Set(newSelectedMovies))
        }   
    }

    function removeSelectedMoviesHandler(movieData){
        let newSelectedMovies = selectedMovies;
        if(newSelectedMovies.has(movieData) || newSelectedMovies.has(movieData.category)){
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
                 <Animated.View style={{height:heightAnimation}}>
                        <Text style={[style.title,themeData === "light"? textLightColorStyle:{}]}>You love</Text>
                        <View style={style.selectedMoviesContainer}>
                        {Array.from(selectedMovies).map((data:any,index)=> <TouchableOpacity key={index} onPress={()=>{removeSelectedMoviesHandler(data)}} style={{borderRadius:21}}><View><Text style={[style.category,themeData === "light"?{backgroundColor:lightbackground,color:darkYellowColor}:{}]} >{data.category}</Text></View></TouchableOpacity>)}

                        </View>

                     </Animated.View>
                     <Animated.View style={{
          height:
          errorheightAnimation 
        }}>
          <ErrorTextComponent error="Please select 4 movies" color="red" icon={"close-outline"} />
        </Animated.View>
                <View style={{height:"15%"}}>
                  <StepperNavButton screensNumber={4} navToNextPage={navToNextScreen} isMiddle={true} onNext={function (): void {

                        if(selectedMovies.size < 4){
                            Animated.timing(errorheightAnimation,{
                                useNativeDriver:false,
                                toValue:54,
                                duration:120
                            }).start()
                        }
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
        alignItems:"center",
        borderRadius:21,
        backgroundColor:subBackGround,
        color:yellowColor
    }
})

export default React.memo(SetFavoriteMoviesComponent)