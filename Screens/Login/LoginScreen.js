import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useState, useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {action_Login_user} from '../../Services/Actions/Login_Actions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput, HelperText} from 'react-native-paper';
import CardView from 'react-native-rn-cardview';
import {Card} from 'react-native-elements';
import styles from './style';
import {Dimensions} from 'react-native';
const LoginScreen = (props) => {
  const registrationcomplete = useSelector(
    (state) => state.Default_Reducers.registrationcomplete,
  );

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alerted, setAlerted] = useState(false);

  const handleUsernameChange = useCallback(
    (value) => {
      let mounted = true;
      if (mounted) setUsername(value);
      return () => {
        mounted = false;
      };
    },
    [username],
  );
  const handlePasswordChange = useCallback(
    (value) => {
      let mounted = true;
      if (mounted) setPassword(value);
      return () => {
        mounted = false;
      };
    },
    [password],
  );
  const dispatch = useDispatch();
  const handleSubmit = useCallback(() => {
    let mounted = true;
    if (mounted)
      //window.localStorage.setItem('username', data.username);
      dispatch(action_Login_user(username, password));
    return () => {
      mounted = false;
    };
  }, [username, password]);
  const goToSignup = () => {
    Actions.signup_name();
  };
  const gotopolicy = () => {
    Actions.pap();
  };
  const gototerms = () => {
    Actions.tac();
  };

  useEffect(() => {
    let mounted = true;
    const getregistrationcomplete = async () => {
      if (mounted) {
        if (registrationcomplete?.success) {
          if (alerted) {
            await setAlerted(true);
            await alert(registrationcomplete?.message);
          }
        }
      }
      mounted && getregistrationcomplete();
      return () => {
        mounted = false;
      };
    };
  }, [registrationcomplete?.message]);

  return (
    // <ImageBackground
    //   style={{
    //     width: Dimensions.get('screen').width,
    //     height: Dimensions.get('screen').height,
    //   }}
    //   source={require('../../assets/background/background.jpeg')}
    //   resizeMode="cover"
    //   blurRadius={2}>
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/PremiereIcon2.png')}
        resizeMode="contain"
        style={styles.image}
      />

      <View style={styles.cardContainer}>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.text}
            theme={{
              colors: {
                placeholder: 'black',
                text: 'black',
                primary: '#0084FF',
                underlineColor: 'transparent',
                background: 'white',
                backgroundColor: 'white',
              },
            }}
            mode="flat"
            label="Username"
            onChangeText={(text) => handleUsernameChange(text)}
            value={username}
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.text}
            theme={{
              colors: {
                placeholder: 'black',
                text: 'black',
                primary: '#0084FF',
                underlineColor: 'transparent',
                background: 'white',
                backgroundColor: 'white',
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
        <View style={{marginTop: 60}}>
          <Text style={{textAlign: 'center'}}>
            Not Yet Registered?{' '}
            <Text onPress={() => goToSignup()} style={{color: 'blue'}}>
              Sign Up
            </Text>
          </Text>
          {/* <View
            style={{
              flex: 1,
              marginStart: 30,
              marginEnd: 30,
              textAlign: 'center',
            }}> */}
          <Text
            style={styles.startTextFooter}>
            By signing up, I have read and agreed to Premiere{' '}
            <Text onPress={() => gototerms()} style={{color: 'blue'}}>
              Terms of Use{' '}
            </Text>
            and{' '}
            <Text onPress={() => gotopolicy()} style={{color: 'blue'}}>
              Privacy Policy
            </Text>
          </Text>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={styles.endFooter}>
              <Text style={styles.endTextFooter}>Powered by TUO @ 2021</Text>
            </View>
            {/* </View> */}
          </View>
        </View>
      </View>
    </View>
    // </ImageBackground>
  );
};

export default LoginScreen;
