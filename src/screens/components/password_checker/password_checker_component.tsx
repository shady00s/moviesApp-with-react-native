import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Easing, ScrollView } from "react-native";
import React from "react";
import { subBackGround } from "../../../constants";
import reducer from "./reducer";
import passwordValidationCallback from "./password_validator_callback";
import { Animated } from "react-native";
import ErrorTextComponent from "../error_text_component";

const width = Dimensions.get("screen").width;

const PasswordCheckerComponent: React.FC<Ipassword> = (props) => {
  const containerRef = useRef(new Animated.Value(0)).current
  const startPageAnimation = useRef(new Animated.Value(0)).current
  const [targetIndex, setTargetIndex] = useState(0)
  const [text, setText] = useState("very weak");
  const [color, setColor] = useState("red");
  const [powerStrengthStyle, setPowerStrengthStyle] = useState<string[]>([subBackGround, subBackGround, subBackGround, subBackGround, subBackGround]);


  const [state, dispatch] = useReducer(reducer, []);



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
    <View
      style={[
        props.password === ""
          ? { ...style.hideContainer }
          : { ...style.mainContainer },
      ]}
    >
      <View style={style.indecatorContainer}>
        <View
          style={[
            props.password === ""
              ? { ...style.hideContainer }
              : { ...style.checkerContainer },
          ]}
        >

         
          {powerStrengthStyle.map((data, index) => (
            <Animated.View
              key={index}
              style={{
                ...style.containerInitStyle, backgroundColor: containerRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: [data, powerStrengthStyle[targetIndex]],

                })
              }}
            ></Animated.View>
          ))}
        </View>
        <Text style={{ color, fontFamily: "normal" }}>{text}</Text>
      </View>
      <View style={[{...style.errorTextContainer,height:props.showDetails?"auto":0}]}>
        {state.map((data) => (
          <ErrorTextComponent key={data.id} error={data.errorText} color={data.errorColor} icon={data.errorColor === "red" ? "close-outline" : "warning-outline"} />
        ))}

      </View>
    </View>
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
    height: 0,
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
