import { StyleSheet,SafeAreaView, View, Text, Platform, StatusBar } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  backgroundColor,
  subBackGround,
  whiteColor,
  yellowColor,
} from "../../../constants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import StepperPaginationContext from "./context/stepper_pagination_context";
import { Animated } from "react-native";

interface screenInterface {
  title: string;
  screen: React.FC
}

interface stepperModel {
  screens: screenInterface[];
  indexColor: string;
}

interface separator {
  number: number;
  color: string;
}



// separator line
const Separator: React.FC<separator> = (props) => {
  return (
    // main separator container
    <View
      style={{
        height: "auto",
        width: "100%",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* line style */}
      <View
        style={{
          margin: 1,
          backgroundColor: props.color,
          height: 2,
          width: "100%",
        }}
      ></View>
    </View>
  );
};
const Stepper: React.FC<stepperModel> = (props) => {

  const width = useRef(Dimensions.get("window").width);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [page, setPage] = useState<Ipagination>({ screensNumber: props.screens.length, currentIndex: 0 })
  const paginationValue = useMemo(() => ({ page, setPage }), [page])
  const animateOffset = useRef(new Animated.Value(0)).current
  const scrollWidth = (100 / props.screens.length)
  const changeIndexByCircle = useCallback((index: number) => {

    if(index !== page.currentIndex ){
      setPage((prev)=>({...prev,currentIndex:index}))
      
      setSelectedIndex(() => index);
  
        Animated.timing(animateOffset, { useNativeDriver: true, duration: 200, toValue: scrollWidth }).start()
    }

  }, []);


  const changeIndexByNavButtons = useCallback(() => {
    let scrollRange = (-width.current  * page.currentIndex ) + (width.current * 0.070 * page.currentIndex)
    if (page.currentIndex > 0) {
      Animated.timing(animateOffset, { useNativeDriver: true, duration: 200, toValue: scrollRange }).start()
      setSelectedIndex(() => page.currentIndex);

    }
  }, [page.currentIndex])

  
useEffect(()=>{
  Animated.timing(animateOffset, { useNativeDriver: true, duration: 200, toValue: scrollWidth }).start()

},[])
  useEffect(() => { changeIndexByNavButtons() }, [page.currentIndex])
  return (
    <>
    <SafeAreaView style={{paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
      <View style={style.mainContianer}>
        {/* indexContainer */}
        <StepperPaginationContext.Provider value={paginationValue}>
          <View style={style.indexContainer}>
            {/* index design */}
            {props.screens.map((screenData, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "stretch",
                }}
              >
                <TouchableOpacity
                  shouldActivateOnStart={false}
                  key={index}
                  onPress={() => {
                    changeIndexByCircle(index);

                  }}
                  style={{ ...style.indexButton }}
                >
                  <View
                    style={[
                      { ...style.circleBody },
                      {
                        backgroundColor:
                          selectedIndex === index ? yellowColor : subBackGround,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        { ...style.circleIndex },
                        {
                          color:
                            selectedIndex === index
                              ? backgroundColor
                              : yellowColor,
                        },
                      ]}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  {index !== props.screens.length - 1 ? (
                    <View
                      style={{
                        width: Math.round(
                          width.current / props.screens.length -
                          props.screens.length * props.screens.length
                        ),
                      }}
                    >
                      <Separator
                        number={0}
                        color={
                          selectedIndex === index ? yellowColor : subBackGround
                        }
                      />
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* screen body */}
          <Animated.View style={{
            width: `${props.screens.length * 100}%`,
            height:"90%",
            flexDirection: "row",
            justifyContent:"center",
            alignItems:"center"
          }}>


            {props.screens.map((data, index) => <Animated.View key={index} style={{
              flexDirection: "row",
              justifyContent:"center",
              alignItems:"center",
                paddingHorizontal:width.current * 0.030,
              width: width.current - (width.current * 0.070),
              height: "100%",
              transform: [{ translateX: animateOffset }]
            }}><data.screen  /></Animated.View>)}


          </Animated.View>
        </StepperPaginationContext.Provider>
      </View>

    </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  mainContianer: {
    width: "95%",
    height:"100%",
    backgroundColor: backgroundColor,
    margin: 8,
    padding: 3,
  },
  indexContainer: {
    overflow: "hidden",
    width: "100%",
    padding: 12,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  wrapper: {
    position: "relative",
    backgroundColor: "gray",
    padding: 16,
  },
  indexButton: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  circleBody: {
    justifyContent: "center",
    alignItems: "center",
    width: 26,
    height: 26,
    borderRadius: 9999,
  },
  circleIndex: {
    color: yellowColor,
  },
  text: {
    color: whiteColor,
    fontFamily: "bold",
  },
});

export default React.memo(Stepper);
