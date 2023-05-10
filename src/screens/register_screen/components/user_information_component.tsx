import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Platform,
  Animated,KeyboardAvoidingView,
  Easing,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  backgroundColor,
  subBackGround,
  whiteColor,
  yellowColor,
} from "../../../constants";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputTextComponent from "../../components/input_text_component";
import { useNavigation } from "@react-navigation/native";
import { SelectImageComponent } from "./select_image_component";

import PasswordCheckerComponent from "../../components/password_checker/password_checker_component";
import StepperNavButton from "../../components/stepper/stepper_nav_button";
import ErrorTextComponent from "../../components/error_text_component";
import globalStyle from "../../components/global_styles";
const height = Dimensions.get("screen").height;


interface IinputError{
  name:boolean;
  password:boolean;
  email:boolean;
  confirmPassword:boolean
}
const UserIformationComponent: React.FC = () => {
  const initAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(initAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  const navigation = useNavigation<any>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passwordDetails,setPasswordDetails] = useState(false)
  
  const [inputError, setInputError] = useState<IinputError>({
    name:false,
    email:false,
    password:false,
    confirmPassword:false
  });
  
  const emailValidationChecker = useCallback(()=>{
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      console.log(emailRegExp.test(email));
    if(!emailRegExp.test(email)){
      setInputError((prevState)=>({ ...prevState, email: true }));

    }else{
      setInputError((prevState)=>({ ...prevState, email: false }));

    }
  },[email])
  const confirmPasswordChecker = useCallback(() => {
    if (confirmPassword !== password) {
      setInputError((prevState)=>({ ...prevState, confirmPassword: true }));
    } else {
      setInputError((prevState)=>({ ...prevState, confirmPassword: false }));
    }
  },[confirmPassword]);


  const nameValidationChecker = useCallback(()=>{
    // check for name and surname that every name length can be at least 2 and contain only *'* and *-*
    const nameRegExp = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
    if(name.length === 0){
      setInputError((prevState)=>({ ...prevState, name: true }));

    }
    else if (!nameRegExp.test(name)){
      setInputError((prevState)=>({ ...prevState, name: true }));

    }else{
      setInputError((prevState)=>({ ...prevState, name: false }));

    }
  },[name])
  return (
      <View style={{ flex: 1,height:"90%", flexDirection: "column" }}>
          <KeyboardAwareScrollView contentContainerStyle={{flexGrow:0.65}}>
      <Animated.View style={[style.titleContainer, { opacity: initAnimation }]}>
        <Text style={globalStyle.title}>Complete your profile</Text>
        <Text style={globalStyle.subTitle}>
          Add image for you, your name and set password for your profile.
        </Text>
      </Animated.View>
          {/* image picker */}
          <Animated.View
            style={{ height: height * 0.15,justifyContent:"center", opacity: initAnimation }}
          >
            <SelectImageComponent />
          </Animated.View>
          {/* input container */}
        
          <Animated.View
            style={{flex:0.6, opacity: initAnimation }}
          >
            <InputTextComponent onChange={(data) => {setName(data) } } placeholder="Name" onBlur={()=>{nameValidationChecker()}} />
            <View style={{height:inputError.name?
              "auto":0}}>
              <ErrorTextComponent error={name.length === 0 ?"Please type your name":"please check your name and the only allowed characters are ' _" }color="red" icon={"close-outline"}/>
            </View>
            <InputTextComponent
            onBlur={()=>{emailValidationChecker()}}
              onChange={(data) => {
                setEmail(data);
              }}
              placeholder="Email"
            />
            <View style={{height:inputError.email?
              "auto":0}}>
              <ErrorTextComponent error="Please check your email address" color="red" icon={"close-outline"}/>
            </View>
            <InputTextComponent
            onBlur={()=>{setPasswordDetails(true)}}
              onChange={(data) => {
                setPassword(data);
              }}
              placeholder="Password"
              isPassword
            />
            <PasswordCheckerComponent password={password} showDetails={passwordDetails} />
            <InputTextComponent
            onBlur={()=>{confirmPasswordChecker()}}
              isPassword
              onChange={(data) => {setConfirmPassword(data)}}
              placeholder="Confirm password"
            />
            <View style={{height:inputError.confirmPassword?
              "auto":0}}>
              <ErrorTextComponent error="Please check your email address" color="red" icon={"close-outline"}/>
            </View>
          <View style={{justifyContent:"center", height: height * 0.18 }}>
            <View style={style.registerContainer}>
              <Text style={style.regText}>Already have account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("login");
                }}
              >
                <Text style={style.regButton}>Login</Text>
              </TouchableOpacity>
            </View>
                  <View>
                  <StepperNavButton screensNumber={4} navToNextPage={true} isMiddle={false}/>

                  </View>
          </View>
          </Animated.View>
          


        </KeyboardAwareScrollView>
    </View>
  );
};

export default React.memo(UserIformationComponent);

const style = StyleSheet.create({
  titleContainer: {
    height: height * 0.15,
    justifyContent: "flex-end",
  },

  text: {
    fontFamily: "bold",
    fontSize: 31,
    color: whiteColor,
  },
  registerContainer: {
    justifyContent:"center",
    marginLeft:3,
    paddingTop: 9,
    paddingLeft:7,
    paddingRight:4,
    flexDirection: "row",
    width: "55%",

  },
  regText: {
    marginLeft:3,
    paddingRight: 4,
    color: whiteColor,
    fontFamily: "medium",
  },
  regButton: {
    fontFamily: "bold",
    color: yellowColor,
  },

  
});
