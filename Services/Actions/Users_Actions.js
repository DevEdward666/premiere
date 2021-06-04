import {
  SET_DATA_USERS,
  SET_IMAGE_USERS,
  SET_DOCIMAGE_USERS,
  GET_LINK_MESSAGE,
  SET_PIN,
  SET_LOCKED,
  SET_QR_USER,
} from '../Types/User_Types';
import {BASE_URL} from '../Types/Default_Types';
import RNFetchBlob from 'react-native-fetch-blob';
var RNFS = require('react-native-fs');
const controller = new AbortController();
export const action_GET_userdetails = (username) => async (dispatch) => {
  let isUnmount = false;
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
        if (!isUnmount) {
          dispatch({
            type: SET_DATA_USERS,
            payload: res.data,
          });
        }
      }

      // console.log('users' + res.username);
    })
    .catch(() => {
      return controller.abort();
    });
  return () => {
    isUnmount = true;
  };
};
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
    })
    .catch(() => {
      return controller.abort();
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
    })
    .catch(() => {
      return controller.abort();
    });
};
export const action_setqr = (username) => async (dispatch) => {
  var url = `${BASE_URL}/api/user/getusersqr`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      value: username,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        dispatch({
          type: SET_QR_USER,
          payload: {qrbase64: res.data},
        });
      } catch (e) {}
      // console.log('users' + res.username);
    })
    .catch(() => {
      return controller.abort();
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
    })
    .catch(() => {
      return controller.abort();
    });
};
export const action_GET_Docs = (username) => async (dispatch) => {
  let isUnmount = false;
  var url = `${BASE_URL}/api/user/getimageDocs?username=${username}`;

  await RNFetchBlob.fetch('POST', url, {})
    .then(async (res) => {
      let base64Str = res.base64();
      try {
        responseData = await response.json();
      } catch (e) {
        if (!isUnmount) {
          dispatch({
            type: SET_DOCIMAGE_USERS,
            payload: base64Str,
          });
        }
      }
      let text = res.text();
      let json = res.json();
    })

    .catch((errorMessage, statusCode) => {
      return controller.abort();
    });
  return () => {
    isUnmount = true;
  };
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
    .catch((errorMessage, statusCode) => {
      return controller.abort();
    });
};
export const action_SET_files = (Base64) => async () => {
  // const paths = `${RNFetchBlob.fs.dirs.DCIMDir}/${new Date().getTime()}.jpg`; // where u need to put that

  var path = `${RNFS.PicturesDirectoryPath}/SafeDavaoQr/SafeDavaoQr.jpg`;

  try {
    const filepath = `${path}`;

    RNFS.exists(filepath)
      .then((result) => {
        console.log('file exists: ', result);

        if (result) {
          return (
            RNFS.unlink(filepath)
              .then(() => {
                console.log('FILE DELETED');
                RNFS.writeFile(path, Base64, 'base64') //data.base64 is your photo with convert base64
                  .then((value) => {
                    console.log(value);
                    // try {
                    //   RNFS.scanFile(paths) //after save to notify gallry for that
                    //     .then(() => {
                    //       console.log('scan file success');
                    //     })
                    //     .catch((err) => {
                    //       console.log('scan file error');
                    //     });
                    // } catch (error) {
                    //   console.log('fileerror', error.message);
                    // }
                  })
                  .catch((e) => console.log(e.message));
              })
              // `unlink` will throw an error, if the item to unlink does not exist
              .catch((err) => {
                console.log(err.message);
              })
          );
        } else {
          RNFS.writeFile(path, Base64, 'base64') //data.base64 is your photo with convert base64
            .then((value) => {
              console.log(value);
              // try {
              //   RNFS.scanFile(paths) //after save to notify gallry for that
              //     .then(() => {
              //       console.log('scan file success');
              //     })
              //     .catch((err) => {
              //       console.log('scan file error');
              //     });
              // } catch (error) {
              //   console.log('fileerror', error.message);
              // }
            })
            .catch((e) => console.log(e.message));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log('fileerror', error.message);
  }
};
