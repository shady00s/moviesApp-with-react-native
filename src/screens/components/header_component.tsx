import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { whiteColor } from "../../constants";

export default function HeaderComponent() {
  return (
    <>
      <View style={style.container}>
        {/* drawer menu */}
        <View style={style.drawerIcon}></View>
        <Text style={style.text}>MovieOnline</Text>
        <View style={style.drawerIcon}></View>

      </View>
    </>
  );
}

const style = StyleSheet.create({
  text:{
    color:whiteColor
  },
    container:{
        marginTop:37,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:20
    },
  drawerIcon: {
    width: 20,
    height:20,
    borderRadius: 9999,
    borderColor: whiteColor,
    padding: 20,
    borderWidth: 0.3,
  },
});
