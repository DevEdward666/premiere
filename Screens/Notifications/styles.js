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
    borderRadius: 10,
    elevation: 5,
    padding: 10,
  },
  author: {
    marginStart: 15,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
  },
  title: {
    marginStart: 15,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
  },
  body: {
    marginStart: 15,
    fontSize: 10,
    fontFamily: 'Open-Sans',
    maxHeight: height,
  },
});
export default styles;
