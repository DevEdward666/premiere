import {SET_DATA} from '../Types/Events_Types';

const events = {
  data: [],
};
const Events_Reducers = (data_state = events, actions) => {
  switch (actions.type) {
    case SET_DATA:
      return {...data_state, data: actions.payload};
    default:
      return data_state;
  }
};
export default Events_Reducers;
