import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, FlatList } from "react-native";
import { AppBar } from "../components/appBarComponent";
import { blackColor, lightGreyColor, whiteColor } from "../constants/Colors";
import { FC, useEffect } from 'react';
import { darkGreyColor, pinkColor } from './../constants/Colors';
import { Icon } from "@rneui/base";
import { TitleComponent } from "../components/titleComponent";
import YoutubeIframe from "react-native-youtube-iframe";
import { useState } from 'react';
import  MoviesListComponent  from "../components/moviesListComponent";
import {  useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {  useTypedSelector} from "../redux/store";
import { movieDetailsThunk } from './../redux/thunk/movieDetailsThunk';
import { movieDetailsStatus } from "../redux/slices/movieDetailsSlice";
import { bigImageURL, imageURL } from './../constats';
import { geners, MovieModel,  SingleMovieModel, Trailer } from "../models/movieModel";
import { Casting } from './../models/movieModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get("screen")
export function MovieDetailsScreen() {


const [movieDetails,setMovieDetails] = useState<SingleMovieModel |null>(null)
const [similarMovies,setSimilarMovies] = useState<MovieModel[] >([])



    const dispatch = useDispatch<any>()
  
    const route = useRoute<any>()
    const movieID:number = route.params.movieID

    const state = useTypedSelector(movieDetailsStatus);

    useEffect(()=>
    {
        dispatch(movieDetailsThunk(movieID))},[ ])

    useEffect(()=>{

        setMovieDetails(()=>state.movieDetails)
        setSimilarMovies(()=>state.similarMovies)
       
    },[state.status])
    

    // async function saveToLocalStorage(){
    //     try {
    //         await AsyncStorage.setItem("prevMovieID",movieID.toString())
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    console.log(movieDetails)

  
    
  
    return (
        <>
                {  state.status === "loading" && movieDetails !== null ? <View></View> :  <SafeAreaView style={{ flex: 1 }}>
        <View style={style.mainContainer}>
            <ScrollView>

                <View style={{ position: 'absolute', width: "100%" }}>
                    <AppBar title={""} iconName={""} path={""} secButton={false} isTransparent={true} />
                </View>
                <Image resizeMode="cover" style={style.image} source={{uri : bigImageURL+ movieDetails?.poster_path}} />

                <Text style={style.title}>{movieDetails?.title}</Text>
              {state.status === "succsses" ? <MovieCategory titles={movieDetails?.genres} /> : <View></View> }  
                <MovieOptionsButtonsList movieID={"asdasd"} />

                {state.status === "succsses" ? <TitleComponent title={"Trailers"} allButton={true} /> : <View></View> }

                <YoutubeVidList urlData={movieDetails?.trailers} />
                <TitleComponent title={"Audience Score"} allButton={false} />
                <AudinceContainer list={["ptTfQvbu9Ko", "h5qqI1-ZHwg", "QW-XHbEVmbk"]} />

                <TitleComponent title={"Top Cast"} allButton={false} />
                <TopCastList list={movieDetails?.casting }/>

                <TitleComponent title={"Related Movies"} allButton={false} />
                    <MoviesListComponent moviesList={similarMovies}/>
            </ScrollView>

        </View>
    </SafeAreaView>}
        
        </>

       


    )
}



const MovieCategory: FC<{ titles: geners[] | undefined}> = ({ titles }) => {
    return (
        <View style={{ padding: 10, flexWrap: 'wrap', flexDirection: "row" }}>
            {titles?.map((e) => <Text key={e.id} style={{ borderRadius: 20, marginVertical: 5, marginHorizontal: 10, color: whiteColor, backgroundColor: darkGreyColor, fontFamily: 'lato-regular', paddingVertical: 10, paddingHorizontal: 24 }}>{e.name}</Text>)}
        </View>


    )
}
const MovieOptionsButtonsList: FC<{ movieID: string }> = ({ movieID }) => {
    return (
        <View style={{ flexDirection: "row", width: Dimensions.get("screen").width }}>
            <Icon color={lightGreyColor} style={{ margin: 5, width: width * 0.12, height: height * 0.055, borderRadius: 100, borderColor: lightGreyColor, borderWidth: 1, justifyContent: "center", alignItems: "center" }} name={"save"} />
            <Icon color={lightGreyColor} style={{ margin: 5, width: width * 0.12, height: height * 0.055, borderRadius: 100, borderColor: lightGreyColor, borderWidth: 1, justifyContent: "center", alignItems: "center" }} name={"save"} />
            <Icon color={lightGreyColor} style={{ margin: 5, width: width * 0.12, height: height * 0.055, borderRadius: 100, borderColor: lightGreyColor, borderWidth: 1, justifyContent: "center", alignItems: "center" }} name={"save"} />


            <TouchableOpacity>
                <View style={{ margin: 5, justifyContent: "center", flexDirection: "row", width: width * 0.5, height: height * 0.055, borderRadius: 100, backgroundColor: pinkColor, alignItems: "center" }}>
                    <Icon color={whiteColor} name={"save"} />
                    <Text style={{ color: whiteColor, fontFamily: 'lato-bold', marginLeft: 5 }} >watch now</Text>
                </View>

            </TouchableOpacity>


        </View>
    )
}

const YoutubeVidList: FC<{ urlData: Trailer[] | undefined}> = ({ urlData }) => {
    return (
        <View>
            <FlatList
                contentContainerStyle={{ margin: 16 }}
                horizontal
                scrollEnabled
                pagingEnabled
                data={urlData}
                renderItem={(item) => <YoutubeVidContainer key={item.index} id={item.item.key} />
                }
            />
        </View>
    )

}

const YoutubeVidContainer: FC<{ id: string }> = ({ id }) => {
    const [playable, setPlayable] = useState<boolean>(false)

    return (
        <View style={{ padding: 5, position: "relative" }}><YoutubeIframe
            play={playable}
            height={200} width={width - 20} videoId={id} />
            <View style={{ position: "absolute", justifyContent: "center", alignItems: "center", backgroundColor: !playable ? "rgba(0,0,0,0.5)" : "transparent", left: 5, top: 5, zIndex: 1, width: "100%", height: "100%" }}>
                <Icon color={!playable ? lightGreyColor : "transparent"} onPress={() => { setPlayable(!playable) }} size={80} name="play" type="antdesign" />

            </View>
        </View>

    )
}


const AudinceContainer: FC<{ list: string[] }> = ({ list }) => {
    return (

        <FlatList
            data={list}
            horizontal renderItem={(item) => <View style={{ paddingHorizontal: 21, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ color: whiteColor, fontFamily: "lato-bold", fontSize: 18, }}>
                    54
                </Text>

                <View style={{ paddingLeft: 15 }}>
                    <Text style={{ color: whiteColor, fontFamily: "lato-regular" }}>
                        iMDb Rating
                    </Text>
                    <Text style={{ paddingTop: 5, color: lightGreyColor, fontFamily: "lato-regular" }}>
                        2321 votes
                    </Text>
                </View>
            </View>} />


    )
}

const TopCastList:FC<{list:  Casting[] | undefined }>=({list})=>{
    const state = useTypedSelector(movieDetailsStatus);
        let testList = list === undefined ? [] : list
    return(
        <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                contentContainerStyle={{flexWrap:"wrap",flexDirection:"row"}}
                
                >
        <FlatList
        scrollEnabled
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        numColumns={ 5 }
  
        data={list}
 
            renderItem={(item)=>
            
                
                     <View >
                
                <TopCastContainer cast={item.item}/>
               
                
                </View>
               
                }
               
           
        />
         </ScrollView>
    )
}

const TopCastContainer:FC<{cast:Casting}> = ({cast}) => {
    return (
       
        <View style={{width, margin:5,height:60,alignItems:'center',flexDirection:"row"}}>
            <Image resizeMode="contain" style={{ width: "20%", height: "100%", borderRadius: 21 }}
             source={{uri:imageURL+ cast.profile_path}} />

            <View style={{ paddingLeft: 15 }}>
                <Text style={{ color: whiteColor, fontFamily: "lato-regular" }}>
                    {cast.original_name}
                </Text>
                <Text style={{ paddingTop: 5, color: lightGreyColor, fontFamily: "lato-regular" }}>
                {"as "+cast.original_name}
                </Text>
            </View>
        </View>
      
   
       
        
    )
}
const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: blackColor,


    }, image: {
        zIndex: -1,

        top: 60,
        width: "100%",
        height: Dimensions.get('screen').height * 0.7
    }, title: {
        padding: 20,
        fontFamily: "lato-bold",
        fontSize: 21,
        color: whiteColor,
        marginTop: 65
    }
})