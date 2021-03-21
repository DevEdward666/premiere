import {BASE_URL} from '../Types/Default_Types';
import {SET_DATA} from '../Types/Events_Types';

export const action_GET_events = () => async (dispatch) => {
  var url = `${BASE_URL}/api/manage/getEvents`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      try {
        responseData = await response.json();
      } catch (e) {
        dispatch({
          type: SET_DATA,
          payload: res.data,
        });
      }
    });
};
