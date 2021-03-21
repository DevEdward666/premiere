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
  base_url: '192.168.254.108',
  remote_url: '192.168.254.108',
  loading: false,
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
    default:
      return data_state;
  }
};
export default Default_Reducer;
