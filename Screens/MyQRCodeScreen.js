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
          await AsyncStorage.setItem('prem_user_qr', user_qr?.qrbase64);
          await AsyncStorage.getItem('prem_user_qr').then(async (item) => {
            await setQrvalue('data:image/png;base64,' + item);
          });
        }
        await AsyncStorage.getItem('prem_user_qr').then(async (item) => {
          await setQrvalue('data:image/png;base64,' + item);
        });
      }
    };
    mounted && setqr();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  console.log(users_reducers?.prem_id);
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
        {/* <QRCode
          //QR code value
          value={users_reducers?.prem_id}
          //size of QR Code
          size={250}
          //Color of the QR Code (Optional)
          // color="black"
          //Background Color of the QR Code (Optional)
          // backgroundColor="white"
          //Logo of in the center of QR Code (Optional)
          //   logo={logo}
          //Center Logo size  (Optional)
          // logoSize={50}
          //Center Logo margin (Optional)
          // logoMargin={1}
          //Center Logo radius (Optional)
          // logoBorderRadius={1}
          // Center Logo background (Optional)
          // logoBackgroundColor="white"
        /> */}
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
