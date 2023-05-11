import { ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Animated, Button, RegisteredStyle, ViewStyle } from "react-native";
import ThemeContext from "../../context/theme_context";
import { backgroundColor, whiteColor } from "../../constants";

interface ImainView {
  children: ReactNode;
    style:Object
}
export default function MainViewComponent({ children,style }: ImainView) {
  const { themeData,setThemeData } = useContext(ThemeContext);

  const animation = useRef(new Animated.Value(0)).current;
  
  useEffect(()=>{
        Animated.timing(animation, {
            useNativeDriver: false,
            duration: 200,
            toValue: themeData === "light"?0:1,
          }).start(()=>{ Animated.timing(animation, {
            useNativeDriver: false,
            duration: 200,
            toValue: themeData === "light"?1:0,
          }).start();});

  },[themeData])
  
  
  const themeAnimation = animation.interpolate({
     inputRange:[0,1],
     outputRange:[backgroundColor,whiteColor]
  })

 
  return (
        <>

          <Animated.View style={[{backgroundColor:
                 themeAnimation
            },style]}>{children}</Animated.View>
        </>
      );

  }

