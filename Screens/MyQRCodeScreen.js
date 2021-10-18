import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useDispatch, useSelector} from 'react-redux';
import {action_setqr} from '../Services/Actions/Users_Actions';
const MyQRCodeScreen = () => {
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const user_qr = useSelector((state) => state.User_Reducers.user_qr);
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const getqr = () => {
      if (mounted) {
        dispatch(action_setqr(users_reducers?.prem_id));
      }
    };
    mounted && getqr();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const setqr = async () => {
      if (mounted) {
        if (user_qr?.qrbase64 !== '') {
          await setQrvalue('data:image/png;base64,' + user_qr?.qrbase64);
        }
      }
    };
    mounted && setqr();
    return () => {
      mounted = false;
    };
  }, [user_qr?.qrbase64]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>This is your personal QR</Text>
        <Image
          style={{
            marginTop: 10,
            marginStart: 10,
            width: 300,
            height: 300,
            borderRadius: 120 / 2,
            overflow: 'hidden',
            borderWidth: 3,
          }}
          source={{uri: qrvalue, scale: 1}}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyQRCodeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'SFUIDisplay-Bold',
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },
  textInputStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
