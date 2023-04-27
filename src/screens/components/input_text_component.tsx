import React, { useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { subBackGround, whiteColor } from "../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
interface IinputText {
  placeholder: string;
  onChange: (data: string) => void;
  isPassword?:boolean
}

const InputTextComponent: React.FC<IinputText> = (props) => {
  const [showPass,setShowPass] = useState(props.isPassword)
  const [passIcon,setPassIcon] = useState("eye-outline")
  function handlePasswordVisibility(){
      setShowPass(!showPass)
  }
  return (
    <View style={style.mainContainer}>
      <Ionicons
        style={{ color: whiteColor, padding: 4, marginRight: 8 }}
        name={"pencil-outline"}
      />
      <TextInput
      autoCapitalize="none"
      secureTextEntry={showPass}
        onChangeText={props.onChange}
        style={style.textInput}
        placeholderTextColor={whiteColor}
        placeholder={props.placeholder}
      />
      {props.isPassword? <TouchableOpacity onPress={handlePasswordVisibility}><Ionicons size={21} style={{ color: whiteColor, padding: 4, marginRight: 8 }}
      name={showPass?"eye-outline":"eye-off-outline"}/></TouchableOpacity>:null}
    </View>
    
  );
};
const style = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,

    flexDirection: "row",
   alignItems:"center",
    width: "90%",
    padding: 8,
    borderRadius: 12,
    backgroundColor: subBackGround,
  },
  textInput: {
    flex:1,
    color: whiteColor,
  },
});  

export default InputTextComponent;
