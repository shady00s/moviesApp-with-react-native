import { StyleSheet } from "react-native";
import { lightGrayColor, whiteColor } from "../../constants";


const globalStyle = StyleSheet.create({
    title:{
        padding:3,
        color: whiteColor,
    fontFamily: "bold",
    fontSize: 19,
    },
    smallerTitle:{
        padding:3,
        fontSize: 14,
        color:whiteColor,
        fontFamily:"bold"
    },
    subTitle:{

        fontFamily: "medium",
        color: lightGrayColor,
        padding: 8,
    },

    text:{
        padding:3,
        fontFamily: "medium",
        color:whiteColor
    }
})

export default globalStyle