import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AppState, Button} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';

import 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import CustomPushNotif from '../Plugins/CustomPushNotif';
import wait from '../Plugins/waitinterval';
import DoctorsScreen from '../Doctors/DoctorsScreen';
import ExploreScreen from '../News/NewsHeader/UINews';
import Notification from '../Notifications/Notifications';
import ServicesScreen from '../ServicesScreen';
import {action_GET_userdetails} from '../Services/Actions/Users_Actions';
import MeScreen from '../Me/MeApps/MeAppsUI';
import LoginScreen from '../Login/LoginScreen';
import UpdateInfoUI from '../Me/UpdateInfo/UpdateInfoUI';
import WaitForStatusUpdate from '../Me/UpdateInfo/WaitForStatusUpdate';
import DeclinedInfo from '../Me/UpdateInfo/DeclinedStatus';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {SafeAreaView, Text} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {action_passbase_get_single_info} from '../../Services/Actions/PassbaseActions';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
  dark: false,
  colors: {
    primary: '#0084FF',
    background: '#ffffff',

    card: 'white',
    text: '#0084FF',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
import styles from '../News/NewsHeader/styles';
import {View} from 'react-native';
function BottomNavigation() {
  const user_details = useSelector((state) => state.User_Reducers.userinfo);
  const base_url = useSelector((state) => state.Default_Reducers.base_url);
  const passbase_data = useSelector(
    (state) => state.PassbaseReducers.passbase_data,
  );
  const dispatch = useDispatch();
  const [username, setusername] = useState('');
  const [updated, setupdated] = useState(false);
  const [inprocess, setprocessing] = useState(false);
  const [isdeclined, setdeclined] = useState(false);
  const [logoImage, setlogoImage] = useState(
    require('../assets/icons/PremiereIcon2.png'),
  );
  const notification = useSelector(
    (state) => state.Default_Reducers.notification,
  );
  const hideheader = useSelector((state) => state.Default_Reducers.hideheader);
  const [token, settoken] = useState('');
  const [loggedin, setloggedin] = useState(false);
  AsyncStorage.getItem('tokenizer').then((item) => {
    settoken(item);
  });
  // useEffect(() => {
  //   let mounted = true;
  //   const gettoken = () => {
  //     if (mounted) {
  //       AsyncStorage.getItem('tokenizer').then((item) => {
  //         settoken(item);
  //       });
  //     }
  //   };
  //   mounted && gettoken();
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);
  const [active, setActive] = useState(true);
  // const [timer, setTimer] = useState(60000);
  const [refresh, setrefresh] = useState(0);
  const appState = useRef(AppState.currentState);
  const [loaded, setloaded] = useState(false);
  const spinner = useSelector((state) => state.Default_Reducers.spinneralert);
  useEffect(() => {
    let mounted = true;
    const loaded = async () => {
      if (mounted) {
        dispatch(action_passbase_get_single_info(user_details?.passbase_id));
        await setloaded(true);
        if (token !== null) {
          await setloggedin(true);
          if (!user_details?.active) {
            await setprocessing(false);
            await setupdated(false);
          } else {
            if (passbase_data?.status !== undefined) {
              if (passbase_data?.status === 'processing') {
                await setprocessing(true);
                await setupdated(false);
              } else if (passbase_data?.status === 'pending') {
                await setprocessing(true);
                await setupdated(false);
                await setdeclined(false);
              } else if (passbase_data?.status === 'approved') {
                await setprocessing(false);
                await setdeclined(false);
                await setupdated(true);
              } else if (passbase_data?.status === 'declined') {
                await setprocessing(false);
                await setupdated(false);
                await setdeclined(true);
              }
            } else {
              await setprocessing(false);
              await setupdated(false);
            }
          }
        } else {
          await setloggedin(false);
        }
      }
    };
    mounted && loaded();
    return () => {
      mounted = false;
    };
  }, [
    dispatch,
    token,
    passbase_data?.status,
    user_details?.active,
    user_details?.passbase_id,
  ]);
  console.log(passbase_data?.status);
  const handleProfileClick = useCallback(() => {
    dispatch(action_passbase_get_single_info(user_details?.passbase_id));

    if (token !== null) {
      if (inprocess) {
        Actions.waiting();
      } else if (isdeclined) {
        Actions.declined_info();
      } else if (updated) {
        Actions.me();
      } else {
        Actions.update_info();
      }
    } else {
      Actions.home();
    }
  }, [token, passbase_data?.status, user_details?.passbase_id, dispatch]);

  const handleNotifClick = useCallback(() => {
    dispatch(action_passbase_get_single_info(user_details?.passbase_id));

    if (token !== null) {
      if (inprocess) {
        Actions.waiting();
      } else if (isdeclined) {
        Actions.declined_info();
      } else if (updated) {
        Actions.notif();
      } else {
        Actions.update_info();
      }
    } else {
      Actions.home();
    }
  }, [token]);
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
        screenOptions={{
          headerShown: false,
          headerLeft: null,
        }}>
        {loggedin ? (
          user_details?.active === 'false' ? (
            <Stack.Screen name="Update Info" component={UpdateInfoUI} />
          ) : inprocess ? (
            <Stack.Screen name="Waiting" component={WaitForStatusUpdate} />
          ) : isdeclined ? (
            <Stack.Screen name="Declined" component={DeclinedInfo} />
          ) : updated ? (
            <Stack.Screen name="Me" component={MeScreen} />
          ) : (
            <Stack.Screen name="Update Info" component={UpdateInfoUI} />
          )
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    );
  }
  function ExploreStack() {
    return (
      <Stack.Navigator
        initialRouteName="Explore"
        screenOptions={{
          headerShown: true,

          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <IconButton
                icon="bell"
                color={'#0084FF'}
                size={30}
                onPress={() => handleNotifClick()}
              />
              <IconButton
                icon="account-circle"
                color={'#0084FF'}
                size={30}
                onPress={() => handleProfileClick()}
              />
            </View>
          ),
        }}>
        <Stack.Screen name="Premiere" component={ExploreScreen} />
      </Stack.Navigator>
    );
  }
  function ServicesStack() {
    return (
      <Stack.Navigator
        initialRouteName="Services"
        screenOptions={{headerShown: true, headerLeft: null}}>
        <Stack.Screen name="Services" component={ServicesScreen} />
      </Stack.Navigator>
    );
  }

  // function NotificationStack() {
  //   return (
  //     <Stack.Navigator
  //       initialRouteName="Notifications"
  //       screenOptions={{
  //         headerShown: loggedin
  //           ? user_details?.active === 'false'
  //             ? false
  //             : true
  //           : false,
  //         headerLeft: null,
  //       }}>
  //       {loggedin ? (
  //         user_details?.active === 'false' ? (
  //           <Stack.Screen name="Update Info" component={UpdateInfoUI} />
  //         ) : passbase_data?.status === 'processing' ? (
  //           <Stack.Screen name="Update Info" component={UpdateInfoUI} />
  //         ) : passbase_data?.status === 'declined' ? (
  //           <Stack.Screen name="Declined" component={DeclinedInfo} />
  //         ) : (
  //           <Stack.Screen name="Notifications" component={Notification} />
  //         )
  //       ) : (
  //         <Stack.Screen name="Login" component={LoginScreen} />
  //       )}
  //     </Stack.Navigator>
  //   );
  // }
  function DoctorsStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen name="Doctors" component={DoctorsScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <>
      <AnimatedSplash
        isLoaded={loaded}
        logoImage={logoImage}
        // backgroundColor={'rgba(255,255,355,0.4)'}
        logoHeight={100}
        logoWidth={100}>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

        <NavigationContainer theme={MyTheme}>
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
            shifting={true}
            initialRouteName="Menu"
            screenOptions={({route}) => ({
              lazyLoad: true,
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIconStyle: {alignSelf: 'center'},
              tabBarIcon: ({color, size}) => {
                const icons = {
                  Explore: 'newspaper',
                  Doctors: 'doctor',
                  Services: 'hand-heart',
                  // Notification: 'bell',
                  Me: 'menu',
                };

                return (
                  <View>
                    <MaterialCommunityIcons
                      name={icons[route.name]}
                      color={color}
                      size={29}
                    />
                  </View>
                );
              },
            })}>
            <Tab.Screen
              name="Explore"
              title="Explore"
              component={ExploreStack}
            />
            <Tab.Screen name="Doctors" component={DoctorsStack} />
            <Tab.Screen name="Services" component={ServicesStack} />
            {/* <Tab.Screen name="Notification" component={NotificationStack} /> */}
            <Tab.Screen name="Me" component={MeStack} />
          </Tab.Navigator>
          {/* </UserInactivity> */}
        </NavigationContainer>
      </AnimatedSplash>
    </>
  );
}
export default BottomNavigation;
