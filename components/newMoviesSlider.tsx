import React, { useRef ,useEffect,useState, FC, useMemo, memo, } from "react";
import { Image, TouchableOpacity, View,Text,StyleSheet,Dimensions,Animated, NativeSyntheticEvent, NativeScrollEvent, Pressable, VirtualizedListWithoutRenderItemProps, FlatListProps } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { blackColor, pinkColor, whiteColor } from "../constants/Colors";
import { lightGreyColor } from './../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { MovieModel } from './../models/movieModel';
import { imageURL } from "../constats";


  const ListOfMovies:FC<{listOfMovies:MovieModel[]}> = ({listOfMovies})=>{
    const [initialNumber,setInitialNumber]= useState<number>(0);
    const listRef = useRef<FlatList>(null);    

    return(<View style={{justifyContent:"center",alignItems:"center"}}>
        <FlatList
        ref={listRef}
        contentContainerStyle={{ flexGrow: 1}}
        keyExtractor={(item)=>item.backdrop_path}
        pagingEnabled
        snapToAlignment={"center"}
            horizontal
            scrollEnabled
            data={listOfMovies}
            centerContent={true}
            onScrollToIndexFailed={(element )=>{
                    setInitialNumber(element.index)
            }}
            
            disableIntervalMomentum={true}
            
            onMomentumScrollEnd={(event:NativeSyntheticEvent<NativeScrollEvent>)=>{
            
            let scrollIndex = Math.floor(event.nativeEvent.contentOffset.x / Dimensions.get("screen").width)

                setInitialNumber(scrollIndex+1)              
                
        }}

            
           
            renderItem={({item,index}:{item:MovieModel,index:number},)=><MoviesContainer key={item.backdrop_path} name={item.title} discription={item.overview} imageLink={item.backdrop_path} id={item.id}/>}

        /> 
    
        <View style={style.indecatorContainer}>
                {listOfMovies.map((e,index)=><TouchableOpacity onPress={()=>{
                       
                       setInitialNumber(index)
                       listRef.current?.scrollToIndex({animated:true,index:index})
                    
                    
                    
                    }}><Animated.View key={e.id} style={initialNumber === index? style.activeBallIndecator :style.ballIndicator}></Animated.View></TouchableOpacity>)}
                </View>
        
                 
    </View>   )
}

const  MoviesContainer:FC<{name:string,discription:string,imageLink:string,id:number}>=({name,imageLink,id,discription})=>{
    const navigator = useNavigation<any>()
        return(
        <TouchableOpacity style={{width:Dimensions.get("screen").width,justifyContent:"center",alignItems:"center"}}onPress={()=>{navigator.navigate('movieScreen',{movieID:id})}}>
                <View style={style.mainContainer}>
                <Image  style={{width:"100%",height:"70%",borderRadius:15}} resizeMode="cover" 
                
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

export default memo(ListOfMovies)