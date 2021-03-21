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
} from '../Types/Default_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';

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
export const action_GET_procedure = () => async (dispatch) => {
  var url = `${BASE_URL}/api/default/getProcedures`;
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
          type: SET_PROCEDURE,
          payload: res.data,
        });
      }
    });
};
