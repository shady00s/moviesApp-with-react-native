import { useCallback, useEffect, useReducer, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import React from "react";
import { subBackGround } from "../../constants";
import { passwordHaveCapitalLetter,passwordHaveNumberValidator,passwordHaveSpecialCharacter,passwordLength } from "./password_validators";
interface Ipassword {
  password: string;
}
interface Ierror {
  errorColor: string;
  errorIndex: number;
}
interface IerrorData {
  errorType: string;
  errorColor: string;
  errorText: string;
  id: number;
}
interface IpasswordDgree {
  testType: string;
}

type Action =
  | { type: "removeLength"; payload: string }
  | { type: "length"; payload: IerrorData }
  | { type: "capitalLetter"; payload: IerrorData }
  | { type: "removeCapitalLetter"; payload: string }
  | { type: "number"; payload: IerrorData }
  | { type: "RemoveNumber"; payload: string }
  | { type: "symbol"; payload: IerrorData }
  | { type: "removeSymbol"; payload: string };

const reducer = (state: IerrorData[], action: Action): IerrorData[] => {
  switch (action.type) {
    case "length":
      return [...state, action.payload];
    case "removeLength":
      return state.filter((data) => data.errorType !== action.payload);

    case "capitalLetter":
      return [...state, action.payload];
    case "removeCapitalLetter":
      return state.filter((data) => data.errorType !== action.payload);

    case "symbol":
      return [...state, action.payload];
    case "removeSymbol":
      return state.filter((data) => data.errorType !== action.payload);

    case "number":
      return [...state, action.payload];
    case "RemoveNumber":
      return state.filter((data) => data.errorType !== action.payload);

    default:
      break;
  }
};

const initialColors = [];
const width = Dimensions.get("screen").width;
const PasswordCheckerComponent: React.FC<Ipassword> = (props) => {
  const [text, setText] = useState("very weak");
  const [color, setColor] = useState("red");
  const [errors, setErrors] = useState<IerrorData[]>([]);
  const [powerStrengthStyle, setPowerStrengthStyle] = useState(initialColors);

  const passwordLengthTest: IpasswordDgree = {
    testType: "length",
  };
  const passwordContainCapitalLetterTest: IpasswordDgree = {
    testType: "capitalType",
  };
  const passwordContainNumberTest: IpasswordDgree = {
    testType: "numberType",
  };
  const passwordContainSymbolLetterTest: IpasswordDgree = {
    testType: "symbol",
  };

  const [state, dispatch] = useReducer(reducer, []);

  const passwordValidator = useCallback(() => {
    // check if password contain number
    if (passwordHaveNumberValidator(props.password)) {
      dispatch({
        type: "RemoveNumber",
        payload: passwordContainNumberTest.testType,
      });
    } else {
      if (
        state.findIndex(
          (data) => data.errorType === passwordContainNumberTest.testType
        ) === -1
      ) {
        dispatch({
          type: "number",
          payload: {
            id: Math.random(),
            errorType: passwordContainNumberTest.testType,
            errorText: "Password length must contain at least one number.",
            errorColor: "red",
          },
        });
      }
    }
    // check if password contain special character

    if (passwordHaveSpecialCharacter(props.password)) {
      dispatch({
        type: "removeSymbol",
        payload: passwordContainSymbolLetterTest.testType,
      });
    } else {
      if (
        state.findIndex(
          (data) => data.errorType === passwordContainSymbolLetterTest.testType
        ) === -1
      ) {
        dispatch({
          type: "symbol",
          payload: {
            id: Math.random(),
            errorType: passwordContainSymbolLetterTest.testType,
            errorText: "Password must contain at least one special character.",
            errorColor: "red",
          },
        });
      }
    }

    // check if password contain capital letter
    if (passwordHaveCapitalLetter(props.password)) {
      dispatch({
        type: "removeCapitalLetter",
        payload: passwordContainCapitalLetterTest.testType,
      });
    } else {
      if (
        state.findIndex(
          (data) => data.errorType === passwordContainCapitalLetterTest.testType
        ) === -1
      ) {
        dispatch({
          type: "capitalLetter",
          payload: {
            id: Math.random(),
            errorType: passwordContainCapitalLetterTest.testType,
            errorText: "Password must contain at least one capital letter.",
            errorColor: "red",
          },
        });
      }
    }
    // check for password length
    if (passwordLength(props.password)) {
      dispatch({ type: "removeLength", payload: passwordLengthTest.testType });
    } else {
      if (
        state.findIndex(
          (data) => data.errorType === passwordLengthTest.testType
        ) === -1
      ) {
        dispatch({
          type: "length",
          payload: {
            id: Math.random(),
            errorType: passwordLengthTest.testType,
            errorText: "Password must contain at least 8 characters.",
            errorColor: "red",
          },
        });
      }
    }
  }, [props.password]);

  useEffect(() => {
    passwordValidator();

    switch (state.length) {
      case 4:
        setText("Very weak!");
        setColor("red");
        break;
      case 3:
        setText("weak"), setColor("orange");
        break;
      case 2:
        setText("Fair"), setColor("yellow");
        break;
      case 1:
        setText("Strong"), setColor("green");
        break;
      case 0:
        setText("Very Strong"), setColor("lime");
        break;

      default:
        break;
    }
  }, [props.password]);
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
            <View
              key={index}
              style={{ ...style.containerInitStyle, backgroundColor: data }}
            ></View>
          ))}
        </View>
        <Text style={{ color, fontFamily: "normal" }}>{text}</Text>
      </View>
      {state.map((data) => (
        <Text key={data.id} style={style.errorText}>
          {data.errorText}
        </Text>
      ))}
    </View>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    margin: 2,
    padding: 3,
    height: "auto",
    width: "85%",
    flexDirection: "column",
    overflow: "hidden",
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

  checkerContainer: {
    width: "80%",
    height: "80%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "orange",
  },
});
export default PasswordCheckerComponent;
function passwordHaveNumberValidator(password: string) {
  throw new Error("Function not implemented.");
}

function passwordHaveSpecialCharacter() {
  throw new Error("Function not implemented.");
}

function passwordHaveCapitalLetter() {
  throw new Error("Function not implemented.");
}

