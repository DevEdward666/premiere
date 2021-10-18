import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
const windowHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    height: windowHeight,
  },
  plate: {
    backgroundColor: 'white',
    borderWidth: 0.1,
    elevation: 20,
    borderRadius: 10,
  },
  scrollapps: {
    marginTop: 50,
  },
});

export default styles;
