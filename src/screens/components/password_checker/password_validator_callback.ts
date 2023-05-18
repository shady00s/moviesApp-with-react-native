import { passwordHaveCapitalLetter, passwordHaveNumberValidator, passwordHaveSpecialCharacter, passwordLength, passwordRepeatedLetterTest } from "./password_validators";
import { passwordContainCapitalLetterTest, passwordContainNumberTest, passwordContainSymbolLetterTest, passwordLengthTest, passwordRepeatedLetter } from "./reducer";

export default  function passwordValidationCallback(password:string,state:IerrorData[],dispatch:React.Dispatch<Action>){
    // check if password contain number
    if(!passwordRepeatedLetterTest(password)){
      dispatch({type:"removeRepeatedLetter",payload:passwordRepeatedLetter.testType})
    }else{
      if (
        state.findIndex(
          (data) => data.errorType === passwordRepeatedLetter.testType
        ) === -1
      ) {
        dispatch({
          type:"repeatedLetter",
          payload: {
            id: Math.random(),
            errorType: passwordRepeatedLetter.testType,
            errorText: "It's better to not add repeated letters in password",
            errorColor: "yellow",
          },
        });
      }
    }
    if (passwordHaveNumberValidator(password)) {
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

    if (passwordHaveSpecialCharacter(password)) {
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
    if (passwordHaveCapitalLetter(password)) {
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
    if (passwordLength(password)) {
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
            errorText: "Password must contain at least eight characters.",
            errorColor: "red",
          },
        });
      }
    }
  }