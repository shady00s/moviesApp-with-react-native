import { StyleSheet, View, Text, Switch, TouchableOpacity, Dimensions } from "react-native";
import DropdownComponent from "../../components/Dropdown_component";
import StepperNavButton from "../../components/stepper/stepper_nav_button";
import { backgroundColor, lightGrayColor, subBackGround, whiteColor, yellowColor } from "../../../constants";
import { useState } from "react";


export default function ProfileAndRegionSetComponent() {
    const [selectedTheme,setSelectedTheme] = useState("dark")
    console.log(selectedTheme);
    return (
        <>
            <View style={style.main}>
                <Text>Profile settings</Text>
                <Text>Region</Text>

                <DropdownComponent />
                {/* prevent audlt content */}
                <View style={style.switchContainer}>
                    <Text>Don't allow for audlt content</Text>
                    <Switch />
                </View>
                {/* Dark mode */}

                <Text>Choose Theme</Text>
                <View style={style.themeContainer}>
                    <TouchableOpacity onPress={()=>{setSelectedTheme("light")}}>

                        <View style={{...style.themeCardContainer }}>
                            <View style={[style.themeCard, {...style.lightTheme,borderColor:selectedTheme === "light"?"cyan":subBackGround}]}>

                                <View style={style.skeleton}>
                                   


                                    <View style={style.circle} />


                                    <View style={{
                                        ...style.skeletonBar, borderBottomLeftRadius: 21,
                                        borderBottomRightRadius: 21,
                                    }} />


                                </View>
                            </View>
                            <Text>Light</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setSelectedTheme("dark")}}>

                        <View style={{...style.themeCardContainer}}>
                            <View style={[style.themeCard,{ ...style.darkTheme,borderColor:selectedTheme === "dark"?"cyan":subBackGround}]}>


                            <View style={style.skeleton}>
                                   


                                   <View style={style.circle} />


                                   <View style={{
                                       ...style.skeletonBar,backgroundColor:subBackGround, borderBottomLeftRadius: 21,
                                       borderBottomRightRadius: 21,
                                   }} />


                               </View>
                            </View>
                            <Text>Dark</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <StepperNavButton navToNextPage={true} isMiddle={true} pageIndex={1} screensNumber={4} />


            </View>
        </>
    )
}

const style = StyleSheet.create({
    main: {
        flex: 1
    },
    switchContainer: {
        padding: 3,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"

    },
    themeContainer: {
        flexDirection: "row",
        flex: 0.85,
        justifyContent: "space-evenly",
        alignItems: "center",

    },
    themeCardContainer: {

        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("screen").width * 0.40,
        height: "75%",

    },
    themeCard: {
        justifyContent:"flex-end",
        width: "100%",
        height: "80%",
        borderRadius: 21,

    },
    lightTheme: {
        borderColor: subBackGround,
        borderWidth: 2,
        backgroundColor: whiteColor
    },
    darkTheme: {
        borderColor: subBackGround,
        borderWidth: 2,
        backgroundColor: backgroundColor

    },
    skeleton: {
        height: "50%",
        justifyContent: "space-between"
        ,alignItems:"flex-end"
    },
    skeletonBar: {
        width: "100%",
        height: "50%",
        backgroundColor: lightGrayColor,

    },
    textLight: {
        padding: 21,
        fontFamily: "bold"
    },
    circle: {
        
        marginHorizontal: 3,
        width: 50,
        height: 50,
        borderRadius: 9999,
        backgroundColor: yellowColor
    }



})