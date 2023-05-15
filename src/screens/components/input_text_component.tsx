import React, { useContext, useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { backgroundColor, darkGrayColor, lightGrayColor, lightSubbackground, lightbackground, subBackGround, whiteColor } from "../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import MainViewComponent from "./main_view_component";
import ThemeContext from "../../context/theme_context";
import { textLightColorStyle } from "../register_screen/global_styles";
interface IinputText {
  placeholder: string;
  onChange: (data: string) => void;
  isPassword?:boolean;
  onBlur:()=>void
}

const InputTextComponent: React.FC<IinputText> = (props) => {
  const [showPass,setShowPass] = useState(props.isPassword)

  const {themeData} = useContext(ThemeContext)
  function handlePasswordVisibility(){
      setShowPass(!showPass)
  }
  return (
    <MainViewComponent newwhiteColor={lightbackground} newBlackColor={subBackGround} style={style.mainContainer}>
      <Ionicons
        style={{ color:themeData !== "light"? whiteColor:darkGrayColor, padding: 4, marginRight: 8 }}
        name={"pencil-outline"}
      />
      <TextInput
      onBlur={()=>{props.onBlur()}}
      autoCapitalize="none"
      secureTextEntry={showPass}
        onChangeText={props.onChange}
        style={[style.textInput,themeData === "light"? textLightColorStyle:{}]}
        placeholderTextColor={themeData === "light"? backgroundColor:whiteColor}
        placeholder={props.placeholder}
        
      />
      {props.isPassword? <TouchableOpacity onPress={handlePasswordVisibility}><Ionicons size={21} style={{ color: whiteColor, padding: 4, marginRight: 8 }}
      name={showPass?"eye-outline":"eye-off-outline"}/></TouchableOpacity>:null}
    </MainViewComponent>
    
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
  },
  textInput: {
    padding:4,
    flex:1,
    fontFamily:"medium",
    color:whiteColor
  },
});  

export default React.memo(InputTextComponent);
