
import { TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { lightGrayColor, lightSubbackground, subBackGround } from '../../constants';
import CountryPicker, { Country, CountryCode, DARK_THEME, DEFAULT_THEME, TranslationLanguageCodeMap } from 'react-native-country-picker-modal'
import { useState } from 'react';
import { useContext } from 'react';
import ThemeContext from '../../context/theme_context';
import MainViewComponent from './main_view_component';
interface state{
    name?:string | TranslationLanguageCodeMap,
    flag?:string,
    countryCode?:CountryCode,
}
const DropdownComponent:React.FC<state> = (props)=>{
    const {themeData} = useContext(ThemeContext)
    const [currentRegion,setCurrentReagion] = useState<state>({flag:"",countryCode:props.countryCode})
    return(<>
            <MainViewComponent style={[style.mainContainer]}>

             <CountryPicker withAlphaFilter withCountryNameButton theme={themeData === "dark"?DARK_THEME:DEFAULT_THEME}  countryCode={currentRegion.countryCode} onSelect={(country:Country)=>{
                setCurrentReagion({ flag:country.flag,countryCode:country.cca2})}}/>
            </MainViewComponent>
    </>)
}

const style = StyleSheet.create({
    mainContainer:{
        borderColor:lightGrayColor,
        borderWidth:1,
        padding:12,
        borderRadius:12,
        
    }
})


export default DropdownComponent