import {SETMOBILENO, SET_DATA} from '../Types/Login_Types';
import {SET_USERNAME} from '../Types/User_Types';
import {BASE_URL} from '../Types/Default_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';

import {ACTION_SPINNER_ALERT} from '../Actions/Default_Actions';
export const action_Login_user = (username, password) => async (dispatch) => {
  var url = `${BASE_URL}/api/user/login`;
  const fetchdata = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const parseData = await fetchdata.json();
  if (parseData.success != false) {
    await AsyncStorage.setItem('tokenizer', parseData.data.access_token);
    await AsyncStorage.setItem('username', username);
    Actions.index();
  } else {
    var url = `${BASE_URL}/api/user/InserNewOTP`;
    const fetchdata = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    const parseData2 = await fetchdata.json();

    if (parseData2.success === false) {
      alert(parseData2.message);
    } else {
      var url = `${BASE_URL}/api/user/getUserMobile`;
      const fetchdata = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
        }),
      })
        .then((response) => response.json())
        .then(async (res) => {
          await AsyncStorage.setItem('mobileno', res.data.mobileno);

          await Actions.otp();
        });

      //
    }
  }
};
export const action_set_username = (username) => async (dispatch) => {
  dispatch({
    type: SET_USERNAME,
    payload: username,
  });
};
export const action_GET_mobileno = (username) => async () => {
  const value = await AsyncStorage.getItem('tokenizer');
  // const API_HOST = config.REACT_APP_BASE_URL;
  // var url = `${API_HOST}/api/user/login`;
  var url = `${BASE_URL}/api/user/getUserMobile`;
  const fetchdata = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SETMOBILENO,
          payload: res.data,
        });
      }
    });
};
export const action_add_OTP = (username) => async () => {
  const value = await AsyncStorage.getItem('tokenizer');
  // const API_HOST = config.REACT_APP_BASE_URL;
  // var url = `${API_HOST}/api/user/login`;
  var url = `${BASE_URL}/api/user/InserNewOTP`;
  const fetchdata = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
    }),
  });
  const parseData = await fetchdata.json();
  if (parseData.status != 400) {
    if (parseData.success != false) {
      console.log(parseData.success);
    } else {
      alert(parseData.message);
    }
  } else {
    alert('Wrong Username');
  }
};
