import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated, 
} from "react-native";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import ThemeContext from "../../../context/theme_context";
import { subTextLightColorStyle, textLightColorStyle } from "../global_styles";
import axiosInstance from "../../../instance";
import StorageManagerHandeler from "../../../utils/storage_manager";
const height = Dimensions.get("screen").height;


interface IinputError {
  name: boolean;
  password: boolean;
  email: boolean;
  usedEmail: boolean;
  confirmPassword: boolean,
  noImage: boolean
}
const UserIformationComponent: React.FC = () => {
  const initAnimation = useRef(new Animated.Value(0)).current;
  const nameheightAnimation = useRef(new Animated.Value(0)).current;
  const emailheightAnimation = useRef(new Animated.Value(0)).current;
  const confirmPassheightAnimation = useRef(new Animated.Value(0)).current;
  const { themeData } = useContext(ThemeContext)

  const navigation = useNavigation<any>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [userData,setUserData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const [passwordDetails, setPasswordDetails] = useState(false)

  const [inputError, setInputError] = useState<IinputError>({
    name: false,
    email: false,
    usedEmail: false,
    password: false,
    confirmPassword: false,
    noImage: true
  });
  const [passToNextPage, setPassToNextPage] = useState(false)

  const checkForEmailExistance = useCallback(async () => {

  await  axiosInstance.get('/email-existance', {
      params: {
        email: email
      }
    }).then(response => {

      if (response.status === 200) {
        setInputError((prev) => ({ ...prev, usedEmail: false }))
      }
    }).catch(err=>{
      setInputError((prev) => ({ ...prev, usedEmail: true }))

    })
  }, [email])
  const emailValidationChecker = useCallback(async () => {
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegExp.test(email)) {
      setInputError((prevState) => ({ ...prevState, email: true }));

    } else {
      setInputError((prevState) => ({ ...prevState, email: false }));
      await checkForEmailExistance()
    }
  }, [email])
  const confirmPasswordChecker = useCallback(() => {
    if (confirmPassword !== password) {
      setInputError((prevState) => ({ ...prevState, confirmPassword: true }));
    } else {
      setInputError((prevState) => ({ ...prevState, confirmPassword: false }));
    }
  }, [confirmPassword]);


  const nameValidationChecker = useCallback(() => {
    // check for name and surname that every name length can be at least 2 and contain only *'* and *-*
    const nameRegExp = /^([a-zA-Z'_\s]{2,})/g
    if (name.length === 0 ) {
      setInputError((prevState) => ({ ...prevState, name: true }));

    }if(!nameRegExp.test(name)){
      setInputError((prevState) => ({ ...prevState, name: true }));
    }
    else {
      setInputError((prevState) => ({ ...prevState, name: false }));

    }
  }, [name])
  useEffect(() => {
    Animated.timing(initAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);


  useEffect(()=>{
    let data = JSON.stringify(userData)
    StorageManagerHandeler.setPageData("userData",data)
  },[userData])

  useEffect(() => {
    if (inputError.email === false && inputError.name === false && inputError.noImage === false && inputError.password === false) {
      setPassToNextPage(true)
    } else {
      setPassToNextPage(false)
     
    }
    if(inputError.name ===true){
      Animated.timing(nameheightAnimation,{
        useNativeDriver:false,
        toValue:Dimensions.get("screen").height * 0.07,
        duration:120
      }).start();
    }else{
      Animated.timing(nameheightAnimation,{
        useNativeDriver:false,
        toValue:0,
        duration:120
      }).start();
    }
    if (inputError.email || inputError.usedEmail) {
      Animated.timing(emailheightAnimation,{
        useNativeDriver:false,
        toValue:Dimensions.get("screen").height * 0.06,
        duration:120
      }).start();
    }else{
      Animated.timing(emailheightAnimation,{
        useNativeDriver:false,
        toValue:0,
        duration:120
      }).start();
    }

    if (inputError.confirmPassword) {
      Animated.timing(confirmPassheightAnimation,{
        useNativeDriver:false,
        toValue:Dimensions.get("screen").height * 0.06,
        duration:120
      }).start();
    }else{
      Animated.timing(confirmPassheightAnimation,{
        useNativeDriver:false,
        toValue:0,
        duration:120
      }).start();
    }

    }, [inputError])

    

 
  return (
<Animated.View>
    <View style={{flex:0.8}}>
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 0.8 }}>
      <Animated.View style={[style.titleContainer, { opacity: initAnimation }]}>
        <Text style={[globalStyle.title, themeData === "light" ? textLightColorStyle : {}]}>Complete your profile</Text>
        <Text style={[globalStyle.subTitle, themeData === "light" ? subTextLightColorStyle : {}]}>
          Add image for you, your name and set password for your profile.
        </Text>
      </Animated.View>
      {/* image picker */}
      <Animated.View
        style={{ justifyContent: "center", opacity: initAnimation }}
      >
        <SelectImageComponent getImageData={function (data: string): void {
       
          setInputError((prevState) => ({ ...prevState, noImage: false }))
        }} />
      </Animated.View>
      {/* input container */}

      <Animated.View
        style={{ opacity: initAnimation }}
      >
        <InputTextComponent onChange={(data) => { 
          setName(data)
           setUserData((prev)=>({...prev,name:data}))
          }} placeholder="Name" onBlur={() => { nameValidationChecker() }} />
        <Animated.View style={{
          height: 
            nameheightAnimation 
        }}>
          <ErrorTextComponent error={name.length === 0 ? "Please type your name" : "please check your name and the only allowed characters are ' _"} color="red" icon={"close-outline"} />
        </Animated.View>
        <InputTextComponent
          onBlur={() => {
            emailValidationChecker()

          }}
          onChange={(data) => {
            setEmail(data);
            setUserData((prev)=>({...prev,email:data}))

          }}
          placeholder="Email"
        />
        <Animated.View style={{
          height:
          emailheightAnimation 
        }}>
          <ErrorTextComponent error={inputError.usedEmail?"This email is already used": "Please check your email address" }color="red" icon={"close-outline"} />
        </Animated.View>
        <InputTextComponent
          onBlur={() => {
            setPasswordDetails(true)
          
        
        }}

          onChange={(data) => {
            setPassword(data);
            setUserData((prev)=>({...prev,password:data}))

          }}
          placeholder="Password"
          isPassword
        />
        <PasswordCheckerComponent password={password} showDetails={passwordDetails} />
        <InputTextComponent
          onBlur={() => { confirmPasswordChecker() }}
          isPassword
          onChange={(data) => { 
            setConfirmPassword(data) 
            setUserData((prev)=>({...prev,confirmPassword:data}))

          
          }}
          placeholder="Confirm password"
        />
        <Animated.View style={{
          height:
          confirmPassheightAnimation 
        }}>
          <ErrorTextComponent error="Please check your email address" color="red" icon={"close-outline"} />
        </Animated.View>
        <View>
          <View style={style.registerContainer}>
            <Text style={[style.regText, themeData === "light" ? textLightColorStyle : {}]}>Already have account?</Text>
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
    <View style={{flex:0.1}}>

      <StepperNavButton isMiddle={false} navToNextPage={true} screensNumber={4} onNext={async function (): Promise<void> {
        console.log(passToNextPage);
        
        if(!passToNextPage){
         await emailValidationChecker()
          confirmPasswordChecker()
          setPasswordDetails(()=>true)
          nameValidationChecker()
         }

        } } />
    </View>



</Animated.View>
  );
};

const style = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 21,
    paddingVertical: 18,
    justifyContent: "flex-end",
  },

  text: {
    fontFamily: "bold",
    fontSize: 31,
    color: whiteColor,
  },
  registerContainer: {
    alignItems: "center",
    justifyContent: "center",

    paddingRight: 4,
    flexDirection: "row",
    width: "80%",
    height: 41

  },
  regText: {
    marginLeft: 3,
    paddingRight: 4,
    color: whiteColor,
    fontFamily: "medium",
  },
  regButton: {
    fontFamily: "bold",
    color: yellowColor,
  },


});
export default React.memo(UserIformationComponent);


