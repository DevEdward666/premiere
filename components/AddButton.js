import React from 'react'
import {View,StyleSheet,Animated} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import {FontAwesome5,Feather} from '@expo/vector-icons'

export default class AddButton extends React.Component{
    buttonSize=new Animated.Value(1);
    mode =new Animated.Value(0);
handlePress=()=>{
    Animated.sequence([
        Animated.timing(this.buttonSize,{
            toValue:0.95,
            duration:200,
            useNativeDriver: true 
        }),
        Animated.timing(this.buttonSize,{
            toValue:1,
            useNativeDriver: true 
        }),
        Animated.timing(this.mode,{
            toValue:this.mode._value === 0 ? 1 : 0 ,
            useNativeDriver: true 
        })
    ]).start();
}


render(){
    const sizeStyle={
        transform:[{scale:this.buttonSize}]
    };
    const rotation=this.mode.interpolate({
        inputRange:[0,1],
        outputRange:["0deg","45deg"]

    })
  
    return(
        <View style={{position:'relative',alignItems:"center"}}>
            {/* <Animated.View style={{position:"absolute"}}>
                <View style={styles.secondaryButton}>
                    <Feather name="thermometer" size={24} color="#FFF"/>
                </View>
            </Animated.View> */}
            <Animated.View style={[styles.button,sizeStyle]}>
                <TouchableHighlight onPress={this.handlePress} underlayColor="#00a15b">
                    <Animated.View style={{transform:[{rotate:rotation}] }}>
                        <FontAwesome5 name="plus" size={24} color="#FFF"/>
                    </Animated.View>
                </TouchableHighlight>
            </Animated.View>
           
        </View>
    )
}
}
const styles=StyleSheet.create({
button:{
    backgroundColor:'#00a15b',
    alignItems:"center",
    justifyContent:"center",
    width:72,
    height:72,
    borderRadius:36,
    position:"absolute",
    top:-60,
    shadowColor:'#7F58FF',
    shadowRadius:5,
    shadowOffset:{height:10},
    shadowOpacity:0.3,
    borderWidth:3,
    borderColor:"#FFF"
},
secondaryButton:{
    position:"absolute",
    alignItems:"center",
    justifyContent:"center",
    width:48,
    height:48,
    borderRadius:24,
    backgroundColor:"#7F58FF"
}
})