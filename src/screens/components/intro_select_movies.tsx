import { View ,Image} from "react-native"
import { imagePath } from "../../constans"
import { StyleSheet } from "react-native"

interface IintroMoviesData{
    title:string,
    poster_path:string,
    selected:boolean
}

const IntroSelectMovies:React.FC<IintroMoviesData> = (props)=>{

    return (
    <View style={style.main}>

        <Image style={style.image} source={{uri:imagePath+props.poster_path}}/>
    </View>
    )
}

 const style = StyleSheet.create({
    main:{
        width:"45%",
        padding:4,
        height:"45%"

    },
    image:{
        width:"100%",
        resizeMode:"contain" 
    }
 })
export default IntroSelectMovies