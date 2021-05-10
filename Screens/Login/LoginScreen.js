import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground
} from 'react-native';
import {Input} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {useDispatch} from 'react-redux';
import {action_Login_user} from '../../Services/Actions/Login_Actions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput, HelperText} from 'react-native-paper';
import CardView from 'react-native-rn-cardview';
import { Card } from 'react-native-elements';
import styles from './style'
const LoginScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleUsernameChange = useCallback((value) => {
    let mounted=true
    if(mounted)
    setUsername(value);
    return()=>{mounted=false}
  },[username]);
  const handlePasswordChange = useCallback((value) => {
    let mounted=true
    if(mounted)
    setPassword(value);
    return()=>{mounted=false}
  },[password]);
  const dispatch = useDispatch();
  const handleSubmit = useCallback(() => {
    let mounted=true
    if(mounted)
    //window.localStorage.setItem('username', data.username);
    dispatch(action_Login_user(username, password));
    return()=>{mounted=false}
  },[username,password]);
  const goToSignup = () => {
    Actions.signup();
  };

  return (

    <SafeAreaView style={styles.mainContainer}>
        <ImageBackground
    style={{flex: 1}}
    source={require('../../assets/background/background.jpeg')}
    resizeMode="cover"
    blurRadius={2}>
   
 

      <View style={styles.container}>
        <Image
          source={require('../assets/icons/PremiereIcon2.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.textTitle}>Premiere</Text>

      <Card  containerStyle={styles.cardContainer}>
      
        <View style={styles.InputContainer}>
          <TextInput
            theme={{
              colors: {
                primary: '#3eb2fa',
                backgroundColor:"rgba(255,255,355,0.1)",
                underlineColor: "rgba(255,255,355,0.1)",
              },
            }}
            mode="flat"
            label="Username"
            onChangeText={(text) => handleUsernameChange(text)}
            value={username}
          />
   
    {/* <Input
    containerStyle={{ width:"100%",height:50,borderStyle: 'solid', overflow: 'hidden', marginBottom: 10, marginTop: 10, borderWidth: 1, borderColor: 'black', borderRadius: 25}}
    overflow="hidden"
    keyboardAppearance="dark"
    placeholder="Enter Name"
    autoCorrect={false}
   
    /> */}
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            theme={{
              colors: {
                primary: '#3eb2fa',
                backgroundColor:"rgba(255,255,355,0.1)",
                underlineColor: "rgba(255,255,355,0.4)",
                overflow:"hidden"
              },
            }}
            mode="flat"
            label="Password"
            
            secureTextEntry={true}
            onChangeText={(text) => handlePasswordChange(text)}
            value={password}
          />

        </View>
 
    
            <TouchableHighlight
              style={styles.login}
              underlayColor="rgba(62, 178, 250, 0.5)"
              onPress={() => handleSubmit()}>
              <Text style={styles.submitText}>Login</Text>
            </TouchableHighlight>
            <View style={{ marginTop: 60}}>
          <Text style={{textAlign: 'center'}}>
            Not Yet Registered?{' '}
            <Text onPress={() => goToSignup()} style={{color: 'blue'}}>
              Sign Up
            </Text>
          </Text>
        </View>
        <View style={{flexDirection: 'row', height: 50}}>
        <View
          style={styles.endFooter}>
          <Text
            style={styles.endTextFooter}>
            Powered by TUO @ 2021
          </Text>
        </View>
      </View>
          
      
        </Card>
    
</View>
      
     </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;
