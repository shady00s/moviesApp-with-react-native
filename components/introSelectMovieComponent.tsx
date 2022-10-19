import { FC, useEffect, useState } from "react";
import { View ,FlatList, StyleSheet, Image,Text,TouchableOpacity} from "react-native";
import { height, imageURL, width } from "../constats";
import { CheckBox } from '@rneui/themed'
import { MovieModel } from './../models/movieModel';

export const IntroSelectMovieList:FC<{moviesList:MovieModel[]| null}> = ({moviesList})=>{
    const [moviesDataList,setMoviesDataList]=useState<number[]>([])
    const [ isCompleted,setIsCompleted] = useState<boolean>()
   
    return(
        <>
            <View>
                <FlatList data={moviesList}
                        numColumns={3}
                        centerContent

                        contentContainerStyle={{justifyContent:"center",alignItems:"center"}}
                    renderItem={(item)=><IntroSelectMoviesComponent movieData={item.item} onPress={function (): string {
                            let editedArry = moviesDataList
                        
                        
                        if(moviesDataList.indexOf(item.item.id) === -1){

                            editedArry.push(item.item.id)
                                
                            setMoviesDataList(editedArry)
                            }else{
                               
                                 editedArry.splice(editedArry.indexOf(item.item.id),1)
                               
                                setMoviesDataList(editedArry)

                            }
                        
                        
                        
                            console.log(moviesDataList)
                          
                        return item.item.id.toString()
                   
                    } }/>}
                />
            </View>
        </>
    )
}

const IntroSelectMoviesComponent:FC<{movieData:MovieModel,onPress:()=>string}> = ({movieData,onPress})=>{

    const [checked,setChecked] = useState(false)

    return(
        <TouchableOpacity onPress={()=>{
            
            setChecked(!checked)
            onPress()}}>
        <View style={style.movieDataContainer}>
            
            <View style={{width:"100%",height:"100%"}}>
            
                <Image style={{width:"100%",height:"100%",borderRadius:10}}resizeMode="contain" source={{uri:imageURL+ movieData.poster_path}}/>
               <View style={style.checkedBoxContaier}>
                
                <CheckBox
                
                onPress={()=>setChecked(!checked)}
                containerStyle={{borderRadius:6,width:25,height:26,paddingVertical:2,paddingRight:5,justifyContent:"center",alignItems:"center"}} title={""}checked={checked}/></View>
            </View>
        
        </View>
         </TouchableOpacity>

    )
}

const style = StyleSheet.create({
    movieDataContainer:{
        width : width * 0.33,
        height:width * 0.48,
        padding:5,
        borderRadius:10

        

    },checkedBoxContaier:{
        position:"absolute",
        right:5,
        borderRadius:10
    }
})