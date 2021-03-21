import {
  SET_DATA_USERS,
  SET_IMAGE_USERS,
  SET_DOCIMAGE_USERS,
} from '../Types/User_Types';

const users_infos = {
  image: '',
  docimage: '',
  userinfo: [],
};
const User_Reducers = (data_state = users_infos, actions) => {
  switch (actions.type) {
    case SET_IMAGE_USERS:
      return {...data_state, image: actions.payload};
    case SET_DOCIMAGE_USERS:
      return {...data_state, docimage: actions.payload};
    case SET_DATA_USERS:
      return {...data_state, userinfo: actions.payload};
    default:
      return data_state;
  }
};
export default User_Reducers;
