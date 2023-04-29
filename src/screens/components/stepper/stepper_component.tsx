import { StyleSheet, View, Text } from "react-native";
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
  const scrollWidth = 100 / props.screens.length
  const changeIndexByCircle = useCallback((index: number) => {
    setPage((prev)=>({...prev,currentIndex:index}))
    setSelectedIndex(() => index);
    let scrollRange = (-width.current  * index ) +35
    if (index > 0) {
      Animated.timing(animateOffset, { useNativeDriver: true, duration: 200, toValue: scrollRange }).start()

    }else if(index==0){
      Animated.timing(animateOffset, { useNativeDriver: true, duration: 200, toValue: scrollWidth }).start()

    } else {
      Animated.timing(animateOffset, { useNativeDriver: true, duration: 200, toValue: -(scrollRange) + width.current }).start()

    }
  }, []);


  const changeIndexByNavButtons = useCallback(() => {
    console.log(page.currentIndex);
    let scrollRange = (-width.current  * page.currentIndex ) +35
    if (page.currentIndex > 0) {
      Animated.timing(animateOffset, { useNativeDriver: true, duration: 200, toValue: scrollRange }).start()

    }else if(page.currentIndex==0){
      Animated.timing(animateOffset, { useNativeDriver: true, duration: 200, toValue: scrollWidth }).start()

    } else {
      Animated.timing(animateOffset, { useNativeDriver: true, duration: 200, toValue: -(scrollRange) + width.current }).start()

    }
    setSelectedIndex(() => page.currentIndex);
  }, [page.currentIndex])

  

  useEffect(() => { changeIndexByNavButtons() }, [page.currentIndex])
  return (
    <>
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
            flexDirection: "row",
            justifyContent:"center",
            alignItems:"center"
          }}>


            {props.screens.map((data, index) => <Animated.View style={{
              flexDirection: "row",
              justifyContent:"center",
              alignItems:"center",

              width: `35%`,
              height: "100%",
              transform: [{ translateX: animateOffset }]
            }}><data.screen key={index} /></Animated.View>)}


          </Animated.View>
        </StepperPaginationContext.Provider>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  mainContianer: {
    width: "95%",
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
