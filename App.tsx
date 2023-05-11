import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/navigation/stack_navigation";
import { useFonts } from "expo-font";
import { View, Image } from "react-native";
import { backgroundColor, whiteColor } from "./src/constants";
import { StatusBar } from "expo-status-bar";
import ThemeContext from "./src/context/theme_context";
import { useMemo, useState } from "react";

export default function App() {
  const [loaded] = useFonts({
    medium: require("./assets/fonts/Montserrat-Medium.ttf"),
    bold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });
    const [themeData,setThemeData] = useState("dark")

    const themeDataValue = useMemo(()=>({themeData,setThemeData}),[themeData])
  if (!loaded) {
    return (
      <>
      <StatusBar backgroundColor={backgroundColor} style={'light'}/>

        <View
          style={{
            flex: 1,
            backgroundColor: backgroundColor,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              resizeMode: "contain",
              height: 70,
              width: "80%",
            }}
            source={require("./assets/logo.png")}
          />
        </View>
      
      </>
    );
  }

  return (
   <ThemeContext.Provider value={themeDataValue}>
     <>
     <StatusBar backgroundColor={themeData === "dark"?backgroundColor:whiteColor} style={themeData === "light"?'light':"dark"}/>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>

    </>
    </ThemeContext.Provider>
  );
}
