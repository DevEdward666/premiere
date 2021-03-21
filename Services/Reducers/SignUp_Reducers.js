import {SET_DATA, SET_USERNAME} from '../Types/SignUp_Types';

const info = {
  data: [],
  username: [],
  loading: false,
};
const Login_Reducer = (data_state = info, actions) => {
  switch (actions.type) {
    case SET_DATA:
      return {...data_state, data: actions.payload};
    case SET_USERNAME:
      return {...data_state, username: actions.payload};
    default:
      return data_state;
  }
};
export default Login_Reducer;
