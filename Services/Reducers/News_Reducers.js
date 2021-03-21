import {
  SET_DATA,
  SET_DATA_WEEK,
  SET_DATA_TODAY,
  SET_URL,
  SET_DATA_INFO,
  GET_NEWS_REACTION,
  GET_NEWS_COMMENT,
} from '../Types/News_Types';
import {BASE_URL} from '../Types/Default_Types';

const news = {
  data: [],
  data_week: [],
  data_today: [],
  data_info: [],
  data_comment: [],
  data_reaction: [],
  url: BASE_URL,
};
const News_Reducers = (data_state = news, actions) => {
  switch (actions.type) {
    case SET_DATA:
      return {...data_state, data: actions.payload};
    case SET_DATA_WEEK:
      return {...data_state, data_week: actions.payload};
    case SET_DATA_TODAY:
      return {...data_state, data_today: actions.payload};
    case SET_URL:
      return {...data_state, url: actions.payload};
    case SET_DATA_INFO:
      return {...data_state, data_info: actions.payload};
    case GET_NEWS_REACTION:
      return {...data_state, data_reaction: actions.payload};
    case GET_NEWS_COMMENT:
      return {...data_state, data_comment: actions.payload};
    default:
      return data_state;
  }
};
export default News_Reducers;