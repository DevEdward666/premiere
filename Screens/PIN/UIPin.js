import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ReactNativePinView from 'react-native-pin-view';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../Plugins/waitinterval';
import {
  action_GET_Profileimage,
  action_GET_userdetails,
  action_GET_userpin,
  action_update_userlocked,
} from '../Services/Actions/Users_Actions';
import {Actions} from 'react-native-router-flux';
import styles from './style';
const UIPin = () => {
  const dispatch = useDispatch();
  const users_image = useSelector((state) => state.User_Reducers.image);
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const user_pin = useSelector((state) => state.User_Reducers.user_pin);
  const pinView = useRef(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [username, setUsername] = useState('');
  const [showCompletedButton, setShowCompletedButton] = useState(false);
  const controller = new AbortController();
  AsyncStorage.getItem('username')
    .then((item) => {
      if (item == null) {
        Actions.home();
      }
      setUsername(item);
    })
    .catch(() => {
      return controller.abort();
    });
  useEffect(() => {
    let mounted = true;
    const getdetailsofuser = () => {
      dispatch(action_GET_userdetails(username));
    };
    mounted && getdetailsofuser();
    return () => {
      mounted = false;
    };
  }, [dispatch, username]);
  useEffect(() => {
    let mounted = true;
    const eneterpin = () => {
      if (enteredPin.length > 0) {
        setShowRemoveButton(true);
      } else {
        setShowRemoveButton(false);
      }
      if (enteredPin.length === 4) {
        setShowCompletedButton(true);
      } else {
        setShowCompletedButton(false);
      }
    };
    mounted && eneterpin();
    return () => {
      mounted = false;
    };
  }, [enteredPin]);
  useEffect(() => {
    let mounted = true;
    const getuserdetailsandpin = () => {
      dispatch(action_GET_userpin(username));
    };

    mounted && getuserdetailsandpin();
    return () => {
      mounted = false;
    };
  }, [dispatch, username]);

  const handlePinEntered = useCallback(async (value) => {
    await setEnteredPin(value);
  }, []);
  const handleSubmitPin = useCallback(
    async (key) => {
      if (key === 'custom_left') {
        await pinView.current.clear();
      }
      if (key === 'custom_right') {
        if (user_pin == enteredPin) {
          await dispatch(action_update_userlocked(username, 'false'));
          await pinView.current.clearAll();
          await Actions.index();
        }
      }
    },
    [user_pin, enteredPin],
  );

  let imageUri = 'data:image/png;base64,' + users_image;
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#4287f5',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={styles.avatar}
          source={require('../../assets/icons/premiereicon.png')}
        />
        <ReactNativePinView
          inputSize={12}
          ref={pinView}
          pinLength={4}
          buttonSize={60}
          onValueChange={(value) => handlePinEntered(value)}
          buttonAreaStyle={{
            marginTop: 24,
          }}
          inputAreaStyle={{
            marginBottom: 24,
          }}
          inputViewEmptyStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#FFF',
          }}
          inputViewFilledStyle={{
            backgroundColor: '#FFF',
          }}
          buttonViewStyle={{
            borderWidth: 1,
            borderColor: '#FFF',
          }}
          buttonTextStyle={{
            color: '#FFF',
          }}
          onButtonPress={(key) => handleSubmitPin(key)}
          customLeftButton={
            showRemoveButton ? (
              <Icon name={'ios-backspace'} size={36} color={'#FFF'} />
            ) : undefined
          }
          customRightButton={
            showCompletedButton ? (
              <Icon name={'checkmark-outline'} size={36} color={'#FFF'} />
            ) : undefined
          }
        />
      </SafeAreaView>
    </>
  );
};

export default UIPin;
