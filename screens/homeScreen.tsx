import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, StyleSheet, FlatList, ScrollView, Dimensions } from "react-native";
import { ProfileHeader } from "../components/profileHeader";
import { CategoriesContainer } from "../components/categoriesContainer";
import { ListOfMovies } from "../components/newMoviesSlider";
import { TitleComponent } from "../components/titleComponent";
import { MoviesCategoriesListComponent } from "../components/moviesCategoriesComponent";
import { MoviesListComponent } from "../components/moviesListComponent";
import { useTypedSelector } from "../redux/store";
import { homePageStatus } from '../redux/slices/homePageSlice';
import { MovieModel } from './../models/movieModel';

import { homePageThunk } from '../redux/thunk/homePageThunk';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

const { width, height } = Dimensions.get("screen")
export function HomePage() {

    const dispatch = useDispatch<AppDispatch>()

    const status = useTypedSelector(homePageStatus);


    
    useEffect(() => {
        dispatch(homePageThunk())
    }, [])


    const [topRatedMoviesList, setTopRatedMoviesList] = useState<MovieModel[]>([])


    useEffect(() => {

        setTopRatedMoviesList(() => status.movieData.PopularMoviesList)


    }, [status.status])





    return (

        <View style={style.parent}>

            <ImageBackground style={style.image} resizeMode="stretch" source={require("../assets/images/group3.png")}>
                <View style={{ flex: 0.3 }}>
                    {/* Profile */}
                    <ProfileHeader userName={"shady"} />
                    {/* movies categories button Group */}

                    <View style={{ justifyContent: "center", alignItems: "center", height: 80 }}>
                        <CategoriesContainer catName={["Movies", "Series", "Cartoon"]} index={null} onPress={function (): void {
                            
                        } } />

                    </View>


                </View>
                <View style={{ flex: 0.7}}>
                    <ScrollView centerContent={true}>

                        {topRatedMoviesList.length === 0 ? <View></View> : <ListOfMovies key={Math.random()} listOfMovies={topRatedMoviesList} />}

                        <TitleComponent title={"Categories"} allButton={false} />
                        <MoviesCategoriesListComponent catList={status.movieData.MoviesCategory} />
                        <TitleComponent title={"Recommended for you"} allButton={true} />
                       
                            < MoviesListComponent moviesList={topRatedMoviesList} />
                        
                        
                        
                    </ScrollView>
                </View>





            </ImageBackground>
        </View>




    )
}

const style = StyleSheet.create({
    parent: {
        paddingTop: 20,
        height: "100%",
        flex: 0.9
    }, image: {
        position: "absolute",
        top: -20,
        left: -10,
        width: Dimensions.get("screen").width + 20,
        height: Dimensions.get("screen").height,

    }, navigatorStyle: {
        backgroundColor: "red"
    }

});

