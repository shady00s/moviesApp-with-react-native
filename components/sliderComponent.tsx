import { FC, useEffect,  useRef, useState } from "react";
import { View,Text, TouchableOpacity, FlatList ,ScrollView, Dimensions} from "react-native";
import { whiteColor } from "../constants/Colors";
import { pinkColor } from './../constants/Colors';

export const SliderComponent:FC<{titleList:string[],widgetsList:any[]}>=({titleList,widgetsList})=>{
    const [initIndex,setIndex]= useState<number>(0)
    const [scrollIndex,setScrollIndex] = useState<number>(0)

    const listRef = useRef<FlatList>(null)

    useEffect(()=>{
        setIndex(scrollIndex)

 

    } ,[scrollIndex])

    return(
        <>
        {/* title  list */}
            <View style={{flexDirection:"row",justifyContent:"space-evenly",width:"100%"}}>
                    {titleList.map((element,index)=>
                    
                    
                    <TouchableOpacity onPress={()=>{
                        
                        setIndex(index)
                        listRef.current?.scrollToIndex({animated:true,index:index})
                        


                    } }>
                        <Text style={{fontFamily:"lato-bold",color:whiteColor,fontSize:18}}>{element}</Text>
                       
                       <View style={{borderRadius:2,marginTop:5,width:"100%",height:3,backgroundColor: initIndex === index? pinkColor : "transparent"}}></View>
                        
                        </TouchableOpacity>)}
            </View>
        {/* widget list*/}
            <View>

                        <FlatList
                            horizontal
                            pagingEnabled
                            data={widgetsList}
                            ref={listRef}
                           onScroll={(event)=>
                            {
                                let x = event.nativeEvent.contentOffset.x/Dimensions.get("screen").width
                            
                                setScrollIndex(Math.round(x))
                                
                            }
                           }
                            renderItem={(item)=> <ScrollView
                                    
                            >{item.item}</ScrollView>}
                        />

            </View>
        </>
        
    )
}