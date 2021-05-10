import {StyleSheet,Dimensions} from 'react-native' 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
    },
    plate:{
      flex:1,
      backgroundColor:"rgba(255,255,355,0.4)",
      borderColor:"rgba(255,255,355,0.4)",
      borderWidth:0.1,
      borderRadius:30,
    },
    mainView:{
      flexDirection: 'row',
      height: 40,
      alignItems: 'center',
    },
    secondView:{
      width: '80%',
      height: 50,
      justifyContent: 'center',
    },
    txtTitle:{
      textAlign: 'left',
      marginStart: 10,
      fontSize: 14,
      alignContent: 'center',
    },
imageView:{
  width: '10%',
  height: 50,
  justifyContent: 'center',
},
imageStyle:{
  height: 50,
  width: '100%',
  resizeMode: 'center',
  alignContent: 'flex-start',
}
  });

  export default styles