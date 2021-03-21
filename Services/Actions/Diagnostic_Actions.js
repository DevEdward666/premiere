import {
  SET_DATA,
  SET_DONE,
  SET_DATA_FINISHED,
  SET_DATA_RESULT,
} from '../Types/Diagnostic_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../Types/Default_Types';
export const action_POST_appointment = (premid, reason, proccode) => async (
  dispatch,
) => {
  await fetch(`${BASE_URL}/api/users/addDiagnosticAppointment`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      premid: premid,
      reason: reason,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.success) {
        {
          proccode.map((proc) =>
            fetch(`${BASE_URL}/api/users/addDiagnosticProcedure`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                proccode: proc.code,
              }),
            })
              .then((response) => response.json())
              .then((res) => {
                if (res.success) {
                  dispatch({
                    type: SET_DONE,
                    payload: true,
                  });
                } else {
                  alert('Please Make Sure You Entered Valid Details');
                }
              }),
          );
        }
      } else {
        alert('Something Went Wrong');
      }
    });
};

export const action_POST_appointment_others = (
  premid,
  prefix,
  firstname,
  middlename,
  lastname,
  suffix,
  gender,
  civilstatus,
  nationality,
  religion,
  birthdate,
  email,
  mobile,
  fulladdress,
  fulladdress2,
  barangay,
  province,
  city,
  region,
  zipcode,
  reasons,
  proccode,
) => async () => {
  await fetch(`${BASE_URL}/api/users/addDiagnosticAppointmentOthers`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      premid: premid,
      prefix: prefix,
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      suffix: suffix,
      gender: gender,
      civil_status: civilstatus,
      nationality_code: nationality,
      religion_code: religion,
      birthdate: birthdate,
      email: email,
      mobile: mobile,
      fulladdress: fulladdress,
      fulladdress2: fulladdress2,
      barangay: barangay,
      province_code: province,
      city_code: city,
      region_code: region,
      zipcode: zipcode,
      reason: reasons,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.success) {
        {
          proccode.map((proc) =>
            fetch(`${BASE_URL}/api/users/addDiagnosticProcedure`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                proccode: proc.code,
              }),
            }),
          );
        }
      } else {
        alert('Something Went Wrong');
      }
    });
};

export const action_GET_diagnostics_request_finished = (
  premid,
  offset,
) => async (dispatch) => {
  var url = `${BASE_URL}/api/diagnostics/getAppointmentsRequestTableFinished`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      premid: premid,
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_DATA_FINISHED,
        payload: res.data,
      });
    });
};

export const action_GET_diagnostics_request = (premid, offset) => async (
  dispatch,
) => {
  var url = `${BASE_URL}/api/diagnostics/getAppointmentsRequestTable`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      premid: premid,
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_DATA,
        payload: res.data,
      });
    });
};

export const action_GET_diagnostics_resultlist = (premid, offset) => async (
  dispatch,
) => {
  var url = `${BASE_URL}/api/diagnostics/getAppointmentsResultsList`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      premid: premid,
      offset: offset,
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_DATA_RESULT,
          payload: res.data,
        });
      }
    });
};
