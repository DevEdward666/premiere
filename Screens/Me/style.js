import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 30,
  },
  viewstyle: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
  },
  userimagestyle: {
    marginTop: 10,
    marginStart: 10,
    width: 80,
    height: 80,
    borderRadius: 200 / 2,
    overflow: 'hidden',
    borderWidth: 3,
  },
  textstyle: {
    textAlign: 'left',
    marginStart: 10,
    fontSize: 14,
    alignContent: 'center',
  },
  footertext: {
    textAlign: 'center',
    marginStart: 10,
    fontSize: 14,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  iconstyle: {
    height: 50,
    width: '100%',
    resizeMode: 'center',
    alignContent: 'flex-start',
  },
  userplate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.4)',
    borderColor: 'rgba(255,255,355,0.4)',
    borderWidth: 0.1,
    borderRadius: 10,
  },
});

export default styles;
