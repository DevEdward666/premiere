import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ACTION_GET_DEVICE,
  action_GET_notications,
  ACTION_NOTIF,
  signalr_connection,
  signalr_notify_connection,
  ACTION_SPINNER_ALERT,
  ACTION_LOADED,
  signalr_notify_connection_from_queue,
} from '../Services/Actions/Default_Actions';
import {getDeviceId, getUniqueId} from 'react-native-device-info';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {action_GET_userdetails} from '../Services/Actions/Users_Actions';
import CustomBottomNavigation from './CustomBottomNavigation';
import {action_passbase_get_single_info} from '../../Services/Actions/PassbaseActions';
import {Actions} from 'react-native-router-flux';
const MainNavigation = () => {
  const hubconnectnotify = useSelector(
    (state) => state.Default_Reducers.hubconnect_notify,
  );
  const hubconnectnotifyfromqueue = useSelector(
    (state) => state.Default_Reducers.hubconnect_notify_from_queue,
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
    settoken(item);
  });
  AsyncStorage.getItem('username').then((item) => {
    setusername(item);
  });
  // useEffect(() => {
  //   let mounted = true;
  //   const gettoken = () => {
  //     if (mounted) {

  //     }
  //   };
  //   mounted && gettoken();
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  useEffect(() => {
    let mounted = true;
    const getdetailsofuser = async () => {
      if (mounted) {
        if (username) {
          dispatch(signalr_connection());
          dispatch(signalr_notify_connection_from_queue());
          dispatch(signalr_notify_connection());
          dispatch(ACTION_LOADED(true));
          dispatch(action_GET_userdetails(username));
          dispatch(ACTION_SPINNER_ALERT(false));
        }

        dispatch(ACTION_GET_DEVICE(getDeviceId() + '-' + getUniqueId()));
        // AsyncStorage.setItem('prem_id', user_details?.prem_id);
        // AsyncStorage.setItem(
        //   'prem_fullname',
        //   `${user_details?.lastname}, ${user_details?.firstname}`,
        // );
      }
    };

    mounted && getdetailsofuser();
    return () => {
      mounted = false;
    };
  }, [dispatch,username]);
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
    const createHubConnection = () => {
      if (mounted) {
        try {
          hubconnectnotifyfromqueue.on('notifyfrommobile', (message) => {
            dispatch(
              ACTION_NOTIF(
                'Queue No. ' + message?.notification,
                'Please go to ' + message?.type + ' Counter' + message?.to,
                'Counter' + message?.to,
                'high',
              ),
            );
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
          dispatch(action_passbase_get_single_info(user_details?.passbase_id));
        }
      }
    };
    mounted && getnotications();
    return () => {
      mounted = false;
    };
  }, [dispatch, user_details?.prem_id,user_details?.passbase_id]);

  return <CustomBottomNavigation />;
};
export default MainNavigation;
