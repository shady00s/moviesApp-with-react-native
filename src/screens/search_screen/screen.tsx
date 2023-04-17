import React,{useEffect} from 'react'
import { View,StyleSheet,Text } from 'react-native'
import { backgroundColor } from '../../constants'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
interface Props {
    navigation: StackNavigationProp<any>;
    route: RouteProp<any>;
  }
export default function SearchScreen({route,navigation}:Props){
    const searchTarget = route.params.targetedName
    useEffect(() => {
      
        navigation.setOptions({
            headerTitle:"Search for "+searchTarget
        })
      return () => {
       
      }
    }, [searchTarget])
    
    return(<>
        <View style={style.container}>
            <Text>{route.params.targetedName}</Text>
        </View>
        
        </>)
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:backgroundColor
    }
})