import React, { useRef ,useEffect,useState} from "react";
import { ImageBackground, TouchableOpacity, View,Text,StyleSheet,Dimensions,Animated } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { blackColor, darkGreyColor, pinkColor, whiteColor } from "../constants/Colors";
import { lightGreyColor } from './../constants/Colors';
const List = ["DSAD","SD","DFDFASF"]
export function ListOfMovies(){
    let int:number = 0;
    let index = 0
    const [initialNumber,setInitialNumber]= useState<number>(0)
    const listRef = useRef<FlatList>(null);
    let timer: string | number | NodeJS.Timeout | undefined ;
    useEffect(()=>{
     timer =  setInterval(()=>{
            int++
            
           

            if(int > List.length){
                int = 0
            }else{
                listRef.current?.scrollToIndex({animated:true,index:int-1})

                setInitialNumber(int)
            }
            
        },4000)
       return ()=>clearTimeout(timer)
    },[])

 


    return(<View>
        <FlatList
        
        ref={listRef}
            horizontal
            scrollEnabled
            data={List}
            centerContent={true}
            onScroll={(event) => {
               
                clearTimeout(timer)
               
                console.log(event.target.valueOf("key"))
             
                // work with: index
            }}
            renderItem={(item)=><MoviesContainer key={item.index}/>}

        /> 
        <Animated.View style={style.indecatorContainer}>
                {List.map((e,index)=><View key={e} style={initialNumber-1 ===index? style.activeBallIndecator :style.ballIndicator}></View>)}
                </Animated.View>
    </View>   )
}

function MoviesContainer(){
    
        return(
        <TouchableOpacity onPress={()=>{}}>
                <View style={style.mainContainer}>
                <ImageBackground imageStyle={{borderRadius:15}} style={{width:"100%",height:"100%",justifyContent:"flex-end", }} resizeMode="cover" source={require("../assets/images/icon.png")}>
                
                    <View style={style.textContainer}>
                        <Text style={style.title}>The batman</Text>
                        <Text style={style.subTitle}>The batman ddsasfasdfsadfsadfsdfsadfsafdsdsdfsafsdfdsafsadfsadfsafasfsafafsadfsadfasf</Text>
                    </View>
                </ImageBackground>
        </View>
        </TouchableOpacity>
    
    
        )
    
}

const style = StyleSheet.create({
    mainContainer:{
        paddingVertical:5,
        paddingHorizontal:10,
        width:Dimensions.get('screen').width *0.81
        ,height:Dimensions.get('screen').height *0.35
    },
   
    textContainer:{
        backgroundColor:blackColor,
        height:"35%",
        justifyContent:"space-evenly",
        borderBottomLeftRadius:13.5,
        borderBottomRightRadius:13.5,
    },
    title:{
        paddingHorizontal:10,
        color:whiteColor,
        fontFamily:"lato-bold",
        fontWeight:"300",
        fontSize:19
    },
    subTitle:{
        width:"90%",
        height:"45%",
        paddingHorizontal:12,
        color:whiteColor,
        fontFamily:"lato-regular",
        overflow:"hidden"
    }
    
    ,ballIndicator:{
        width:10,
        height:10,
        borderRadius:10/2,
        backgroundColor:lightGreyColor,
        margin: 10,
    },
    activeBallIndecator:{
        width:25, 
        height:10,
        borderRadius:10/2,
        backgroundColor:pinkColor,
        margin: 10,
    },
    indecatorContainer:{
        marginTop:15,
        flexDirection:"row",
        justifyContent:"center"
    }


})