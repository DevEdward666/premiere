import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    plate:{
        flex:1,
        backgroundColor:"rgba(255,255,355,0.4)",
        borderColor:"rgba(255,255,355,0.4)",
        borderWidth:0.1,
        borderRadius:30
    },
    header: {
      backgroundColor: '#00BFFF',
      height: 200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: 'white',
      alignSelf: 'center',
    },
  
    body: {
        flex:1,
        marginTop:50,
        width:"100%",
        height:"100%",
        flexDirection:"column"
    },
    bodybtns: {
        width:"100%",
    },
    bodyContent: {
      flex: 1,
       width:"100%",
      flexDirection:"column",
      alignItems: 'center',
      padding: 30,
    },
    name: {
      fontSize: 16,
      color: '#696969',
      textAlign:"center",
      fontWeight: '600',
    },
    info: {
      fontSize: 12,
      color: '#1dc259',
      textAlign:"center",
      marginTop: 10,
    },
    description: {
      fontSize: 16,
      color: '#1dc259',
      marginTop: 10,
      textAlign: 'center',
    },
    buttonContainer: {
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    
      margin:20,
      width: "50%",
      borderRadius: 30,
      backgroundColor: '#1dc259',
    },
    btntext:{
        color:"white",
    },
    viewstandard:{
        flexDirection: "row",justifyContent:"flex-start",alignSelf:"center",padding:20
    },
    viewdetails:{
        flexDirection: "column",justifyContent:"flex-start",alignSelf:"center",padding:20
    }
  });

  export default styles
  