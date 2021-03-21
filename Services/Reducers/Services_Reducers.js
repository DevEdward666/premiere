import {SET_SERVICES, SET_IMAGE_SERVICES} from '../Types/Services_Types';

const services = {
  data: [],
  images: '',
  loading: false,
};
const Services_Reducers = (data_state = services, actions) => {
  switch (actions.type) {
    case SET_SERVICES:
      return {...data_state, data: actions.payload};
    case SET_IMAGE_SERVICES:
      return {...data_state, images: actions.payload};

    default:
      return data_state;
  }
};
export default Services_Reducers;
