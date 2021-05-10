import {StyleSheet,Dimensions} from 'react-native'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    spinnerTextStyle: {
      color: '#FFF',
    },
    plate:{
      flex:1,
      backgroundColor:"rgba(255,255,355,0.4)",
      borderColor:"rgba(255,255,355,0.4)",
      borderWidth:0.1,
      borderRadius:30,
      
      height:Dimensions.height
    },
    flatlistcontainer: {
      backgroundColor: '#fafafa',
      flex: 1,
      paddingTop: 10,
      marginTop:50
    },
    flatlistitem: {
      marginStart: 30,
      fontSize: 14,
      fontFamily: 'Open-Sans',
      height: 30,
    },
    flatlistitemappointmentno: {
      marginStart: 30,
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'Open-Sans',
      height: 30,
    },
  });

  export default styles