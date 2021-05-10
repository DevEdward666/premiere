import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    width: width,
  },
  cardresultlist: {
    width: width - 20,
    padding: 10,
    backgroundColor:"rgba(255,255,355,0.5)",
    borderColor:"rgba(255,255,355,0.5)",
    borderWidth:0.1,
    borderRadius:10
  },
  author: {
    marginStart: 15,
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: "SFUIDisplay-Bold",
   textAlign:"right"
  },
  title: {
    marginStart: 15,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: "SFUIDisplay-Light",
  },
  body: {
    marginStart: 15,
    fontSize: 12,
    fontFamily: "SFUIDisplay-Light",
    maxHeight: height,
  },
});
export default styles;
