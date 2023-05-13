import { StyleSheet, SafeAreaView, View, Text, Platform, StatusBar } from "react-native";
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
  darkGrayColor,
  darkYellowColor,
  lightbackground,
  subBackGround,
  whiteColor,
  yellowColor,
} from "../../../constants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import StepperPaginationContext from "./context/stepper_pagination_context";
import { Animated } from "react-native";
import MainViewComponent from "../main_view_component";
import ThemeContext from "../../../context/theme_context";






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
  const animateOffset = useRef(new Animated.Value(0)).current
  const scrollWidth = (100 / props.screens.length)
  const [page, setPage] = useState<Ipagination>({ screensNumber: props.screens.length, currentIndex: 0 })
  const paginationValue = useMemo(() => ({ page, setPage }), [page])
  const { themeData } = useContext(ThemeContext)
  const [stepperColor, setStepperColor] = useState<IstepperColor[]>([])

  const stepperColorInitFunction = () => {
    const stepperStack = []
    for (let index = 0; index < props.screens.length; index++) {
      index == 0 ? stepperStack[index] = { backGroundColor: themeData === "dark" ? yellowColor : darkYellowColor, color: "black", index: index } : stepperStack[index] = { backGroundColor: themeData === "dark" ? subBackGround : lightbackground, color: themeData === "dark" ? yellowColor : subBackGround, index: index }

    }
    setStepperColor(() => stepperStack)
  }

  const stepperColorChangeHandler = useCallback((targetIndex: number) => {
    const oldStepperStack = [...stepperColor]
    for (let index = 0; index < oldStepperStack.length; index++) {
      if (targetIndex < index) {
        oldStepperStack[index].backGroundColor = themeData === "dark" ? subBackGround : lightbackground
        oldStepperStack[index].color = themeData === "dark" ? yellowColor : subBackGround
      } else {
        oldStepperStack[index].backGroundColor = themeData === "dark" ? yellowColor : darkYellowColor
        oldStepperStack[index].color = themeData === "dark" ? subBackGround : whiteColor

      }

    }
    setStepperColor(() => oldStepperStack)
  }, [page.currentIndex, themeData])



  const changeIndexByCircle = useCallback((index: number) => {
    if (index !== page.currentIndex && index <= page.currentIndex) {
      setSelectedIndex(() => index)

      setPage((prev) => ({ ...prev, currentIndex: index }))

      Animated.timing(animateOffset, { useNativeDriver: true, duration: 200, toValue: scrollWidth }).start()

    }

  }, [page.currentIndex]);


  const changeIndexByNavButtons = useCallback(() => {
    let scrollRange = (-width.current * page.currentIndex) + (width.current * 0.070 * page.currentIndex)

    Animated.timing(animateOffset, { useNativeDriver: true, duration: 200, toValue: scrollRange }).start()
    setSelectedIndex(() => page.currentIndex);


  }, [page.currentIndex])

  useEffect(() => {
    if (stepperColor.length === 0) {
      stepperColorInitFunction()
    }
  }, [stepperColor])

  useEffect(() => {
    stepperColorChangeHandler(page.currentIndex)

    changeIndexByNavButtons()
  }, [page.currentIndex, themeData])
  return (
    <>
      <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
        <StepperPaginationContext.Provider value={paginationValue}>
          <MainViewComponent style={style.mainContianer}>
            {/* indexContainer */}
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
                    style={{ ...style.indexButton, }}
                  >
                    <View
                      style={[
                        { ...style.circleBody },
                        {
                          backgroundColor:
                            stepperColor[index]?.backGroundColor,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          { ...style.circleIndex },
                          {
                            color:
                              stepperColor[index]?.color,
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
                            stepperColor[index]?.backGroundColor
                          }
                        />
                      </View>
                    ) : null}
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* screen body */}
            <View style={{
              width: `${props.screens.length * 100}%`,
              height: "90%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>


              {props.screens.map((data, index) => <Animated.View key={index} style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: width.current * 0.030,
                width: width.current - (width.current * 0.070),
                height: "100%",
                transform: [{ translateX: animateOffset }]
              }}><data.screen /></Animated.View>)}


            </View>
          </MainViewComponent>
        </StepperPaginationContext.Provider>

      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  mainContianer: {
    width: "95%",
    height: "100%",
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
