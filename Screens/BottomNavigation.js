import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {getDeviceId, getUniqueId} from 'react-native-device-info';
import 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import CustomPushNotif from '../Plugins/CustomPushNotif';
import wait from '../Plugins/waitinterval';
import DoctorsScreen from '../Screens/Doctors/DoctorsScreen';
import ExploreScreen from '../Screens/News/NewsHeader/UINews';
import Notification from '../Screens/Notifications/Notifications';
import ServicesScreen from '../Screens/ServicesScreen';
import {
  ACTION_GET_DEVICE,
  action_GET_notications,
  ACTION_NOTIF,
  signalr_connection,
  signalr_notify_connection,
  ACTION_SPINNER_ALERT,
} from '../Services/Actions/Default_Actions';
import {action_GET_userdetails} from '../Services/Actions/Users_Actions';
import MeScreen from './Me/MeScreen';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {SafeAreaView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import styles from '../Screens/News/NewsHeader/styles';
function BottomNavigation() {
  const user_details = useSelector((state) => state.User_Reducers.userinfo);
  const base_url = useSelector((state) => state.Default_Reducers.base_url);
  const dispatch = useDispatch();
  const [username, setusername] = useState('');
  const [logoImage, setlogoImage] = useState(
    require('../assets/icons/PremiereIcon2.png'),
  );
  const [token, settoken] = useState('');
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
  const [active, setActive] = useState(true);
  // const [timer, setTimer] = useState(60000);
  const [refresh, setrefresh] = useState(0);
  const [loaded, setloaded] = useState(false);
  const appState = useRef(AppState.currentState);
  const hubConnect = useSelector((state) => state.Default_Reducers.hubconnect);

  const spinner = useSelector((state) => state.Default_Reducers.spinneralert);

  const hubconnectnotify = useSelector(
    (state) => state.Default_Reducers.hubconnect_notify,
  );
  const notification = useSelector(
    (state) => state.Default_Reducers.notification,
  );
  const [timer, setTimer] = useState(5000);
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
          wait(500).then(() => {
            dispatch(signalr_connection());
            dispatch(signalr_notify_connection());
            setloaded(true);
          });
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
  }, [hubconnectnotify, dispatch]);

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

  // useEffect(() => {
  //   let mounted = true;
  //   const stateapp=async ()=>{

  //    await AppState.addEventListener('change', handleChange);

  //     return () => {
  //       AppState.removeEventListener('change', handleChange);
  //     };
  //   }
  //  mounted && stateapp();
  //  return ()=> {mounted=false};
  // }, []);

  // const handleChange = (newState) => {
  //   console.log(newState)
  //   if (appState.current.match(/inactive|background/) && newState === "active" &&  token !==null)  {

  //     Actions.pin();

  //   }else if (appState.current==="active"){
  //     Actions.pin();
  //   }
  // };

  // useEffect(() => {
  //   let mounted = false;
  //   const checkislocked = async () => {

  //     if (!appState.current === "inactive" && token!=="") {
  //       await Actions.pin();
  //        dispatch(action_update_userlocked(user_details?.username, 'true'));
  //     }
  //   };
  //   mounted && checkislocked();
  //   return () => {mounted = true};
  // }, [dispatch]);

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
      <Stack.Navigator
        initialRouteName="Me"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Doctors" component={DoctorsScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <AnimatedSplash
        translucent={true}
        isLoaded={loaded}
        logoImage={logoImage}
        // backgroundColor={'rgba(255,255,355,0.4)'}
        logoHeight={300}
        logoWidth={300}>
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
            activeBackgroundColor="#1dc259"
            tabBarOptions={{
              activeTintColor: 'white',
              inactiveTintColor: '#cdcfd1',
              style: {
                backgroundColor: '#40ac49',
              },
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
                  <MaterialCommunityIcons
                    name="doctor"
                    color={color}
                    size={size}
                  />
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
                  <MaterialCommunityIcons
                    name="bell"
                    color={color}
                    size={size}
                  />
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
      </AnimatedSplash>
    </>
  );
}
export default BottomNavigation;
