import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { subBackGround, yellowColor } from "../../../constants";
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useContext, useEffect, useState } from "react";
import StepperPaginationContext from "./context/stepper_pagination_context";




const StepperNavButton: React.FC<IstepperNavButton> = (props) => {
  const { page, setPage } = useContext(StepperPaginationContext)
  const [showError, setShowError] = useState(!props.navToNextPage)
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

  }, [page.currentIndex])
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

              <Text style={style.prevButton}>Prev</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => { handleNextPage() }}>
            <View style={style.nextButton}>
              {showError ? <View style={style.errorContainer}><Text
                style={style.errorText}
              >You need to complete the required data to continue</Text></View> :
               <><Text style={style.nextText}>Next</Text>
               <Ionicons color={yellowColor} name="arrow-forward-outline" /></>
                     
}
              
            </View>
          </TouchableOpacity>
        </View>


      ) : (
        <View style={style.nextContainer}>
          <TouchableOpacity  onPress={() => { handleNextPage() }}>
            <View style={style.nextButton}>
            {showError ? <View style={style.errorContainer}><Text
                style={style.errorText}
              >You need to complete the required data to continue</Text></View> :
               <><Text style={style.nextText}>Next</Text>
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

    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  nextContainer: {
    height:"100%",
    width: "90%",
    padding: 12,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  nextText: {
    color: yellowColor,
    fontFamily: "medium",
    paddingRight: 7
  },
  nextButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
