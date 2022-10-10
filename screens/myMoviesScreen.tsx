import { View,Text,StyleSheet, Dimensions ,FlatList } from "react-native";
import { AppBar } from "../components/appBarComponent";

import { CategoriesContainer } from "../components/categoriesContainer";
import { blackColor, whiteColor } from "../constants/Colors";
import { SmallMovieComponent } from './../components/smallMovieComponent';


const Test = ["sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd","sdsd"]
export function MyMoviesScreen(){
    return(<>
    <View style={style.mainContainer}>
    <AppBar title={""} iconName={""} path={""} secButton={false} isTransparent={false}/>
            <Text style={style.title}>My Movies</Text>
            <View style={{height:65}}>
                
                <CategoriesContainer catName={["Purchases", "Downloads", "My list"]} index={null}/>

            </View>
            <View style={{width:"100%",height:"88%"}}>  
            <FlatList
                data={Test}
                renderItem={(item)=> <SmallMovieComponent title={""}/>}
                
            />
            </View>
            
            
            
        </View>
    </>
        
    )
}

const style = StyleSheet.create({
    mainContainer:{
       
       flexDirection:"column",
        backgroundColor:blackColor,
       alignItems:"center",
       height:"100%"
    
    },title:{
        fontFamily:"lato-bold",
        fontSize:21,
        color:whiteColor,
        paddingTop:Dimensions.get("screen").height *0.05,
        paddingBottom:20,
    }
})