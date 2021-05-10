import {
  SET_DATA_USERS,
  SET_IMAGE_USERS,
  SET_DOCIMAGE_USERS,
  GET_LINK_MESSAGE,
  SET_PIN,
  SET_LOCKED,
} from '../Types/User_Types';
import {BASE_URL} from '../Types/Default_Types';
import RNFetchBlob from 'react-native-fetch-blob';
const controller = new AbortController()
export const action_GET_userdetails = (username) => async (dispatch) => {
let isUnmount=false
  var url = `${BASE_URL}/api/user/getUserInfo`;
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
          if(!isUnmount){
            dispatch({
              type: SET_DATA_USERS,
              payload: res.data,
            });
          }
      
        }

      
    

      // console.log('users' + res.username);
    }).catch(()=>{
      return controller.abort()
    });
 return()=>{
   isUnmount=true
 }
}
export const action_GET_userpin = (username) => async (dispatch) => {
  var url = `${BASE_URL}/api/user/getuserpin`;
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
          type: SET_PIN,
          payload: res.data?.pin,
        });
      }
      // console.log('users' + res.username);
    }).catch(()=>{
      return controller.abort()
    });
};
export const action_update_userlocked = (username, locked) => async () => {
  var url = `${BASE_URL}/api/user/updatelockeduser`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      islocked: locked,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {}
      // console.log('users' + res.username);
    }).catch(()=>{
      return controller.abort()
    });
};
export const action_SET_LinkRequest = (patno, prem_id, status) => async (
  dispatch,
) => {
  var url = `${BASE_URL}/api/users/InsertLinkRequest`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      patno: patno,
      prem_id: prem_id,
      status: status,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: GET_LINK_MESSAGE,
          payload: res.message,
        });
        console.log(res);
      }

      // console.log('users' + res.username);
    }).catch(()=>{
      return controller.abort()
    });
};
export const action_GET_Docs = (username) => async (dispatch) => {
  let isUnmount=false
  var url = `${BASE_URL}/api/user/getimageDocs?username=${username}`;

  await RNFetchBlob.fetch('POST', url, {})
    .then(async (res) => {
      let base64Str = res.base64();
      try {
        responseData = await response.json();
      } catch (e) {
        if(!isUnmount){
          dispatch({
            type: SET_DOCIMAGE_USERS,
            payload: base64Str,
          });
        }
     
      }
      let text = res.text();
      let json = res.json();
    })

    .catch((errorMessage, statusCode) => {return controller.abort()});
    return ()=>{isUnmount=true}
};
export const action_GET_Profileimage = (username) => async (dispatch) => {
  var url = `${BASE_URL}/api/user/getimage?username=${username}`;
  await RNFetchBlob.fetch('POST', url, {})
    .then(async (res) => {
      let base64Str = res.base64();
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_IMAGE_USERS,
          payload: base64Str,
        });
      }
      let text = res.text();
      let json = res.json();
    })
    .catch((errorMessage, statusCode) => {return controller.abort()});
};
export const action_SET_files = (Base64) => async () => {
  const dirs = RNFetchBlob.fs.dirs;
  // let base64Str = Base64.base64();
  console.log(Base64);
  let path = dirs.PictureDir + '/SafeDavaoQr/SafeDavaoQr.jpg';
  RNFetchBlob.fs
    .mv(Base64, path)
    .then((result) => {
      console.log('File has been saved to:' + result);
    })
    .catch((error) =>{return controller.abort()});
 
};
