import React from "react";
import {ImageBackground, Text ,View,StyleSheet,FlatList, ScrollView, Dimensions} from "react-native";
import { ProfileHeader } from "../components/profileHeader";
import { CategoriesContainer } from "../components/categoriesContainer";
import { ListOfMovies } from "../components/newMoviesSlider";
import { TitleComponent } from "../components/titleComponent";
import { MoviesCategoriesListComponent } from "../components/moviesCategoriesComponent";
import { MoviesListComponent } from "../components/moviesListComponent";

const {width,height} = Dimensions.get("screen")
export function HomePage(){
    return (
       
        <View style={style.parent}>
            <ImageBackground style={style.image} resizeMode="stretch" source={require("../assets/images/group3.png")}>
            {/* Profile */}
            <ProfileHeader userName={"shady"}/>

             {/* movies categories button Group */}
            <View style={{paddingTop:10}}>
                <View style={{justifyContent:"center",alignItems:"center",height:80}}>
                <CategoriesContainer catName={["Movies", "Series", "Cartoon"]} index={null}/>

                </View>

                <ScrollView  style={{height:height >=850 ? height*0.68:height*0.61}} centerContent={true}>
                     <ListOfMovies/>
                     <TitleComponent title={"Categories"} allButton={false} />
                     <MoviesCategoriesListComponent/>
                     <TitleComponent title={"Recommended for you"} allButton={true} />
                    < MoviesListComponent />
                </ScrollView>
            
              
            </View>
            
            </ImageBackground>
        </View>
       

        
        
    )
}

const style = StyleSheet.create({
    parent:{
        paddingTop:20,
      height:"90%",
       flex:0.9
    },image:{
        position:"absolute",
       top:-20,
        left:-10,
        width:Dimensions.get("screen").width +20,
        height:Dimensions.get("screen").height,

    },navigatorStyle:{
        backgroundColor:"red"
    }

});