import {
  SET_DATA,
  SET_DONE,
  SET_DATA_FINISHED,
  SET_DATA_RESULT,
  SET_URL,
} from '../Types/Diagnostic_Types';
import {REMOTE_URL} from '../Types/Default_Types';
const diagnostic = {
  data: [],
  data_finished: [],
  data_result: [],
  loading: false,
  url: REMOTE_URL,
};
const Diagnostic_Reducer = (data_state = diagnostic, actions) => {
  switch (actions.type) {
    case SET_DATA:
      return {...data_state, data: actions.payload};
    case SET_DATA_FINISHED:
      return {...data_state, data_finished: actions.payload};
    case SET_DONE:
      return {...data_state, loading: actions.payload};
    case SET_DATA_RESULT:
      return {...data_state, data_result: actions.payload};

    case SET_URL:
      return {...data_state, url: actions.payload};

    default:
      return data_state;
  }
};
export default Diagnostic_Reducer;
