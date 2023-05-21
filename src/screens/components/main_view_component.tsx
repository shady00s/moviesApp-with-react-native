import { ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Animated, Button, RegisteredStyle, ViewStyle } from "react-native";
import ThemeContext from "../../context/theme_context";
import { backgroundColor, whiteColor } from "../../constants";

interface ImainView {
  children: ReactNode;
    style:Object;
    newwhiteColor?:string;
    newBlackColor?:string
}
export default function MainViewComponent({ children,style,newwhiteColor,newBlackColor }: ImainView) {
  const { themeData,setThemeData } = useContext(ThemeContext);

  const animation = useRef(new Animated.Value(0)).current;
  
  useEffect(()=>{
    if(themeData === "dark"){
      Animated.timing(animation, {
        useNativeDriver: false,
        duration: 100,
        toValue: 0,
      }).start();

    }else{
      Animated.timing(animation, {
        useNativeDriver: false,
        duration: 100,
        toValue: 0,
      }).start(()=>{ Animated.timing(animation, {
        useNativeDriver: false,
        duration: 100,
        toValue: 1
      }).start();});

    }
        
  },[themeData])
  
  
  const themeAnimation = animation.interpolate({
     inputRange:[0,1],
     outputRange:[newBlackColor?newBlackColor:backgroundColor,newwhiteColor ? newwhiteColor : whiteColor]
  })

 
  return (
        <>

          <Animated.View style={[{backgroundColor:
                 themeAnimation
            },style]}>{children}</Animated.View>
        </>
      );

  }

