import React, { useRef ,useEffect,useState, useMemo, FC} from "react";
import { Image, TouchableOpacity, View,Text,StyleSheet,Dimensions,Animated, NativeSyntheticEvent, NativeScrollEvent, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { blackColor, darkGreyColor, pinkColor, whiteColor } from "../constants/Colors";
import { lightGreyColor } from './../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { MovieModel } from './../models/movieModel';
import { imageURL } from "../constats";
export const ListOfMovies:FC<{listOfMovies:MovieModel[]}> = ({listOfMovies})=>{
    let int:number = 0;
    const [initialNumber,setInitialNumber]= useState<number>(0);
    const [scrollIndex,setScrollIndex] = useState<number>(0)
    const [timerVal,setTimerVal]=useState<number>(4000)
    const listRef = useRef<FlatList>(null);


    let timer:NodeJS.Timeout |number | undefined;



    useEffect(()=>{
     timer  = setInterval(()=>{
        int++
        if(int > listOfMovies!.length){
            int = 0
        }else{
            setInitialNumber(int)
            listRef.current?.scrollToIndex({animated:true,index:int-1})

            
        }
        
    },timerVal);
       return ()=>clearTimeout(timer)
    },[timerVal])

    useEffect(()=>{
        setInitialNumber(scrollIndex)
    },[scrollIndex])


    return(<View style={{justifyContent:"center",alignItems:"center"}}>
        <FlatList
        ref={listRef}
        pagingEnabled
            horizontal
            scrollEnabled
            data={listOfMovies}
            centerContent={true}
            onScroll={(event:NativeSyntheticEvent<NativeScrollEvent>)=>
               
                {
                    setTimerVal(5500)
                    // to stop the automatic scrolling
                   let x = Math.round((event.nativeEvent.contentOffset.x / Dimensions.get("screen").width))          
                    setScrollIndex(x)
                
                }}
            renderItem={({item,index}:{item:MovieModel,index:number},)=><MoviesContainer key={index} name={item.title} discription={item.overview} imageLink={item.poster_path} id={item.id}/>}

        /> 
    
        <View style={style.indecatorContainer}>
                {listOfMovies.map((e,index)=><TouchableOpacity onPress={()=>{
                    
                    setTimerVal(5500)
                    setInitialNumber(index)
                    listRef.current?.scrollToIndex({animated:true,index:index})
                    
                    
                    }}><Animated.View key={e.id} style={initialNumber === index? style.activeBallIndecator :style.ballIndicator}></Animated.View></TouchableOpacity>)}
                </View>
        
                 
    </View>   )
}

const  MoviesContainer:FC<{name:string,discription:string,imageLink:string,id:number}>=({name,imageLink,id,discription})=>{
    const navigator = useNavigation<any>()
        return(
        <TouchableOpacity onPress={()=>{navigator.navigate('movieScreen',{movieID:id})}}>
                <View style={style.mainContainer}>
                <Image  style={{width:"100%",height:"95%",borderRadius:15}} resizeMode="stretch" 
                
                source={{uri:`${imageURL + imageLink}`}}/>
                
                    <View style={style.textContainer} >
                        <Text style={style.title}>{name}</Text>
                        <Text style={style.subTitle}>{discription}</Text>
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
        marginLeft:15,
        width:Dimensions.get('screen').width *0.97
        ,height:Dimensions.get('screen').height *0.478
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
        fontSize:19,
        letterSpacing:1.1
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
        width:"90%",
        flexWrap:"wrap",
        marginTop:15,
        flexDirection:"row",
        justifyContent:"center",
       
    }


})