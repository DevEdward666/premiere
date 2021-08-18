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
import DoctorsScreen from '../Doctors/DoctorsScreen';
import ExploreScreen from '../News/NewsHeader/UINews';
import Notification from '../Notifications/Notifications';
import ServicesScreen from '../ServicesScreen';
import {action_GET_userdetails} from '../Services/Actions/Users_Actions';
import MeScreen from '../Me/MeScreen';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {SafeAreaView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
  dark: false,
  colors: {
    primary: 'white',
    background: '#ffffff',

    card: '#034c81',
    text: 'white',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
import styles from '../News/NewsHeader/styles';
function BottomNavigation() {
  const user_details = useSelector((state) => state.User_Reducers.userinfo);
  const base_url = useSelector((state) => state.Default_Reducers.base_url);
  const dispatch = useDispatch();
  const [username, setusername] = useState('');
  const [logoImage, setlogoImage] = useState(
    require('../assets/icons/PremiereIcon2.png'),
  );
  const notification = useSelector(
    (state) => state.Default_Reducers.notification,
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
  const appState = useRef(AppState.currentState);
  const [loaded, setloaded] = useState(false);
  const spinner = useSelector((state) => state.Default_Reducers.spinneralert);
  useEffect(() => {
    let mounted = true;
    const loaded = () => {
      if (mounted) {
        setloaded(true);
      }
    };
    mounted && loaded();
    return () => {
      mounted = false;
    };
  }, []);
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
        screenOptions={{headerShown: true, headerLeft: null}}>
        <Stack.Screen name="Me" component={MeScreen} />
      </Stack.Navigator>
    );
  }
  function ExploreStack() {
    return (
      <Stack.Navigator
        initialRouteName="Explore"
        screenOptions={{headerShown: true, headerLeft: null}}>
        <Stack.Screen name="Explore" component={ExploreScreen} />
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

  function NotificationStack() {
    return (
      <Stack.Navigator
        initialRouteName="Notifications"
        screenOptions={{headerShown: true, headerLeft: null}}>
        <Stack.Screen name="Notifications" component={Notification} />
      </Stack.Navigator>
    );
  }
  function DoctorsStack() {
    return (
      <Stack.Navigator
        initialRouteName="Me"
        screenOptions={{headerShown: true}}>
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
            initialRouteName="Menu"
            screenOptions={({route}) => ({
              lazyLoad: true,
              style: {backgroundColor: '#c70e05'},
              headerShown: false,
              tabBarIcon: ({color, size}) => {
                const icons = {
                  ExploreStack: 'facebook-workplace',
                  DoctorsStack: 'doctor',
                  Services: 'hand-heart',
                  Notification: 'bell',
                  MeStack: 'account',
                };

                return (
                  <MaterialCommunityIcons
                    name={icons[route.name]}
                    color={color}
                    size={size}
                  />
                );
              },
              style: {
                backgroundColor: '#c70e05',
              },
            })}>
            <Tab.Screen name="ExploreStack" component={ExploreStack} />

            <Tab.Screen name="DoctorsStack" component={DoctorsStack} />

            <Tab.Screen name="Services" component={ServicesStack} />
            <Tab.Screen name="Notification" component={NotificationStack} />
            <Tab.Screen name="MeStack" component={MeStack} />
          </Tab.Navigator>
          {/* </UserInactivity> */}
        </NavigationContainer>
      </AnimatedSplash>
    </>
  );
}
export default BottomNavigation;
