import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    header: {
    
      height: 100,
    },
    maincontainer: {
      marginTop: 10,
     
    },
  container:{
    marginTop:"7%",
  },
    avatar: {
      width: 180,
      height: 180,
      borderRadius: 120,
      borderWidth: 4,
      borderColor: 'white',
      marginBottom: 10,
      alignSelf: 'center',
      position: 'absolute',
      marginTop: 10,
    },
    docs: {
      margin: 10,
      width: '80%',
      height: 500,
      //borderColor: 'white',
      alignSelf: 'center',
      resizeMode: 'contain',
      // position: 'absolute',
    },
  
    body: {
      marginTop: 40,
    },
    bodyContent: {
      width:"70%",
      flexDirection: 'column',
      alignItems: 'flex-start',
  },
    bodyTitle: {
        width:"30%",
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    mainbody:{
        flex: 1,
        width:"100%",
        flexDirection: 'row',
    },
    body2: {
      marginTop: 80,
    },
    bodyContent2: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    name: {
      fontSize: 16,
      color: '#696969',
      fontWeight: '600',
    },
    info: {
      fontSize: 16,
      color: '#1dc259',
      marginTop: 10,
    },
    description: {
      fontSize: 16,
      color: '#696969',
      marginTop: 10,
      textAlign: 'center',
    },
    details: {
      fontSize: 12,
      color: '#696969',
      marginTop: 10,
      width:"100%",
      textAlign: 'justify',
    },
    buttonContainer: {
      marginTop: 10,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      width: 250,
      borderRadius: 30,
      backgroundColor: '#00BFFF',
    },
    userplate:{
        flex:1,
        backgroundColor:"rgba(255,255,355,0.4)",
        borderColor:"rgba(255,255,355,0.4)",
        borderWidth:0.1,
        borderRadius:30
      },
  });

  export default styles