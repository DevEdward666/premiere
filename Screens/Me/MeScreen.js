import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ImageBackground
} from 'react-native';
import {Card, makeStyles} from 'react-native-elements'
import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_GET_Docs,
  action_GET_Profileimage,
  action_GET_userdetails,
} from '../../Services/Actions/Users_Actions';
import wait from '../../Plugins/waitinterval';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
import styles from './style'
import MeHeader from './MeHeader';
import MeBody from './MeBody';
const MeScreen = () => {
  const currentyear = new Date();
  const thisyear = currentyear.getFullYear();
  const [username, setUsername] = useState('');

  const [loading, setLoading] = useState(1);
  const [value, setValue] = useState(false);
  const mountedRef = useRef();
  const [refreshing, setRefreshing] = useState(false);

  AsyncStorage.getItem('tokenizer').then(async(item) => {
    let mounted=true
    if (mounted)
    if (item == null) {
      Actions.home();
    }
    return()=>{
      unmount=true
    }
  });
  AsyncStorage.getItem('username').then(async(item) => {
    let unmount=true
    if(unmount){
    if (item == null) {
      Actions.home();
    }
  
    await  setUsername(item);
    await setValue(false);
    }
return()=>{
  unmount=false
}
  });

  
 

  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);

  const [img, setimg] = useState('');
  const [doc, setdoc] = useState('');
  const onRefresh = React.useCallback(async () => {
    let mounted = true;
    if(mounted){
       dispatch(action_GET_userdetails(username));
  
      await setRefreshing(true);
      await setimg(users_reducers?.img);
      await setdoc(users_reducers?.doc);
    
       dispatch(action_GET_Profileimage(img));
       dispatch(action_GET_Docs(doc));
    }

    return ()=> {mounted=false}
  }, [dispatch, img, doc]);
  useEffect(() => {
    let mounted = true;
    const getprofileimageanddocs = async() => {
      if(mounted){
        if (users_reducers?.img != undefined) {
          dispatch(action_GET_Profileimage(users_reducers?.img));
          dispatch(action_GET_Docs(users_reducers?.doc));
        }
   
          await setRefreshing(false);
        
          await setimg(users_reducers?.img);
          await setdoc(users_reducers?.doc);

          dispatch(action_GET_Profileimage(img));
          dispatch(action_GET_Docs(doc));
      
      };
      }


    mounted && getprofileimageanddocs();
    return () => {mounted = false};
  }, [dispatch, img, doc]);


  const getMeInfo = async () => {
    let mounted = true;
    if(mounted){
    await Actions.profile();
    }  
    return () => {mounted = false};
  };
  return (
   
    <ScrollView
  
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
<ImageBackground
    style={{flex: 1}}
    source={require('../../assets/background/white.jpg')}
    resizeMode="cover"
    blurRadius={20}>
      <View style={styles.container}>
        {/* <Appbar.Header style={{backgroundColor: '#00a15b'}}>
        <Appbar.Content title="Premiere" />
      </Appbar.Header> */}
      
          <View style={{flex: 1, flexDirection: 'column'}} >
            <TouchableHighlight   onPress={() => getMeInfo()} underlayColor="white">
           <MeHeader />
            </TouchableHighlight>
             <MeBody/>
            <View style={{flexDirection: 'row', height: 50}}>
              <View
                style={{width: '100%', height: 50, justifyContent: 'center'}}>
                <Text
                  style={styles.footertext}>
                  Powered by TUO @ {thisyear}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
   
  );
};

MeScreen.propTypes = {};

export default MeScreen;
