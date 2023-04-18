import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/navigation/stack_navigation";
import { useFonts } from "expo-font";
import { View, Image } from "react-native";
import { backgroundColor } from "./src/constants";

export default function App() {
  const [loaded] = useFonts({
    medium: require("./assets/fonts/Montserrat-Medium.ttf"),
    bold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!loaded) {
    return (
      <>
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
    <>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </>
  );
}
