import React from "react";
import {ImageBackground, Text ,View,StyleSheet,FlatList, ScrollView} from "react-native";
import { ProfileHeader } from "../components/profileHeader";
import { CategoriesContainer } from "../components/categoriesContainer";
import { ListOfMovies } from "../components/newMoviesSlider";
import { TitleComponent } from "../components/titleComponent";
import { MoviesCategoriesListComponent } from "../components/moviesCategoriesComponent";
import { MoviesListComponent } from "../components/moviesListComponent";

export function HomePage(){
    return (
       
        <View style={style.parent}>
            <ImageBackground style={style.image} resizeMode="cover" source={require("../assets/images/group3.png")}>
            {/* Profile */}
            <ProfileHeader userName={"shady"}/>

             {/* movies categories button Group */}
            <View style={{flex:1,paddingTop:40,}}>
                <View style={{justifyContent:"center",alignItems:"center",height:80}}>
                <CategoriesContainer catName={["Movies", "Series", "Cartoon"]} index={null}/>

                </View>

                <ScrollView centerContent={true}>
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
        
        backgroundColor:"rgb(15,15,15)",
        width:"100%",
        height:"100%",
       flex:1
    },image:{
       
        flex:1
    },navigatorStyle:{
        backgroundColor:"red"
    }

});