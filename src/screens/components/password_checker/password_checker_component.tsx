import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { View,UIManager, findNodeHandle , StyleSheet, Text, Dimensions, Easing, ScrollView, NativeModules, NativeEventEmitter } from "react-native";
import React from "react";
import { subBackGround } from "../../../constants";
import reducer from "./reducer";
import passwordValidationCallback from "./password_validator_callback";
import { Animated } from "react-native";
import ErrorTextComponent from "../error_text_component";

const width = Dimensions.get("screen").width;

const PasswordCheckerComponent: React.FC<Ipassword> = (props) => {
  const containerRef = useRef(new Animated.Value(0)).current
  const heightAnimation = useRef(new Animated.Value(0)).current
  const showDetailsheightAnimation = useRef(new Animated.Value(0)).current
  const [targetIndex, setTargetIndex] = useState(0)
  const [text, setText] = useState("very weak");
  const [color, setColor] = useState("red");
  const [powerStrengthStyle, setPowerStrengthStyle] = useState<string[]>([subBackGround, subBackGround, subBackGround, subBackGround, subBackGround]);
  const errorsRef = useRef(null)

  const [state, dispatch] = useReducer(reducer, []);


  useEffect(()=>{

    if (errorsRef.current) {
      errorsRef.current.measure((x, y, width, height) => {
        console.log('Component height:', height);
      });
    }

  },[props.password])
  useEffect(()=>{

    if(props.password !== ""){
      Animated.timing(heightAnimation,{
        useNativeDriver:false,
        toValue:!props.showDetails?Dimensions.get("screen").height * 0.05:250,
        duration:120
      }).start()

    }else{
      Animated.timing(heightAnimation,{
        useNativeDriver:false,
        toValue:0 ,
        duration:120
      }).start()
    }
  },[props.password,props.showDetails])

  useEffect(()=>{
    if(props.showDetails){
      Animated.timing(showDetailsheightAnimation,{
        useNativeDriver:false,
        toValue:1 ,
        duration:120
      }).start()

    }else{
      Animated.timing(showDetailsheightAnimation,{
        useNativeDriver:false,
        toValue:0 ,
        duration:80
      }).start()
    }
  },[props.showDetails])

  const containerStartAnimation = (color: string[]) => {
    Animated.timing(containerRef, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,

    })
      .start(() => {
        Animated.timing(containerRef, {
          toValue: 1,
          duration: 300,
          easing: Easing.inOut(Easing.ease),

          useNativeDriver: false,
        })
        const nextIndex = (targetIndex + 1) % powerStrengthStyle.length; // get the next color index
        setTargetIndex(nextIndex)
        setPowerStrengthStyle(color); // update color state after animation is finished
      });
  }

  const passwordValidator = useCallback(() => {
    passwordValidationCallback(props.password, state, dispatch)
  }, [props.password]);

  useEffect(() => {
    passwordValidator();

  }, [props.password])
  useEffect(() => {
    switch (state.length) {

      case 4:
        setText("Very weak!");
        setColor("red");
        containerStartAnimation([subBackGround, subBackGround, subBackGround, subBackGround])

        break;

      case 3:
        setText("weak");
        setColor("red");
        containerStartAnimation(["red", subBackGround, subBackGround, subBackGround])
        break;
      case 2:
        setText("Fair"), setColor("yellow");
        containerStartAnimation(["yellow", "yellow", subBackGround, subBackGround])

        break;
      case 1:
        setText("Strong"), setColor("green");
        containerStartAnimation(["green", "green", "green", subBackGround])

        break;
      case 0:
        setText("Very Strong"), setColor("lime");
        containerStartAnimation(["lime", "lime", "lime", "lime",])

        break;

      default:
        break;
    }


  }, [state]);
  return (
    <Animated.View
      style={[
       
           { ...style.mainContainer,height:heightAnimation },
      ]}
    >
      <View style={style.indecatorContainer}>
        <Animated.View
          style={[
            { ...style.checkerContainer,},
          ]}
        >

          {powerStrengthStyle.map((data, index) => (
            <Animated.View
              key={index}
              style={{
                ...style.containerInitStyle, backgroundColor: containerRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: [powerStrengthStyle[index], data],

                })
              }}
            ></Animated.View>
          ))}
        </Animated.View>
        <Text style={{ color, fontFamily: "normal" }}>{text}</Text>
      </View>
      <Animated.View  style={[{...style.errorTextContainer,opacity:showDetailsheightAnimation}]}>
        {state.map((data) => (
          <ErrorTextComponent key={data.id} error={data.errorText} color={data.errorColor} icon={data.errorColor === "red" ? "close-outline" : "warning-outline"} />
        ))}

      </Animated.View>
    </Animated.View>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    margin: 2,
    padding: 3,
    overflow:"scroll",
    width: "85%",
    flexDirection: "column",
    alignItems: "center",
  },
  hideContainer: {
    display: "none",
    padding: 0,
    margin: 0,
   
    width: 0,
  },
  indecatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerInitStyle: {
    height: 5,
    margin: 1,
    padding: 2,
    width: width * 0.12,
  },
  errorTextContainer: {
    overflow:"hidden",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  checkerContainer: {
    width: "80%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    padding: 5
  },
});

export default PasswordCheckerComponent
