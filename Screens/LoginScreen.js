import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {useDispatch} from 'react-redux';
import {action_Login_user} from '../Services/Actions/Login_Actions';
import {SafeAreaView} from 'react-native-safe-area-context';
const LoginScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const dispatch = useDispatch();
  const handleSubmit = () => {
    //window.localStorage.setItem('username', data.username);
    dispatch(action_Login_user(username, password));
  };
  const goToSignup = () => {
    Actions.signup();
  };
  AsyncStorage.getItem('tokenizer').then((item) => {
    if (item) {
      Actions.index();
    }
  });
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.container}>
        <Image
          source={require('../assets/icons/ic_care_prem-playstore.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.textTitle}>Premiere</Text>
        <View style={{marginVertical: 5}} />

        <View style={styles.InputContainer}>
          <Input
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            defaultValue={username}
          />
        </View>
        <View style={styles.InputContainer}>
          <Input
            style={styles.textInput}
            //onFocus={onFocusChange}
            placeholder="Password"
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            defaultValue={password}
          />
        </View>
        <View style={{marginVertical: 5}} />
        <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
          <View style={{flex: 1, width: '90%', padding: 10}}>
            <Button
              onPress={handleSubmit}
              title="Login"
              accessibilityLabel="Log in your account"
            />
          </View>
          <View style={{flex: 1, width: '90%', padding: 10}}>
            <Button
              style={{borderRadius: 30}}
              onPress={goToSignup}
              title="Sign Up"
            />
          </View>
        </View>
      </View>
      <View style={{marginVertical: 55}} />
      <View style={{flexDirection: 'row', height: 50}}>
        <View style={{width: '100%', height: 50, justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              marginStart: 10,
              fontSize: 14,
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#c4c0c0',
            }}>
            Powered by TUO @ 2021
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Login.propTypes = {};

const styles = StyleSheet.create({
  InputContainer: {
    width: '90%',
    height: 50,
    borderRadius: 2,
    marginVertical: 5,
    borderWidth: 0.3,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100 + '%',
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
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: 'black',
    fontWeight: 'normal',
    fontFamily: 'OpenSans',
    marginLeft: 5,
  },
  image: {
    margin: 20,
    width: '100%',
    height: 40 + '%',
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
export default LoginScreen;
