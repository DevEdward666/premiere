import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import DoctorsScreen from '../Screens/DoctorsScreen';
import MeScreen from '../Screens/MeScreen';
import ServicesScreen from '../Screens/ServicesScreen';
import ExploreScreen from '../Screens/UINews';
import Notification from '../Screens/Notifications/Notifications';
import CustomUserInactivity from '../Plugins/CustomUserInactivity';
import {
  action_GET_userdetails,
  action_update_userlocked,
} from '../Services/Actions/Users_Actions';
import wait from '../Plugins/waitinterval';
import UserInactivity from 'react-native-user-inactivity';
import {
  signalr_connection,
  signalr_notify_connection,
  ACTION_GET_DEVICE,
  action_GET_notications,
} from '../Services/Actions/Default_Actions';
import CustomPushNotif from '../Plugins/CustomPushNotif';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import {
  getDeviceId,
  getDeviceName,
  getUniqueId,
} from 'react-native-device-info';
import {ACTION_NOTIF} from '../Services/Actions/Default_Actions';
function MeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Me"
      screenOptions={{headerShown: false, headerLeft: null}}>
      <Stack.Screen name="Me" component={MeScreen} />
    </Stack.Navigator>
  );
}
function ExploreStack() {
  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{headerShown: false, headerLeft: null}}>
      <Stack.Screen name="Explore" component={ExploreScreen} />
    </Stack.Navigator>
  );
}
function ServicesStack() {
  return (
    <Stack.Navigator
      initialRouteName="Services"
      screenOptions={{headerShown: false, headerLeft: null}}>
      <Stack.Screen name="Services" component={ServicesScreen} />
    </Stack.Navigator>
  );
}

function NotificationStack() {
  return (
    <Stack.Navigator
      initialRouteName="Notifications"
      screenOptions={{headerShown: false, headerLeft: null}}>
      <Stack.Screen name="Notifications" component={Notification} />
    </Stack.Navigator>
  );
}
function DoctorsStack() {
  return (
    <Stack.Navigator initialRouteName="Me" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Doctors" component={DoctorsScreen} />
    </Stack.Navigator>
  );
}

function BottomNavigation() {
  const user_details = useSelector((state) => state.User_Reducers.userinfo);
  const base_url = useSelector((state) => state.Default_Reducers.base_url);
  const dispatch = useDispatch();
  const [username, setusername] = useState('');
  const [token, settoken] = useState('');
  AsyncStorage.getItem('tokenizer').then((item) => {
    if (item == null) {
      Actions.home();
    }
    settoken(item);
  });
  AsyncStorage.getItem('username').then((item) => {
    if (item == null) {
      Actions.home();
    }
    setusername(item);
  });

  const [active, setActive] = useState(true);
  // const [timer, setTimer] = useState(60000);
  const [refresh, setrefresh] = useState(0);
  const hubConnect = useSelector((state) => state.Default_Reducers.hubconnect);
  const hubconnectnotify = useSelector(
    (state) => state.Default_Reducers.hubconnect_notify,
  );
  const notification = useSelector(
    (state) => state.Default_Reducers.notification,
  );
  // const [timer, setTimer] = useState(5000);

  useEffect(() => {
    let mounted = true;
    const createHubConnection = () => {
      try {
        hubconnectnotify.on('notifytoreact', async (message) => {
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
    };
    mounted && createHubConnection();
    return () => (mounted = false);
  }, [hubconnectnotify, dispatch]);

  useEffect(() => {
    let mounted = true;
    const getdetailsofuser = async () => {
      wait(500).then(() => {
        dispatch(signalr_connection());
        dispatch(signalr_notify_connection());
      });
      dispatch(action_GET_userdetails(username));
      dispatch(ACTION_GET_DEVICE(getDeviceId() + '-' + getUniqueId()));
    };
    mounted && getdetailsofuser();
    return () => (mounted = false);
  }, [dispatch, username]);
  useEffect(() => {
    let mounted = true;
    const getnotications = async () => {
      dispatch(action_GET_notications(user_details?.prem_id));
    };
    mounted && getnotications();
    return () => (mounted = false);
  }, [dispatch, notification]);

  useEffect(() => {
    AppState.addEventListener('change', handleChange);

    return () => {
      AppState.removeEventListener('change', handleChange);
    };
  }, []);

  // const hubConnection = new signalR.HubConnectionBuilder()
  //   .withUrl(`${base_url}/api/message`)
  //   .build();
  // hubConnection.start();
  // var list = [];

  // // const MessageProps = () => {
  // //   signalR.HubConnection;
  // // };

  // const Message = () => {
  //   const messageProps = signalR.HubConnection;
  //   const [date, setDate] = useState(Date);
  //   useEffect(() => {
  //     let mounted = true;

  //     const messages = () => {
  //       signalR.HubConnection.on('sendToReact', (message) => {
  //         list.push(message);
  //         setDate(new Date());
  //       });
  //     };
  //     mounted && messages();
  //     return () => (mounted = false);
  //   }, []);
  //   return list.map((message, index) => console.log(message));
  // };
  const handleChange = (newState) => {
    // if (newState === 'inactive') {
    //   Actions.pin();
    // }
  };
  // useEffect(() => {
  //   let mounted = true;
  //   const checkislocked = async () => {
  //     if (!active) {
  //       await Actions.pin();
  //       await dispatch(action_update_userlocked(username, 'true'));
  //     }
  //   };
  //   mounted && checkislocked();
  //   return () => (mounted = false);
  // }, [dispatch, active, username]);
  // useEffect(() => {
  //   let mounted = true;
  //   const checkislocked = async () => {
  //     if (user_details?.isLocked) {
  //       Actions.pin();
  //     }
  //   };
  //   mounted && checkislocked();
  //   return () => (mounted = false);
  // }, []);
  // console.log(user_details?.isLocked);
  return (
    <NavigationContainer>
      <CustomPushNotif
        notfititle={notification?.title}
        notifbody={notification?.body}
        to={notification?.to}
        type={notification?.type}
      />
      {/* <UserInactivity
        isActive={active}
        timeForInactivity={timer}
        onAction={(isActive) => {
          setActive(isActive);
        }}> */}
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#000',
        }}>
        <Tab.Screen
          name="ExploreStack"
          component={ExploreStack}
          options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="facebook-workplace"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="DoctorsStack"
          component={DoctorsStack}
          options={{
            tabBarLabel: 'Doctors',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="doctor" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Services"
          component={ServicesStack}
          options={{
            tabBarLabel: 'Services',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="hand-heart"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationStack}
          options={{
            tabBarLabel: 'Notification',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="MeStack"
          component={MeStack}
          options={{
            tabBarLabel: 'Me',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
      {/* </UserInactivity> */}
    </NavigationContainer>
  );
}
export default BottomNavigation;
