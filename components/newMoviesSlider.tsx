import React, { useRef ,useEffect,useState, useMemo} from "react";
import { Image, TouchableOpacity, View,Text,StyleSheet,Dimensions,Animated, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { blackColor, darkGreyColor, pinkColor, whiteColor } from "../constants/Colors";
import { lightGreyColor } from './../constants/Colors';
const List = ["DSAD","SD","DFDFASF"]
export function ListOfMovies(){
    let int:number = 0;
    const [initialNumber,setInitialNumber]= useState<number>(1);
    const [timerVal,setTimerVal]=useState<number>(4000)
    const listRef = useRef<FlatList>(null);
    let timer:NodeJS.Timeout |number | undefined;



    useEffect(()=>{
     timer  = setInterval(()=>{
        int++
        if(int > List.length){
            int = 0
        }else{
            listRef.current?.scrollToIndex({animated:true,index:int-1})

            setInitialNumber(int)
        }
        
    },timerVal);
       return ()=>clearTimeout(timer)
    },[])

 


    return(<View>
        <FlatList
        ref={listRef}
        automaticallyAdjustContentInsets={true}
        contentContainerStyle={{flexGrow: 1,alignItems:"center", justifyContent: 'center'}}
        pagingEnabled
            horizontal
            scrollEnabled
            data={List}
            centerContent={true}
            onScroll={(event:NativeSyntheticEvent<NativeScrollEvent>)=>
               
                {
                    // to stop the automatic scrolling
                   
                    setInitialNumber(Math.round((event.nativeEvent.contentOffset.x / Dimensions.get("screen").width))+1)
                    setTimerVal(5500)
                 
                
                }}
            renderItem={(item)=><MoviesContainer key={item.index}/>}

        /> 
     {useMemo(()=><Animated.View style={style.indecatorContainer}>
                {List.map((e,index)=><View key={e} style={initialNumber-1 === index? style.activeBallIndecator :style.ballIndicator}></View>)}
                </Animated.View>,[initialNumber])}   
    </View>   )
}

function MoviesContainer(){
    
        return(
        <TouchableOpacity onPress={()=>{}}>
                <View style={style.mainContainer}>
                <Image  style={{width:"100%",height:"95%",borderRadius:15}} resizeMode="stretch" source={require("../assets/images/icon.png")}/>
                
                    <View style={style.textContainer}>
                        <Text style={style.title}>The batman</Text>
                        <Text style={style.subTitle}>The batman ddsasfasdfsadfsadfsdfsadfsafdsdsdfsafsdfdsafsadfsadfsafasfsafafsadfsadfasf</Text>
                    </View>
                
        </View>
        </TouchableOpacity>
    
    
        )
    
}

const style = StyleSheet.create({
    mainContainer:{
        borderRadius:15,
        paddingVertical:5,
        paddingHorizontal:8,
        marginHorizontal:5,
        width:Dimensions.get('screen').width *0.97
        ,height:Dimensions.get('screen').height *0.378
    },
   
    textContainer:{
        position:"absolute",
        width:"100%",
        right:8,
        bottom:15,
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
        height:"50%",
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