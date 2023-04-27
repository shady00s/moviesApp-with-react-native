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
import StepperNavButton from "./stepper_nav_button";

interface screenInterface {
  title: string;
  screen:React.FC
}

interface stepperModel {
  screens: screenInterface[];
  indexColor: string;
}

interface separator {
  number: number;
  color: string;
}
interface Ipagination {
  pageIndex: number;
  screensNumber: number;
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
  const [page, setPage] = useState<Ipagination>({
    pageIndex: 0,
    screensNumber: props.screens.length,
  });
  const paginationValue = useMemo(() => {
    return { page, setPage };
  }, [page]);
  const width = useRef(Dimensions.get("window").width);
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const currentIndex = useCallback(({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setSelectedIndex(() => index);
    }
  }, []);

  const changeIndexByCircle = useCallback((index:number) => {
    listRef.current.scrollToIndex({
      index: index,
      animated: true,
      viewOffset: 0,
      viewPosition: 0,
    });
    setSelectedIndex(() => page.pageIndex);
  }, [page.pageIndex]);
  useEffect(() => {
    changeIndexByCircle(page.pageIndex);
  }, [page.pageIndex]);

  return (
    <>
      <View style={style.mainContianer}>
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
                  setPage(() => ({ ...page, pageIndex: index }));
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
        <View style={{ width: "100%", height: "90%" }}>
          <StepperPaginationContext.Provider value={paginationValue}>
            <FlatList
              ref={listRef}
              scrollEnabled={false}
              initialScrollIndex={0}
              data={props.screens}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              pagingEnabled={true}
              keyExtractor={() =>(Math.random()*199).toString()}
              getItemLayout={(data, index) => ({
                length: width.current,
                offset: width.current * index,
                index,
              })}
              renderItem={(data) => (
                <View style={{ flex: 1, width: width.current }}>
                  <Text style={style.text}>{data.item.title}</Text>
                  <data.item.screen/>
                <StepperNavButton navToNextPage isMiddle={data.index !== 0 && data.index !== data.item.screen.length -1?true:false}/>
                </View>
              )}
            />
          </StepperPaginationContext.Provider>
        </View>
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