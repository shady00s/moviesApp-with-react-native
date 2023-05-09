import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Dimensions,
  SwitchChangeEvent,
} from "react-native";
import DropdownComponent from "../../components/Dropdown_component";
import StepperNavButton from "../../components/stepper/stepper_nav_button";
import {
  backgroundColor,
  lightGrayColor,
  subBackGround,
  whiteColor,
  yellowColor,
} from "../../../constants";
import { useState } from "react";
import globalStyle from "../../components/global_styles";
import { getLocales } from 'expo-localization';

console.log(getLocales());
interface IuserData{
    preventAdult: boolean,
    themeIsDark:boolean,
    region:string
}
export default function ProfileAndRegionSetComponent() {
  const [userData, setUserData] = useState<IuserData>({
        preventAdult:true,
        themeIsDark:true,
        region:"Eg"
  });

  return (
    <>
      <View style={style.main}>
        <Text style={globalStyle.title}>Profile settings</Text>
        <Text style={{ ...globalStyle.smallerTitle, padding: 12 }}>Region</Text>

        <DropdownComponent />
        {/* prevent audlt content */}
        <View style={style.switchContainer}>
            <View style={{padding:2}}>
                  <Text style={globalStyle.text}>Don't allow for audlt content</Text>
                  <Text style={globalStyle.subTitle}>This option is activated by default,it prevents to show audlt</Text>
            </View>
          <Switch  value={userData.preventAdult} onValueChange={(val)=>{
            setUserData((prev)=>({...prev,preventAdult:val}))
          }}/>
        </View>
        {/* Dark mode */}

        <Text style={globalStyle.smallerTitle}>Choose Theme</Text>
        <Text style={globalStyle.subTitle}>You can change it at anytime.</Text>
        <View style={style.themeContainer}>
          <TouchableOpacity
            onPress={() => {
                setUserData((prev)=>({...prev,themeIsDark:false}));
            }}
          >
            <View style={{ ...style.themeCardContainer }}>
              <View
                style={[
                  style.themeCard,
                  {
                    ...style.lightTheme,
                    borderColor:
                      !userData.themeIsDark?"cyan": subBackGround,
                  },
                ]}
              >
                <View
                  style={{
                    width: "30%",
                    height: "7%",
                    backgroundColor: lightGrayColor,
                    borderRadius: 3,
                    padding:4,
                    margin:3

                  }}
                />
               
            
                <View
                  style={{
                    width: "70%",
                    height: "7%",
                    backgroundColor: lightGrayColor,
                    borderRadius: 3,
                    padding:4,
                    margin:3

                  }}
                />
                 <View
                  style={{
                    width: "40%",
                    height: "7%",
                    backgroundColor: lightGrayColor,
                    borderRadius: 3,
                    padding:4,
                    margin:3
                  }}
                />
                <View style={style.skeleton}>
                  <View style={style.circle} />

                  <View
                    style={{
                      ...style.skeletonBar,
                      borderBottomLeftRadius: 21,
                      borderBottomRightRadius: 21,
                    }}
                  />
                </View>
              </View>
              <Text
                style={{
                  color: !userData.themeIsDark? "cyan" : whiteColor,
                }}
              >
                Light
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
                setUserData((prev)=>({...prev,themeIsDark:true}));
            }}
          >
            <View style={{ ...style.themeCardContainer }}>
              <View
                style={[
                  style.themeCard,
                  {
                    ...style.darkTheme,
                    borderColor:
                      userData.themeIsDark ? "cyan" : subBackGround,
                  },
                ]}
              >
                <View
                  style={{
                    width: "30%",
                    height: "7%",
                    backgroundColor: subBackGround,
                    borderRadius: 3,
                    padding:4,
                    margin:3

                  }}
                />
               
            
                <View
                  style={{
                    width: "70%",
                    height: "7%",
                    backgroundColor: subBackGround,
                    borderRadius: 3,
                    padding:4,
                    margin:3

                  }}
                />
                 <View
                  style={{
                    width: "40%",
                    height: "7%",
                    backgroundColor: subBackGround,
                    borderRadius: 3,
                    padding:4,
                    margin:3
                  }}
                />
                <View style={style.skeleton}>
                  <View style={style.circle} />

                  <View
                    style={{
                      ...style.skeletonBar,
                      backgroundColor: subBackGround,
                      borderBottomLeftRadius: 21,
                      borderBottomRightRadius: 21,
                    }}
                  />
                </View>
              </View>
              <Text
                style={{
                  color: userData.themeIsDark ? "cyan" : whiteColor,
                }}
              >
                Dark
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <StepperNavButton
          navToNextPage={true}
          isMiddle={true}
          pageIndex={1}
          screensNumber={4}
        />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  main: {
    flex: 1,
  },
  switchContainer: {
    padding: 6,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  themeContainer: {
    flexDirection: "row",
    flex: 0.8,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  themeCardContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.4,
    height: "75%",
  },
  themeCard: {
    justifyContent: "flex-end",
    width: "100%",
    height: "80%",
    borderRadius: 21,
  },
  lightTheme: {
    borderColor: subBackGround,
    borderWidth: 2,
    backgroundColor: whiteColor,
  },
  darkTheme: {
    borderColor: subBackGround,
    borderWidth: 2,
    backgroundColor: backgroundColor,
  },
  skeleton: {
    height: "50%",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  skeletonBar: {
    width: "100%",
    height: "48%",
    backgroundColor: lightGrayColor,
  },
  textLight: {
    padding: 21,
    fontFamily: "bold",
  },
  circle: {
    marginHorizontal: 2,
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: yellowColor,
  },
});
