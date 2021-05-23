import {
  SET_DATA,
  SET_DONE,
  SET_DATA_FINISHED,
  SET_DATA_RESULT,
  SET_DATA_DIAGNOSTIC,
  SET_APPOINTMENT_MESSAGE,
} from '../Types/Diagnostic_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../Types/Default_Types';
export const action_POST_appointment = (premid, reason,req_total_cost, proccode) => async (
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
      req_total_cost:req_total_cost,
      listofprocedures: proccode,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.success) {
        dispatch({
          type: SET_APPOINTMENT_MESSAGE,
          payload: {message: res.message, success: res.success},
        });
      } else {
        alert('Something Went Wrong');
      }
      console.log(res)
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
  civilstatusvalue,
  civilstatuslabel,
  nationality,
  religion,
  birthdate,
  email,
  mobile,
  fulladdress,
  barangay,
  province,
  city,
  region,
  psgc,
  req_total,
  zipcode,
  reasons,
  appointmentprocedure,
) => async (dispatch) => {
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
      civil_status_key: civilstatusvalue,
      civil_status_desc: civilstatuslabel,
      nationality_code: nationality,
      religion_code: religion,
      birthdate: birthdate,
      email: email,
      mobile: mobile,
      fulladdress: fulladdress,
      barangay: barangay,
      province_code: province,
      city_code: city,
      region_code: region,
      psgc_address:psgc,
      req_total:req_total,
      zipcode: zipcode,
      reasons: reasons,
      listofprocedures: appointmentprocedure,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.success) {
      
        dispatch({
          type: SET_APPOINTMENT_MESSAGE,
          payload: {message: res.message, success: res.success},
        });
      } else {
        alert('Something Went Wrong');
      }
      console.log(res);
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
        type: SET_DATA_DIAGNOSTIC,
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
