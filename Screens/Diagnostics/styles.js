import {StyleSheet,Dimensions} from 'react-native'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: 30 + '%',
    },
    text: {
      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',
      width: '100%',
      alignContent: 'center',
      textAlign: 'center',
      backgroundColor: '#fafafaa0',
    },
    //   textInput: {
    //     borderWidth: 1, // size/width of the border
    //     borderColor: 'lightgrey', // color of the border
    //     paddingLeft: 10,
    //     height: 75,
    //   },
    maincontainer:{
        flex:1,
        marginTop:50
    },
    avatar: {
      width: 180,
      height: 180,
      borderColor: 'white',
      alignSelf: 'center',
      resizeMode: 'cover',
      flex: 1,
    },
    spinnerTextStyle: {
      color: '#FFF',
    },
    PickerContainer: {
      flex: 1,
      width: '100%',
      padding: 30,
      height: 70,
    },
    Inputcontainer: {
      flex: 0.1,
      padding: 30,
      width: '100%',
    },
    plate:{
      flex:1,
      backgroundColor:"rgba(255,255,355,0.4)",
      borderColor:"rgba(255,255,355,0.4)",
      borderWidth:0.1,
      borderRadius:30,
      
      height:Dimensions.height
    },
    imagecontainer: {
      flex: 1,
      padding: 30,
      width: '100%',
      height: 220,
      alignItems: 'center',
      justifyContent: 'center',
    },
    flatlistcontainer: {
      paddingTop: 22,
    },
    flatlistitem: {
      padding: 10,
      fontWeight: 'bold',
      fontSize: 14,
      height: 80,
    },
  });

  export default styles