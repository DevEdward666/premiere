import {SET_DATA, SET_USERNAME} from '../Types/SignUp_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import {BASE_URL} from '../Types/Default_Types';
import {Platform} from 'react-native';
const finished = false;
export const action_update_user = (username) => async (dispatch) => {
  console.log(username);
  var url = `${BASE_URL}/api/user/getUserOTP`;
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
  if (parseData.success != false) {
    Actions.index();
  } else {
    alert(parseData.message);
  }
};
export const action_GET_usernameExist = (username) => async (dispatch) => {
  var url = `${BASE_URL}/api/user/getUsernameExist`;
  await fetch(url, {
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
          type: SET_USERNAME,
          payload: res.data,
        });
      }
    });
};
export const action_POST_FileImage = (response, username) => async (
  dispatch,
) => {};
export const action_POST_FileImageProfile = (response, username) => async (
  dispatch,
) => {};
// RNFetchBlob.fetch(
//   'POST',
//   url,
//   {accept: '*/*', 'Content-Type': 'multipart/form-data'},

//   [
//     {
//       data: formdata._parts,
//     },
//   ],
// )
//   .then((res) => {
//     var tempMSG = res.data;

//     tempMSG = tempMSG.replace(/^"|"$/g, '');

//     Alert.alert(tempMSG);
//     // the conversion is done in native code
//     // let base64Str = res.base64();
//     // dispatch({
//     //   type: SET_IMAGE_USERS,
//     //   payload: base64Str,
//     // });
//     // // the following conversions are done in js, it's SYNC
//     // let text = res.text();
//     // let json = res.json();
//   })
//   // Status code is not 200
//   .catch((errorMessage, statusCode) => {
//     // error handling
//   });
// };
export const action_SignUp_user = (
  firstname,
  middlename,
  lastname,
  gender,
  birthdate,
  mobileno,
  email,
  username,
  password,
  pin,
  region_code,
  city_code,
  province_code,
  barangay_code,
  zipcode,
  nationality_code,
  fulladdress,
  responseProfile,
  responseVerfication,
) => async () => {
  const value = await AsyncStorage.getItem('tokenizer');
  var url = `${BASE_URL}/api/user/addnewuser`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: JSON.stringify({
      url: `Resources\\Images\\${username}\\${username}.jpg`,
      url_docs: `Resources\\Images\\${username}\\${username}_VerificationDocs.jpg`,
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      gender: gender,
      birthdate: birthdate,
      mobileno: mobileno,
      email: email,
      username: username,
      password: password,
      pin: pin,
      region_code: region_code,
      city_code: city_code,
      province_code: province_code,
      barangay_code: barangay_code,
      zipcode: zipcode,
      nationality_code: nationality_code,
      fulladdress: fulladdress,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      AsyncStorage.setItem('username', username);
      if (res.success) {
        var url = `${BASE_URL}/api/user/UploadFileProfile`;
        var name = responseProfile.uri.split('/').pop();
        let formdata = new FormData();
        formdata.append('FormFile', {
          uri:
            Platform.OS === 'android'
              ? responseProfile.uri
              : responseProfile.uri.replace('file://', ''),
          // uri:
          //   Platform.OS === 'android'
          //     ? response.uri
          //     : response.uri.replace('file://', ''),
          name: name,
          type: responseProfile.type,
        });
        formdata.append('FileName', username + '.jpg');
        formdata.append('FolderName', username);
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formdata,
        })
          .then((response) => {
            var url = `${BASE_URL}/api/user/UploadFile`;
            var name = responseVerfication.uri.split('/').pop();
            let formdata = new FormData();
            formdata.append('FormFile', {
              uri:
                Platform.OS === 'android'
                  ? responseVerfication.uri
                  : responseVerfication.uri.replace('file://', ''),
              // uri:
              //   Platform.OS === 'android'
              //     ? response.uri
              //     : response.uri.replace('file://', ''),
              name: name,
              type: responseVerfication.type,
            });
            formdata.append('FileName', username + '_VerificationDocs.jpg');
            formdata.append('FolderName', username);
            fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              body: formdata,
            })
              .then((response) => {
                AsyncStorage.setItem('mobileno', mobileno);
                Actions.tac();
                console.log(res);
              })
              .catch((err) => {
                alert(err);
              });
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        alert('Something Went Wrong');
      }
    });
};
