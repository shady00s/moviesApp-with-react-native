import { View,Text } from "react-native"
import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import axiosInstance from "../../../instance"
import IntroSelectMovies from "../../components/intro_select_movies"

const SetFavoriteMoviesComponent:React.FC = ()=>{
    const [movies,setMovies] = useState([])
    const getMoviesData = async ()=>{
        
        await axiosInstance.get('/getIntroSelectMovies').then(data=>{
            setMovies(data.data.data)
        }).catch(err=>{console.log(err);})
    }
    useEffect(()=>{
        
        getMoviesData()
    },[])
    return(<>
            <View style={style.main}>
                <Text>Select your favorite movies</Text>
                <Text>you need to select at least 4 movies</Text>
                    {movies.map(data=><IntroSelectMovies title={data.title} poster_path={data.poster_path} selected={false}/>)}

            </View>
        </>)
}
const style = StyleSheet.create({
    main:{

    }
})

export default React.memo(SetFavoriteMoviesComponent)