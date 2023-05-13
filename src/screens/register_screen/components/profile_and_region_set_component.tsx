import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Dimensions,
  SwitchChangeEvent,
} from "react-native";
import DropdownComponent from "../../components/Dropdown_country_component";
import StepperNavButton from "../../components/stepper/stepper_nav_button";
import {
  backgroundColor,
  lightGrayColor,
  subBackGround,
  whiteColor,
  yellowColor,
} from "../../../constants";
import { useCallback, useContext, useEffect, useState } from "react";
import globalStyle from "../../components/global_styles";
import  * as Location  from 'expo-location';
import { CountryCode } from "react-native-country-picker-modal";
import ThemeContext from "../../../context/theme_context";
import { subTextLightColorStyle, textLightColorStyle } from "../global_styles";
interface IuserData{
    preventAdult: boolean,
    themeIsDark:boolean,
    region:CountryCode
}
export default function ProfileAndRegionSetComponent() {
  const [userData, setUserData] = useState<IuserData>({
    preventAdult:true,
    themeIsDark:true,
    region:"EG"
});
  async function  getLocationData(){
    try {
        // ask for permission to access the user's location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return null;
    }
  
    // get the user's current position (latitude and longitude)
    const { coords } = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({ latitude: coords.latitude, longitude: coords.longitude });
    const country = address[0].isoCountryCode as CountryCode;
    setUserData((prev)=>({...prev,region:country}))
    
    } catch (error) {
      console.log(error);
  
    }
   }
   const {themeData,setThemeData} = useContext(ThemeContext)
   const handleLightTheme = useCallback(()=>{
      setThemeData("light")
    },[])

  const  handleDarkTheme= useCallback(()=>{
    setThemeData("dark")

  },[])
  useEffect(()=>{getLocationData()},[])

  return (
    <>
      <View style={style.main}>
        <Text style={[globalStyle.title,themeData === "light"?{...textLightColorStyle}:{}]}>Profile settings</Text>
        <Text style={[{ ...globalStyle.smallerTitle, padding: 12 },themeData === "light"?{...textLightColorStyle}:{}]}>Region</Text>

        <DropdownComponent countryCode={userData.region}/>
        {/* prevent audlt content */}
        <View style={style.switchContainer}>
            <View style={{padding:6,width:"80%"}}>
                  <Text style={[{...globalStyle.text},themeData === "light"?{...textLightColorStyle}:{}]}>Don't allow for audlt content</Text>
                  <Text style={[{...globalStyle.subTitle},themeData === "light"?{...subTextLightColorStyle}:{}]}>This option is activated by default,it prevents to show audlt content</Text>
            </View>
          <Switch  value={userData.preventAdult} onValueChange={(val)=>{
            setUserData((prev)=>({...prev,preventAdult:val}))
          }}/>
        </View>
        {/* Dark mode */}

        <Text style={[{...globalStyle.smallerTitle},themeData === "light"?{...textLightColorStyle}:{}]}>Choose Theme</Text>
        <Text style={[globalStyle.subTitle,themeData === "light"?{...subTextLightColorStyle}:{}]}>You can change it at anytime.</Text>
        <View style={style.themeContainer}>
          <TouchableOpacity
            onPress={() => {
              handleLightTheme()
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
              handleDarkTheme()
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
        
          screensNumber={4}
        />
   
    
      </View>
      
    </>
  );
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    overflow:"hidden"
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
    width: Dimensions.get("screen").width * 0.35,
    
  },
  themeCard: {
    justifyContent: "flex-end",
    width: "100%",
    
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
    height: "44%",
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
