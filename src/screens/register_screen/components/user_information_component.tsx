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
import React, { useEffect, useRef, useState } from "react";
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
const height = Dimensions.get("screen").height;
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
  const [inputError, setInputError] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const passwordConfirmChecker = () => {
    if (name !== name) {
      setInputError({ ...inputError, name: true });
    } else {
      setInputError({ ...inputError, name: false });
    }
  };
  return (
      <View style={{ flex: 1, flexDirection: "column" }}>
          <KeyboardAwareScrollView contentContainerStyle={{flexGrow:0.65}}>
      <Animated.View style={[style.titleContainer, { opacity: initAnimation }]}>
        <Text style={style.introText}>Complete your profile</Text>
        <Text style={style.introSubtext}>
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
            <InputTextComponent onChange={(data) => {}} placeholder="Name" />

            <InputTextComponent
              onChange={(data) => {
                setEmail(data);
              }}
              placeholder="Email"
            />
            <InputTextComponent
              onChange={(data) => {
                setPassword(data);
              }}
              placeholder="Password"
              isPassword
            />
            <PasswordCheckerComponent password={password} />
            <InputTextComponent
              isPassword
              onChange={(data) => {}}
              placeholder="Confirm password"
            />
          <View style={{justifyContent:"center", height: height * 0.1 }}>
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
    paddingTop: 9,
    paddingLeft:7,
    flexDirection: "row",
    width: "55%",

  },
  regText: {
    paddingRight: 4,
    color: whiteColor,
    fontFamily: "medium",
  },
  regButton: {
    fontFamily: "bold",
    color: yellowColor,
  },

  introText: {
    color: whiteColor,
    fontFamily: "bold",
    fontSize: 19,
  },
  introSubtext: {
    fontFamily: "normal",
    color: "rgba(162,162,162,0.6)",
    padding: 12,
  },
});
