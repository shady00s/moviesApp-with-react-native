
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import { lightGrayColor, subBackGround } from '../../constants';
import CountryPicker, { Country, CountryCode, DARK_THEME, TranslationLanguageCodeMap } from 'react-native-country-picker-modal'
import { useState } from 'react';
interface state{
    name?:string | TranslationLanguageCodeMap,
    flag?:string,
    countryCode?:CountryCode,
}
const DropdownComponent:React.FC<state> = (props)=>{
    const [currentRegion,setCurrentReagion] = useState<state>({name:"Egypt",flag:"",countryCode:props.countryCode})
    return(<>
            <View style={style.mainContainer}>

             <CountryPicker withAlphaFilter withCountryNameButton theme={DARK_THEME}  countryCode={currentRegion.countryCode} onSelect={(country:Country)=>{
                setCurrentReagion({name:country.name, flag:country.flag,countryCode:country.cca2})}}/>
            </View>
    </>)
}

const style = StyleSheet.create({
    mainContainer:{
        borderColor:lightGrayColor,
        borderWidth:1,
        padding:12,
        borderRadius:12,
        backgroundColor:subBackGround    
    }
})


export default DropdownComponent