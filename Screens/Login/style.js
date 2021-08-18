import {StyleSheet,Dimensions} from 'react-native'

const styles = StyleSheet.create({
  footer:{ 
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
  },
  endFooter:{
    flex: 1,
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  endTextFooter:{
    textAlign: 'center',
    fontSize: 14,
    marginTop:50,
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#c4c0c0',
  },
    login: {
      marginTop: 10,
      paddingTop: 10,
      width: '70%',
      alignSelf: 'center',
      paddingBottom: 20,
      height: 50,
      backgroundColor: 'rgba(62, 178, 250, 0.8)',
      borderRadius: 20,
      borderWidth: 3,
      borderColor: 'rgba(62, 178, 250, 0.5)',
    },
    submitText: {
      color: 'black',
      textAlign: 'center',
    },
    InputContainer: {
      width: '100%',
      height: 50,
      marginBottom: 15,
    },
    container: {
      flex: 1,
      alignItems: 'center',
   
      width:Dimensions.width,
      maxHeight:Dimensions.height,
    },
    cardContainer:{
      flex:1,
      backgroundColor:"rgba(255,255,355,0.4)",
      width:"100%",
      height:"100%",
      borderColor:"rgba(255,255,355,0.4)",
      borderWidth:0.1,
      borderRadius:30
    },
    mainContainer:{
      flex: 1,
      width:Dimensions.width,
      maxHeight:Dimensions.height,
      backgroundColor:"white"
    },
    textInput: {
      flex: 1,
      borderRadius: 30,
      width: '100%',
    },
    buttonStyle: {
      flex: 1,
      borderRadius: 10,
      marginTop: 10,
      marginEnd: 30,
      width: '100%',
    },
 
    inputText: {
      color: 'black',
      fontWeight: 'normal',
      fontFamily: 'OpenSans',
      marginLeft: 5,
    },
    image: {
      margin: 50,
      width: '100%',
      maxHeight: 150,
    },
    textTitle: {
      fontFamily: 'Open-Sans',
      fontSize: 72,
      marginVertical: 10,
    },
    textTitle: {
      fontFamily: 'Open-Sans',
      fontSize: 30,
    },
  });

  export default styles