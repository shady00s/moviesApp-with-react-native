import { Text, View,StyleSheet, Dimensions,ScrollView } from "react-native";
import { PersonalDataComponent } from "../components/profileComponents/personalDataComponent";
import { blackColor, whiteColor } from "../constants/Colors";
import { CategoriesContainer } from './../components/categoriesContainer';


const widgets = []
export function ProfileScreen(){
    return(
        <View style={style.mainContianer}>
             <Text style={style.title}>Profile</Text>
            <View style={{height:80,padding:3}}>
             <CategoriesContainer catName={["Personal data","My purchases","Settings"]}/>
                
            </View>

                <ScrollView>
                     <PersonalDataComponent/>
                </ScrollView>
               
            
            </View>
    )
}

const style = StyleSheet.create({
    mainContianer:{
        backgroundColor:blackColor,
        flex:1,
        
        
    },title:{left:"40%",
        fontFamily:"lato-bold",
        fontSize:21,
        color:whiteColor,
        paddingTop:Dimensions.get("screen").height *0.1,
        paddingBottom:20,
    }
})