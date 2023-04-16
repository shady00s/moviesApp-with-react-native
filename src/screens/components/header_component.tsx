import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { whiteColor } from "../../constants";

export default function HeaderComponent() {
  return (
    <>
      <View style={style.container}>
        {/* drawer menu */}
        <View style={style.drawerIcon}></View>
        <Text>MovieOnline</Text>
        <View style={style.drawerIcon}></View>

      </View>
    </>
  );
}

const style = StyleSheet.create({
    container:{
        marginTop:37,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center"
    },
  drawerIcon: {
    width: 25,
    height:25,
    borderRadius: 9999,
    borderColor: whiteColor,
    padding: 30,
    borderWidth: 0.3,
  },
});
