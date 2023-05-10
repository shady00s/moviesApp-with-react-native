import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { subBackGround, yellowColor } from "../../../constants";
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useContext, useState } from "react";
import StepperPaginationContext from "./context/stepper_pagination_context";




const StepperNavButton: React.FC<IstepperNavButton> = (props) => {
  const {page,setPage} = useContext(StepperPaginationContext)
  const handleNextPage =  useCallback(()=>{
    if(page.currentIndex < page.screensNumber-1){
        let newIndex = page.currentIndex +1


        setPage((prev) => ({...prev,currentIndex:newIndex}));

       
      }
},[page.currentIndex])
const handlePrevPage =  useCallback(()=>{
    if( page.currentIndex > 0 ){
      let newIndex = page.currentIndex -1
      setPage((prev) => ({...prev,currentIndex:newIndex}));


      }  
},[page.currentIndex])

  return (
    <>
      {props.isMiddle ? (
        <View style={style.nextPrevContainer}>
            <TouchableOpacity onPress={()=>{handlePrevPage()}}>
            <View style={style.nextButton}>
            <Ionicons color={"rgba(142,142,142,0.8)"} name="arrow-back-outline"/>

                <Text style={style.prevButton}>Prev</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity disabled={!props.navToNextPage} onPress={()=>{handleNextPage()}}>
                <View style={style.nextButton}>
                <Text style={style.nextText}>Next</Text>
                <Ionicons color={yellowColor} name="arrow-forward-outline"/>
                </View>
            </TouchableOpacity>
        </View>
      ) : (
        <View style={style.nextContainer}>
          <TouchableOpacity disabled={!props.navToNextPage} onPress={()=>{handleNextPage()}}>
            <View style={style.nextButton}>
                <Text style={style.nextText}>Next</Text>
                <Ionicons  color={yellowColor} size={16} name="arrow-forward-outline"/>

            </View>

          </TouchableOpacity>
        </View>
      )}

    </>
  );
};

const style = StyleSheet.create({
    nextPrevContainer:{
        width:"90%",
        padding:12,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    nextContainer:{
        width:"90%",
        padding:12,
        justifyContent:"flex-end",
        alignItems:"flex-end"
    },
    nextText:{
        color:yellowColor,
        fontFamily:"normal",
        paddingRight:7
    },
    nextButton:{
        paddingHorizontal:12,
        paddingVertical:8,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    prevButton:{
        color:"rgba(142,142,142,0.8)",
        fontFamily:"normal",
        paddingLeft:7

    }

})
export default StepperNavButton;
