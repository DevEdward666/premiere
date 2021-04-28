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
} from 'react-native';
import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_GET_Docs,
  action_GET_Profileimage,
  action_GET_userdetails,
} from '../Services/Actions/Users_Actions';
import wait from '../Plugins/waitinterval';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const MeScreen = () => {
  const currentyear = new Date();
  const thisyear = currentyear.getFullYear();
  const [username, setUsername] = useState('');
  const [premid, setpremid] = useState('');
  const [fullname, setFullname] = useState('');
  const [loading, setLoading] = useState(1);
  const [value, setValue] = useState(false);
  const mountedRef = useRef();
  const [refreshing, setRefreshing] = useState(false);

  AsyncStorage.getItem('tokenizer').then((item) => {
    if (item == null) {
      Actions.home();
    }
  });
  AsyncStorage.getItem('username').then((item) => {
    if (item == null) {
      Actions.home();
    }
    setUsername(item);
    setValue(false);
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
    },
  });
  const removeValue = async () => {
    try {
      await AsyncStorage.getAllKeys().then((keys) =>
        AsyncStorage.multiRemove(keys),
      );
      await Actions.home();
    } catch (e) {
      // remove error
    }
  };

  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const users_image = useSelector((state) => state.User_Reducers.image);
  const gotoqr = async () => {
    await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
    Actions.qrscreen();
  };
  const gotoapps = useCallback(async () => {
    await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
    Actions.uiapps();
  });
  const gotolink = async () => {
    if (users_reducers?.patno === null) {
      await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
      Actions.link();
    } else {
      Actions.medicalrecords();
    }
  };
  const gotomessage = async () => {
    await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
    Actions.message();
  };
  const gotosafedavaoqr = async () => {
    await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
    Actions.safedavaoqr();
  };
  const gotocalendar = async () => {
    //  await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
    Actions.calendar();
  };
  const [img, setimg] = useState('');
  const [doc, setdoc] = useState('');
  // useEffect(() => {
  //   let mounted = true;
  //   const getuserdetails = () => {
  //     dispatch(action_GET_userdetails(username));
  //     if (users_reducers?.img != undefined) {
  //       setimg(users_reducers?.img);
  //       setdoc(users_reducers?.doc);
  //     }
  //   };

  //   mounted && getuserdetails();
  //   return () => (mounted = false);
  // }, [dispatch, username]);
  const onRefresh = React.useCallback(async () => {
    await setRefreshing(true);
    await setimg(users_reducers?.img);
    await setdoc(users_reducers?.doc);
    await dispatch(action_GET_Profileimage(img));
    await dispatch(action_GET_Docs(doc));
    wait(200).then(() => {
      setRefreshing(false);
    });
  }, [dispatch, img, doc]);
  useEffect(() => {
    let mounted = true;
    const getprofileimageanddocs = () => {
      if (users_reducers?.img != undefined) {
        dispatch(action_GET_Profileimage(users_reducers?.img));
        dispatch(action_GET_Docs(users_reducers?.doc));
      }
      wait(200).then(() => {
        setRefreshing(false);
        setimg(users_reducers?.img);
        setdoc(users_reducers?.doc);
        dispatch(action_GET_Profileimage(img));
        dispatch(action_GET_Docs(doc));
      });
    };

    mounted && getprofileimageanddocs();
    return () => (mounted = false);
  }, [dispatch, img, doc]);

  let imageUri = 'data:image/png;base64,' + users_image;
  const getMeInfo = async () => {
    await Actions.profile();
  };
  return (
    <ScrollView
      style={{backgroundScrollViewColor: '#f7f7f7'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        {/* <Appbar.Header style={{backgroundColor: '#00a15b'}}>
        <Appbar.Content title="Premiere" />
      </Appbar.Header> */}
        <View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableHighlight onPress={() => getMeInfo()}>
              <CardView radius={1} backgroundColor={'#ffffff'}>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '30%', height: 100, margin: 5}}>
                    <Image
                      style={{
                        marginTop: 10,
                        marginStart: 10,
                        width: 80,
                        height: 80,
                        borderRadius: 200 / 2,
                        overflow: 'hidden',
                        borderWidth: 3,
                      }}
                      source={{uri: imageUri, scale: 1}}
                    />
                  </View>
                  <View
                    style={{
                      width: '60%',
                      height: 100,
                      justifyContent: 'center',
                    }}>
                    <Text style={{textAlign: 'left', fontSize: 12}}>
                      {users_reducers?.lastname},{users_reducers?.firstname}
                    </Text>
                    <Text style={{textAlign: 'left', fontSize: 12}}>
                      Premiere ID: {users_reducers?.prem_id}
                    </Text>
                  </View>
                </View>
              </CardView>
            </TouchableHighlight>
            <CardView radius={1} backgroundColor={'#ffffff'}>
              <TouchableHighlight
                onPress={() => gotolink()}
                underlayColor="#f7f7f7">
                <View
                  style={{
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        marginStart: 10,
                        fontSize: 14,
                        alignContent: 'center',
                      }}>
                      Medical Records
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '10%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        height: 50,
                        width: '100%',
                        resizeMode: 'center',
                        alignContent: 'flex-start',
                      }}
                      source={require('../assets/icons/ic_admission_prem-playstore.png')}
                    />
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => gotomessage()}
                underlayColor="#f7f7f7">
                <View
                  style={{
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        marginStart: 10,
                        fontSize: 14,
                        alignContent: 'center',
                      }}>
                      Messages
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '10%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        height: 50,
                        width: '100%',
                        resizeMode: 'center',
                        alignContent: 'flex-start',
                      }}
                      source={require('../assets/icons/messages.png')}
                    />
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => gotoapps()}
                underlayColor="#f7f7f7">
                <View
                  style={{
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        marginStart: 10,
                        fontSize: 14,
                        alignContent: 'center',
                      }}>
                      Apps
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '10%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        height: 50,
                        width: '100%',
                        resizeMode: 'center',
                        alignContent: 'flex-start',
                      }}
                      source={require('../assets/icons/apps.png')}
                    />
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => gotoqr()}
                underlayColor="#f7f7f7">
                <View
                  style={{
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        marginStart: 10,
                        fontSize: 14,
                        alignContent: 'center',
                      }}>
                      My QR
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '10%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        height: 50,
                        width: '100%',
                        resizeMode: 'center',
                        alignContent: 'flex-start',
                      }}
                      source={require('../assets/icons/ic_my_qr_prem-playstore.png')}
                    />
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => gotosafedavaoqr()}
                underlayColor="#f7f7f7">
                <View
                  style={{
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        marginStart: 10,
                        fontSize: 14,
                        alignContent: 'center',
                      }}>
                      Safe Davao QR
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '10%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        height: 50,
                        width: '100%',
                        resizeMode: 'center',
                        alignContent: 'flex-start',
                      }}
                      source={require('../assets/icons/ic_safedavao_prem-playstore.png')}
                    />
                  </View>
                </View>
              </TouchableHighlight>

              <View
                style={{
                  flexDirection: 'row',
                  height: 70,
                  alignItems: 'center',
                }}>
                <View
                  style={{width: '80%', height: 50, justifyContent: 'center'}}>
                  <Text
                    style={{
                      textAlign: 'left',
                      marginStart: 10,
                      fontSize: 14,
                      alignContent: 'center',
                    }}>
                    Health Declaration
                  </Text>
                </View>
                <View
                  style={{width: '10%', height: 50, justifyContent: 'center'}}>
                  <Image
                    style={{
                      height: 50,
                      width: '100%',
                      resizeMode: 'center',
                      alignContent: 'flex-start',
                    }}
                    source={require('../assets/icons/ic_healthdeclaration_prem-playstore.png')}
                  />
                </View>
              </View>
              <TouchableHighlight
                onPress={() => gotocalendar()}
                underlayColor="#f7f7f7">
                <View
                  style={{
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        marginStart: 10,
                        fontSize: 14,
                        alignContent: 'center',
                      }}>
                      Calendar
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '10%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        height: 50,
                        width: '100%',
                        resizeMode: 'center',
                        alignContent: 'flex-start',
                      }}
                      source={require('../assets/icons/ic_calendar_prem-playstore.png')}
                    />
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => removeValue()}
                underlayColor="#f7f7f7">
                <View
                  style={{
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        marginStart: 10,
                        fontSize: 14,
                        alignContent: 'center',
                      }}>
                      Logout
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '10%',
                      height: 50,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        height: 50,
                        width: '100%',
                        resizeMode: 'center',
                        alignContent: 'flex-start',
                      }}
                      source={require('../assets/icons/ic_logout_prem-playstore.png')}
                    />
                  </View>
                </View>
              </TouchableHighlight>
            </CardView>
            <View style={{flexDirection: 'row', height: 50}}>
              <View
                style={{width: '100%', height: 50, justifyContent: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginStart: 10,
                    fontSize: 14,
                    justifyContent: 'center',
                    fontWeight: 'bold',
                  }}>
                  Powered by TUO @ {thisyear}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

MeScreen.propTypes = {};

export default MeScreen;
