import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { darkYellowColor, subBackGround, yellowColor } from "../../../constants";
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useContext, useEffect, useState } from "react";
import StepperPaginationContext from "./context/stepper_pagination_context";
import ThemeContext from "../../../context/theme_context";
import { textLightColorStyle } from './../../register_screen/global_styles';




const StepperNavButton: React.FC<IstepperNavButton> = (props) => {
  const { page, setPage } = useContext(StepperPaginationContext)
  const [showError, setShowError] = useState(false)
  const {themeData} = useContext(ThemeContext)
  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    }

  }, [showError])
  const handleNextPage = useCallback(() => {
    if (props.navToNextPage) {
      if (page.currentIndex < page.screensNumber - 1) {
        let newIndex = page.currentIndex + 1


        setPage((prev) => ({ ...prev, currentIndex: newIndex }));


      }
    } else {
      setShowError(true)
    }

  }, [page.currentIndex,props.navToNextPage])
  const handlePrevPage = useCallback(() => {
    if (page.currentIndex > 0) {
      let newIndex = page.currentIndex - 1
      setPage((prev) => ({ ...prev, currentIndex: newIndex }));


    }
  }, [page.currentIndex])

  return (
    <>
      {props.isMiddle ? (
        <View style={style.nextPrevContainer}>
          <TouchableOpacity onPress={() => { handlePrevPage() }}>
            <View style={style.nextButton}>
              <Ionicons color={"rgba(142,142,142,0.8)"} name="arrow-back-outline" />

              <Text style={{...style.prevButton}}>Prev</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => {
             handleNextPage()  
             props.onNext()
             }}>
            <View style={style.nextButton}>
              {showError ? <View style={style.errorContainer}><Text
                style={style.errorText}
              >You need to complete the required data to continue</Text></View> :
               <><Text style={{...style.nextText,color:themeData==="dark"?yellowColor:darkYellowColor}}>Next</Text>
               <Ionicons color={yellowColor} name="arrow-forward-outline" /></>
                     
}
              
            </View>
          </TouchableOpacity>
        </View>


      ) : (
        <View style={style.nextContainer}>
          <TouchableOpacity  onPress={() => { 
            handleNextPage() 
            props?.onNext()
            }}>
            <View style={{...style.nextButton,height:Dimensions.get("screen").height *0.1}}>
            {showError ? <View style={style.errorContainer}><Text
                style={style.errorText}
              >You need to complete the required data to continue</Text></View> :
               <><Text style={{...style.nextText,color:themeData==="dark"?yellowColor:darkYellowColor}}>Next</Text>
            <Ionicons color={yellowColor} size={16} name="arrow-forward-outline" />
            </>
    
}

            </View>

          </TouchableOpacity>
        </View>
      )}

    </>
  );
};

const style = StyleSheet.create({
  nextPrevContainer: {
    width: "90%",
    height:"100%",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  nextContainer: {
   height:"100%",
    width: "90%",
    padding: 12,
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  nextText: {
    fontFamily: "medium",
    paddingRight: 7
  },
  nextButton: {
    width:"auto",
    height:"100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",

  },
  prevButton: {
    color: "rgba(142,142,142,0.8)",
    fontFamily: "medium",
    paddingLeft: 7

  },
  errorContainer: {
    
    width:"100%",
    backgroundColor: subBackGround,
    padding: 10,
    borderRadius: 3,
    textAlign: "center"

  },
  errorText: {
    fontFamily: "medium",
    color: "orange"
  }

})
export default StepperNavButton;
