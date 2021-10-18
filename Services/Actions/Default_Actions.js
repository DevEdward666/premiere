import {
  SET_REGION,
  SET_BARANGAY,
  SET_CITY,
  SET_NATIONALITY,
  SET_PROVINCE,
  BASE_URL,
  SET_CIVIL_STATUS,
  SET_RELIGION,
  SET_PROCEDURE,
  SIGNALR_CONNECT,
  SIGNALR_CONNECT_NOTIFY,
  SIGNALR_CONNECT_NOTIFY_FROM_QUEUE,
  QUEUE_BASE_URL,
  SET_REFRESHING,
  SET_OFFSET,
  GET_NOTIF,
  GET_DEVICE,
  GET_NOTIFICATION_LIST,
  SET_OPEN_BOTTOMSHEET,
  SET_NOTIFICATION_OFFSET,
  REGISTRATION_COMPLETE,
  SPINNER_ALERT,
  SET_LOADED,
  SET_HEADER_HIDE,
  SET_CAMERA,
  SET_LIBRARY,
  SHOW_ALERT,
  SET_TESTIMONIALS,
  SET_DEPARTMENT,
  GET_NOTIFICATION_LIST_ALL
} from '../Types/Default_Types';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import * as signalR from '@microsoft/signalr';
export const action_GET_region = () => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getregion`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_REGION,
        payload: res.data,
      });
    });
};

export const action_GET_province = (region_code) => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getprovince`;

  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      region_code: region_code,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_PROVINCE,
          payload: res.data,
        });
      }
    })
    .catch((e) => console.log('error' + e));
};

export const action_GET_city = (region_code, province_code) => async (
  dispatch,
) => {
  var url = `${BASE_URL}/api/default/getcity`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      region_code: region_code,
      province_code: province_code,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_CITY,
          payload: res.data,
        });
      }
    });
};

export const action_GET_barangay = (
  region_code,
  province_code,
  city_code,
) => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getbarangay`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      region_code: region_code,
      province_code: province_code,
      city_code: city_code,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_BARANGAY,
          payload: res.data,
        });
      }
    });
};

export const action_GET_department = () => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getDepartments`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((res) => {
    
        dispatch({
          type: SET_DEPARTMENT,
          payload: res.data,
        });
      
    });
};

export const action_GET_nationality = () => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getnationality`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_NATIONALITY,
          payload: res.data,
        });
      }
    });
};

export const action_GET_civilstatus = () => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getcivilstatus`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_CIVIL_STATUS,
          payload: res.data,
        });
      }
    });
};

export const action_GET_religion = () => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getreligion`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_RELIGION,
          payload: res.data,
        });
      }
    });
};
export const action_GET_procedure = (search) => async (dispatch) => {
  const bodysearch = null;
  if (search === '') {
    search = bodysearch;
  }
  var url = `${BASE_URL}/api/default/getProcedures`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      procedure: search,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_PROCEDURE,
          payload: res.data,
        });
      }
    });
};
export const action_GET_testimonials = () => async (dispatch) => {
  var url = `${BASE_URL}/api/default/gettestimonials`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_TESTIMONIALS,
        payload: res.data,
      });
    });
};
export const action_GET_notications = (name, offset) => async (dispatch) => {
  let isUnmount = false;
  var url = `${BASE_URL}/api/default/getnotications`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
  
          dispatch({
            type: GET_NOTIFICATION_LIST,
            payload: {data: res.data, loading: res.success},
          });
        
      
    });

};
export const action_GET_notications_all = (name, offset) => async (dispatch) => {
  let isUnmount = false;
  var url = `${BASE_URL}/api/default/getnotications`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then( (res) => {
  
          dispatch({
            type: GET_NOTIFICATION_LIST_ALL,
            payload: {data: res.data, loading: res.success},
          });
        
      
    });

};
export const action_SET_notications = (
  title,
  body,
  priority,
  audience,
  created_by,
) => async (dispatch) => {
  var url = `${BASE_URL}/api/default/insertNotifications`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      body: body,
      priority: priority,
      audience: audience,
      created_by: created_by,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {}
    });
};
export const signalr_connection = () => async (dispatch) => {
  const hubConnect = new signalR.HubConnectionBuilder()
    .withUrl(`${BASE_URL}/api/message/message`)
    .build();
  hubConnect.start();
  dispatch({type: SIGNALR_CONNECT, payload: hubConnect});
};
export const signalr_notify_connection = () => async (dispatch) => {
  const hubConnect = new signalR.HubConnectionBuilder()
    .withUrl(`${BASE_URL}/api/notif/notify`)
    .build();
  hubConnect.start();

  dispatch({type: SIGNALR_CONNECT_NOTIFY, payload: hubConnect});
};
export const signalr_notify_connection_from_queue = () => async (dispatch) => {
  const hubConnect = new signalR.HubConnectionBuilder()
    .withUrl(`${QUEUE_BASE_URL}/api/notifmobile/notifymobile`)
    .build();
  hubConnect.start();
  dispatch({type: SIGNALR_CONNECT_NOTIFY_FROM_QUEUE, payload: hubConnect});
};
export const ACTION_SPINNER_ALERT = (isSpinner) => async (dispatch) => {
  dispatch({type: SPINNER_ALERT, payload: isSpinner});
};
export const ACTION_REFRESH = (isRefresh) => async (dispatch) => {
  dispatch({type: SET_REFRESHING, payload: isRefresh});
};
export const ACTION_OFFSET = (offset) => async (dispatch) => {
  dispatch({type: SET_OFFSET, payload: offset});
};
export const ACTION_NOTIF = (title, body, to, type) => async (dispatch) => {
  dispatch({
    type: GET_NOTIF,
    payload: {title: title, body: body, to: to, type: type},
  });
};
export const ACTION_NOTIFICATION_OFFSET = (offset) => async (dispatch) => {
  dispatch({
    type: SET_NOTIFICATION_OFFSET,
    payload: offset,
  });
};
export const ACTION_LOADED = (loaded) => async (dispatch) => {
  dispatch({
    type: SET_LOADED,
    payload: loaded,
  });
};
export const action_sethide_header = (hide) => async (dispatch) => {
  dispatch({
    type: SET_HEADER_HIDE,
    payload: hide,
  });
};
export const ACTION_GET_DEVICE = (device) => async (dispatch) => {
  let isUnmount = false;
  if (!isUnmount) {
    dispatch({type: GET_DEVICE, payload: device});
  }
  return () => {
    isUnmount = true;
  };
};
export const action_open_bottomsheet = (open) => async (dispatch) => {
  let isUnmount = false;
  if (!isUnmount) {
    dispatch({type: SET_OPEN_BOTTOMSHEET, payload: open});
  }
  return () => {
    isUnmount = true;
  };
};
export const action_alerted = (alerted) => async (dispatch) => {
  dispatch({type: SHOW_ALERT, payload: alerted});
};
export const action_imagepickeroptions = (camera) => async (dispatch) => {
  dispatch({type: SET_CAMERA, payload: camera});
};
export const action_library = (library) => async (dispatch) => {
  dispatch({type: SET_LIBRARY, payload: library});
};
export const requestLocationPermission = () => async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Premiere',
        message: 'Premiere App access to your Storage ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
