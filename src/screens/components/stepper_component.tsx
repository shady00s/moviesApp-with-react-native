import { StyleSheet, View, Text } from "react-native";
import React, { useRef, useState } from "react";
import { backgroundColor, subBackGround, yellowColor } from '../../constants';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
interface stepperModel {
  screens: React.FC[];
  titleList: string[];
  indexColor: string;
}

interface separator {
  number: number;
  color:string
}
// separator line
const Separator: React.FC<separator> = (props) => {
  const width =  useRef(Dimensions.get("screen").width) ;

  // separator width is caluclated by taking the width - (number of screens * double width of the index circle ) - 20
  const separatorWidth = Math.round(width.current - (props.number * 52)-20)
  return (
    // main separator container
    <View
      style={{
        height: "auto",
        width: separatorWidth,
        padding:3,
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

  const startElement = 0
  const [selectedIndex,setSelectedIndex] = useState<number>(startElement)
  return (
    <>
      <View style={style.mainContianer}>
        {/* indexContainer */}
        <View style={style.indexContainer}>
          {/* index design */}
          <FlatList
            horizontal
            data={props.screens}
            renderItem={({ item, index }) => (
              <TouchableOpacity key={index} onPress={()=>{
                setSelectedIndex(index)
              }} style={style.indexButton}>
                <View style={[{...style.circleBody},{backgroundColor:selectedIndex === index?yellowColor:subBackGround}]}>
                  <Text style={[{...style.circleIndex},{color:selectedIndex === index?backgroundColor:yellowColor}]}>{index + 1}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={{
              flex:1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
            ItemSeparatorComponent={({heighlited}) => 
              <Separator  color={heighlited?yellowColor:subBackGround} number={props.screens.length} />
            }
          />
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  mainContianer: {
    width: "100%",
    backgroundColor: backgroundColor,
    padding: 20,
  },
  indexContainer: {
    overflow: "hidden",
    width: "100%",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapper: {
    position: "relative",
    backgroundColor: "gray",
    padding: 16,
  },
  indexButton: {
    width: 26,
    height: 26,
  },
  circleBody: {
    justifyContent: "center",
    alignItems: "center",

    width:"100%",
    height:"100%",
    borderRadius: 9999,
  },
  circleIndex: {
    color: yellowColor,
  },
});

export default Stepper;
