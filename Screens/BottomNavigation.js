import 'react-native-gesture-handler';

import React, {useEffect} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import MeScreen from '../Screens/MeScreen';
import ServicesScreen from '../Screens/ServicesScreen';
import ExploreScreen from '../Screens/UINews';
import DoctorsScreen from '../Screens/DoctorsScreen';
import {
  action_GET_Docs,
  action_GET_Profileimage,
  action_GET_userdetails,
} from '../Services/Actions/Users_Actions';
import {useDispatch} from 'react-redux';
AsyncStorage.getItem('tokenizer').then((item) => {
  if (item == null) {
    Actions.home();
  }
});
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
function DoctorsStack() {
  return (
    <Stack.Navigator initialRouteName="Me" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Doctors" component={DoctorsScreen} />
    </Stack.Navigator>
  );
}

// function SettingsStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Settings"
//       screenOptions={{
//         headerStyle: {backgroundColor: '#42f44b'},
//         headerTintColor: '#fff',
//         headerTitleStyle: {fontWeight: 'bold'},
//       }}>
//       <Stack.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{title: 'Setting Page'}}
//       />
//       <Stack.Screen
//         name="Details"
//         component={DetailsScreen}
//         options={{title: 'Details Page'}}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{title: 'Profile Page'}}
//       />
//     </Stack.Navigator>
//   );
// }

function BottomNavigation() {
  const dispatch = useDispatch();
  AsyncStorage.getItem('username').then((item) => {
    if (item == null) {
      Actions.home();
    }
    dispatch(action_GET_userdetails(item));
  });
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
export default BottomNavigation;
