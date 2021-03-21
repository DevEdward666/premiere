import {SET_SERVICES, SET_IMAGE_SERVICES} from '../Types/Services_Types';
import {BASE_URL} from '../Types/Default_Types';
import RNFetchBlob from 'react-native-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const action_GET_Services = (offset) => async (dispatch) => {
  const value = await AsyncStorage.getItem('tokenizer');
  const bearer_token = value;
  const bearer = 'Bearer ' + bearer_token;
  var url = `${BASE_URL}/api/services/getServices`;
  await fetch(url, {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_SERVICES,
          payload: res.data,
        });
      }
    });
};
export const action_GET_Servicesimage = (imgname) => async (dispatch) => {
  const value = await AsyncStorage.getItem('tokenizer');
  const bearer_token = value;
  const bearer = 'Bearer ' + bearer_token;
  var url = `${BASE_URL}/api/services/getimage?imgname=${imgname}`;
  await RNFetchBlob.fetch('POST', url, {
    Authorization: bearer,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })
    // when response status code is 200
    .then(async (res) => {
      // the conversion is done in native code
      let base64Str = res.base64();
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_IMAGE_SERVICES,
          payload: base64Str,
        });
      }

      // the following conversions are done in js, it's SYNC
      let text = res.text();
      let json = res.json();
    })
    // Status code is not 200
    .catch((errorMessage, statusCode) => {
      // error handling
    });
};
