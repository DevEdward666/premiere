import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ACTION_GET_DEVICE,
  action_GET_notications,
  ACTION_NOTIF,
  signalr_connection,
  signalr_notify_connection,
  ACTION_SPINNER_ALERT,
  ACTION_LOADED,
} from '../Services/Actions/Default_Actions';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {action_GET_userdetails} from '../Services/Actions/Users_Actions';
import CustomBottomNavigation from './CustomBottomNavigation';
import {Actions} from 'react-native-router-flux';
const MainNavigation = () => {
  const hubconnectnotify = useSelector(
    (state) => state.Default_Reducers.hubconnect_notify,
  );
  const hubConnect = useSelector((state) => state.Default_Reducers.hubconnect);
  const [token, settoken] = useState('');
  const user_details = useSelector((state) => state.User_Reducers.userinfo);
  const base_url = useSelector((state) => state.Default_Reducers.base_url);
  const dispatch = useDispatch();
  const notification = useSelector(
    (state) => state.Default_Reducers.notification,
  );
  const [username, setusername] = useState('');
  AsyncStorage.getItem('tokenizer').then((item) => {
    let mounted = false;
    if (item == null) {
      Actions.home();
    }
    if (!mounted) {
      settoken(item);
    }
    return () => {
      mounted = true;
    };
  });
  AsyncStorage.getItem('username')
    .then((item) => {
      if (item == null) {
        Actions.home();
      }
      setusername(item);
    })
    .catch(() => {
      return controller.abort();
    });
  useEffect(() => {
    let mounted = true;
    const getdetailsofuser = async () => {
      if (mounted) {
        if (username) {
          dispatch(signalr_connection());
          dispatch(signalr_notify_connection());
          dispatch(ACTION_LOADED(true));
          dispatch(action_GET_userdetails(username));
          dispatch(ACTION_SPINNER_ALERT(false));
        }

        dispatch(ACTION_GET_DEVICE(getDeviceId() + '-' + getUniqueId()));
        AsyncStorage.setItem('prem_prem_id', user_details?.prem_id);
        AsyncStorage.setItem(
          'prem_fullname',
          `${user_details?.lastname}, ${user_details?.firstname}`,
        );
      }
    };

    mounted && getdetailsofuser();
    return () => {
      mounted = false;
    };
  }, [dispatch, username]);
  useEffect(() => {
    let mounted = true;
    const createHubConnection = () => {
      if (mounted) {
        try {
          hubconnectnotify.on('notifytoreact', (message) => {
            if (
              (message?.from !== '' && message?.to === user_details?.prem_id) ||
              message?.to === 'all'
            ) {
              dispatch(
                ACTION_NOTIF(
                  message.from + ' Notification',
                  message.notification,
                  user_details?.prem_id,
                  'high',
                ),
              );
            }
          });
        } catch (err) {
          console.log(err);
          console.log('Error while establishing connection: ' + {err});
        }
      }
    };
    mounted && createHubConnection();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;
    const getnotications = async () => {
      if (mounted) {
        if (user_details?.prem_id) {
          dispatch(action_GET_notications(user_details?.prem_id));
        }
      }
    };
    mounted && getnotications();
    return () => {
      mounted = false;
    };
  }, [dispatch, notification]);

  return <CustomBottomNavigation />;
};
export default MainNavigation;
