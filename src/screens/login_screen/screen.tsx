import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { backgroundColor, lightGrayColor, whiteColor, yellowColor } from "../../constants";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
interface foucs {
  isFirstInputFoucsed: boolean;
  isSecondInputFoucsed: boolean;
}

export default function LoginScreen() {
  const navigator = useNavigation<any>()
  const [focused, setFoucsed] = useState<foucs>({
    isFirstInputFoucsed: false,
    isSecondInputFoucsed: false,
  });
  const [showPassword,setShowPassword]=useState<boolean>(true)
  return (
    <>
      <View style={style.mainContainer}>
        <View style={style.container}>
          <Text style={style.title}>Login</Text>
          <View style={{justifyContent:'center',alignItems:"center"}}>
          <TextInput
            onFocus={() => {
              setFoucsed({
                isFirstInputFoucsed: true,
                isSecondInputFoucsed: false,
              });
            }}
            onBlur={() => {
              setFoucsed({
                isFirstInputFoucsed: false,
                isSecondInputFoucsed: false,
              });
            }}
            style={[
              { ...style.textInput},
              focused.isFirstInputFoucsed ? { ...style.focusedInput } : {},
            ]}
            placeholder="Email"
          />
          <View style={[{...style.passwordContainer}, focused.isSecondInputFoucsed ? { ...style.focusedInput } : {},]}>
            {/* password input */}
            <TextInput
              secureTextEntry={showPassword}
                onFocus={() => {
                setFoucsed({
                    isFirstInputFoucsed: false,
                    isSecondInputFoucsed: true,
                });
                }}
                onBlur={() => {
                setFoucsed({
                    isFirstInputFoucsed: false,
                    isSecondInputFoucsed: false,
                });
                }}
                style={style.passwordInput}
                placeholder="Password"
            />
            <TouchableOpacity onPress={()=>{
              setShowPassword(!showPassword)
            }}>
              <Ionicons name={showPassword?"eye-outline":"eye-off-outline"} size={32} color={lightGrayColor} />

            </TouchableOpacity>
          </View>

        </View>
        {/* forgot password */}
              <TouchableOpacity style={style.forgetPass}>
                <Text style={style.textStyle}>Forget password?</Text>
              </TouchableOpacity>
              {/* login button */}
              <TouchableOpacity style={style.loginButton}>
                <Text style={style.loginText}>Login</Text>
              </TouchableOpacity>
              {/* register option */}
              <View style={style.regContainer}>
                <Text style={style.textStyle}>Don't have account? </Text>
                <TouchableOpacity onPress={()=>{
                  navigator.navigate("register")
                }}>
                  <Text style={style.regText}>Register</Text>
                </TouchableOpacity>
              </View>

          </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: whiteColor,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
    width: "100%",
    flexDirection: "column",
  },
  title: {
    fontFamily: "bold",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
  },
  textInput: {
    width:"100%",
    margin: 9,
    padding: 15,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: lightGrayColor,
  },
  passwordInput:{
    width:"70%" ,
    marginLeft:0,
    margin:5,
    paddingRight:5,
    paddingVertical:9 ,borderWidth:0 
  },

  focusedInput: {
    borderWidth: 1.4,
    borderColor: yellowColor,
  },
  passwordContainer:{
    borderColor: lightGrayColor,
    borderWidth: 0.5,
    borderRadius: 12,
    width:"100%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-evenly",
  },
  forgetPass:{
    top:8,
    position:"relative",
    right:"-70%",
    transform:[{translateX:-50}],
    margin:12,
    marginBottom:32
  },
  loginButton:{
    width:"100%",
    borderRadius:12,
    padding:12,
    backgroundColor:backgroundColor,
    justifyContent:"center",
    alignItems:"center"
  },
  loginText:{
    color:whiteColor,
    fontFamily:"bold"
  }, 
  textStyle:{
    fontFamily:"bold",
    color:"rgba(133,133,133,0.9)"
  },
  regContainer:{
    marginTop:33,
    flexDirection:"row",
    alignItems:"center"
    ,justifyContent:"flex-start"
  },
  regText:{
    color:backgroundColor,
    fontFamily:"bold",
    marginLeft:9
  }
});
