import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {action_GET_userdetails} from '../Services/Actions/Users_Actions';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from 'react-native-router-flux';
import QRCode from 'react-native-qrcode-svg';
const MyQRCodeScreen = () => {
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);

  AsyncStorage.getItem('prem_id').then((item) => {
    if (item == null) {
      Actions.home();
    }
    setQrvalue(item);
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>This is your personal QR</Text>
        <QRCode
          //QR code value
          value={qrvalue ? qrvalue : 'NA'}
          //size of QR Code
          size={250}
          //Color of the QR Code (Optional)
          color="black"
          //Background Color of the QR Code (Optional)
          backgroundColor="white"
          //Logo of in the center of QR Code (Optional)
          logo={require('../assets//icons/premiereicon.jpeg')}
          //Center Logo size  (Optional)
          logoSize={50}
          //Center Logo margin (Optional)
          logoMargin={1}
          //Center Logo radius (Optional)
          logoBorderRadius={1}
          //Center Logo background (Optional)
          logoBackgroundColor="white"
        />
      </View>
    </SafeAreaView>
  );
};

export default MyQRCodeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    margin: 30,
    backgroundColor: 'white',
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
