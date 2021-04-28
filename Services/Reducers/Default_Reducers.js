import {
  SET_REGION,
  SET_BARANGAY,
  SET_CITY,
  SET_NATIONALITY,
  SET_PROVINCE,
  SET_CIVIL_STATUS,
  SET_RELIGION,
  SET_PROCEDURE,
  BASE_URL,
  REMOTE_URL,
  SIGNALR_CONNECT,
  SIGNALR_CONNECT_NOTIFY,
  SET_REFRESHING,
  SET_OFFSET,
  GET_NOTIF,
  GET_DEVICE,
  GET_NOTIFICATION_LIST,
} from '../Types/Default_Types';

const defult_values = {
  region: [],
  barangay: [],
  city: [],
  nationality: [],
  provinces: [],
  civil_status: [],
  religion: [],
  procedures: [],
  base_url: BASE_URL,
  remote_url: BASE_URL,
  loading: false,
  hubconnect: '',
  hubconnect_notify: '',
  refresh: false,
  offset: 0,
  notification: {title: '', body: '', to: '', type: ''},
  notificationlist: {data: [], loading: false},
  device: '',
};
const Default_Reducer = (data_state = defult_values, actions) => {
  switch (actions.type) {
    case SET_REGION:
      return {...data_state, region: actions.payload};
    case SET_BARANGAY:
      return {...data_state, barangay: actions.payload};
    case SET_CITY:
      return {...data_state, city: actions.payload};
    case SET_PROVINCE:
      return {...data_state, provinces: actions.payload};
    case SET_NATIONALITY:
      return {...data_state, nationality: actions.payload};
    case SET_CIVIL_STATUS:
      return {...data_state, civil_status: actions.payload};
    case SET_PROCEDURE:
      return {...data_state, procedures: actions.payload};
    case SET_RELIGION:
      return {...data_state, religion: actions.payload};
    case BASE_URL:
      return {...data_state, base_url: actions.payload};
    case REMOTE_URL:
      return {...data_state, remote_url: actions.payload};
    case SIGNALR_CONNECT:
      return {...data_state, hubconnect: actions.payload};
    case SIGNALR_CONNECT_NOTIFY:
      return {...data_state, hubconnect_notify: actions.payload};
    case SET_REFRESHING:
      return {...data_state, refresh: actions.payload};
    case SET_OFFSET:
      return {...data_state, offset: actions.payload};
    case GET_NOTIF:
      return {...data_state, notification: actions.payload};
    case GET_DEVICE:
      return {...data_state, device: actions.payload};
    case GET_NOTIFICATION_LIST:
      return {...data_state, notificationlist: actions.payload};
    default:
      return data_state;
  }
};
export default Default_Reducer;
