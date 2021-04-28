import {FILE_NAME, SET_FILES, GET_FILES} from '../Types/FTP_Types';

const file = {
  filename: '',
  data_patient_files: [],
};
const FTP_Reducers = (data_state = file, actions) => {
  switch (actions.type) {
    case FILE_NAME:
      return {...data_state, filename: actions.payload};
    case GET_FILES:
      return {...data_state, data_patient_files: actions.payload};
    default:
      return data_state;
  }
};
export default FTP_Reducers;
