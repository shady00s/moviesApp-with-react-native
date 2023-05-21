import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Easing,
  Animated,
} from "react-native";
import React from "react";
import { subBackGround } from "../../../constants";
import reducer from "./reducer";
import passwordValidationCallback from "./password_validator_callback";
import ErrorTextComponent from "../error_text_component";

const width = Dimensions.get("screen").width;

const containerRef = new Animated.Value(0); // Move outside the component

const PasswordCheckerComponent: React.FC<Ipassword> = (props) => {
  const heightAnimation = useRef(new Animated.Value(0)).current;
  const hideAnimation = useRef(new Animated.Value(0)).current;
  const showDetailsheightAnimation = useRef(new Animated.Value(0)).current;
  const [targetIndex, setTargetIndex] = useState(0);
  const [text, setText] = useState("very weak");
  const [color, setColor] = useState("red");
  const [powerStrengthStyle, setPowerStrengthStyle] = useState([
    subBackGround,
    subBackGround,
    subBackGround,
    subBackGround,
  ]);

  const [state, dispatch] = useReducer(reducer, []);


  useEffect(() => {
    if (props.password.length !== 0) {
      Animated.timing(heightAnimation, {
        toValue: state.length !==0?((Dimensions.get("screen").height *0.07 * state.length)+15):45,
        duration: 130,
        useNativeDriver:false
      }).start();
      Animated.timing(hideAnimation, {
        toValue: state.length !==0?((Dimensions.get("screen").height *0.07 * state.length)+15):45,
        duration: 1,
        useNativeDriver:false
      }).start();
    } else {
      Animated.timing(heightAnimation, {
        toValue: 0,
        duration: 120,
        useNativeDriver:false

      }).start();
      Animated.timing(hideAnimation, {
        toValue: 0,
        duration: 120,
        useNativeDriver:false

      }).start();
    }
  }, [state]);

  useEffect(() => {
    if (props.showDetails || state.length !== 0) {
      Animated.timing(showDetailsheightAnimation, {
        toValue:1,
        duration: 120,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver:false
      }).start();
    } else {
      Animated.timing(showDetailsheightAnimation, {
        toValue: 0,
        duration: 120,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver:false
      }).start();
    }
  }, [props.showDetails,state]);

  const containerStartAnimation = useCallback((color) => {
    const nextIndex = (targetIndex + 1) % powerStrengthStyle.length; // get the next color index
    setTargetIndex(nextIndex);
    Animated.timing(containerRef, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(containerRef, {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start(()=>{
        setPowerStrengthStyle(color); // update color state after animation is finished

      });
    });

  },[state]);

  const passwordValidator = useCallback(() => {
    passwordValidationCallback(props.password, state, dispatch);
  }, [props.password]);

  useEffect(() => {
    passwordValidator();
  }, [props.password]);

  useEffect(() => {
    switch (state.length) {
      case 4:
        setText("Very weak!");
        setColor("red");
        containerStartAnimation([
          subBackGround,
          subBackGround,
          subBackGround,
          subBackGround,
        ]);
        break;
      case 3:
        setText("weak");
        setColor("red");
        containerStartAnimation(["red", subBackGround, subBackGround, subBackGround]);
        break;
      case 2:
        setText("Fair");
        setColor("yellow");
        containerStartAnimation(["yellow", "yellow", subBackGround, subBackGround]);
        break;
      case 1:
        setText("Strong");
        setColor("green");
        containerStartAnimation(["green", "green", "green", subBackGround]);
        break;
      case 0:
        setText("Very Strong");
        setColor("lime");
        containerStartAnimation(["lime", "lime", "lime", "lime"]);
        break;
      default:
        break;
    }
  }, [state]);

  return (
    <Animated.View
      style={[
        style.mainContainer,
        { height: heightAnimation,opacity:hideAnimation },
      ]}
    >
      <View style={style.indicatorContainer}>
        <Animated.View style={{...style.checkerContainer}}>
          {powerStrengthStyle.map((data, index) => (
            <Animated.View
              key={index}
              style={{
                ...style.containerInitStyle,
                backgroundColor: containerRef.interpolate({
                  inputRange: [0, 1,2],
                  outputRange: [!powerStrengthStyle[index+1]?powerStrengthStyle[index]:powerStrengthStyle[index+1], data,!powerStrengthStyle[index-1]?powerStrengthStyle[index]:powerStrengthStyle[index-1]],
                }),
              }}
            ></Animated.View>
          ))}
        </Animated.View>
        <Text style={{ color, fontFamily: "normal" }}>{text}</Text>
      </View>
      <Animated.View style={[style.errorTextContainer, { opacity: showDetailsheightAnimation }]}>
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
    overflow: "scroll",
    width: "90%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:"center"
  },
  hideContainer: {
    display: "none",
    padding: 0,
    margin: 0,
    width: 0,
  },
  indicatorContainer: {
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
    overflow: "hidden",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  checkerContainer: {
    width: "80%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    padding: 5,
  },
});

export default PasswordCheckerComponent;