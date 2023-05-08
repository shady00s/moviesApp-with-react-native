import { View, Image, TouchableOpacity, Dimensions } from "react-native";
import { StyleSheet } from "react-native";

interface IintroMoviesData {
  title: string;
  poster_path: string;
  selected: boolean;
  onSelection:()=>void;
}

const IntroSelectMovies: React.FC<IintroMoviesData> = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelection}>
      <View style={style.main}>
        <Image style={style.image} source={{ uri: props.poster_path }} />
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  main: {
    width: Dimensions.get("screen").width * 0.38,
    padding: 12,
    height: Dimensions.get("screen").height * 0.25,
    borderRadius: 21,
  },
  image: {
    padding:6,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 21,
  },
});
export default IntroSelectMovies;
