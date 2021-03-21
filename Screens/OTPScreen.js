import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, Button} from 'react-native';
import {Text} from 'react-native-elements';
import {action_update_user} from '../Services/Actions/SignUp_Actions';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OTPScreen = () => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(300);
  const [mobileno, setmobileno] = useState(300);
  useEffect(() => {
    setTimeout(() => setTimer(timer - 1), 1000);
    if (timer <= 0) {
      setTimer('');
    }
  }, [timer]);
  const handleSubmit = () => {
    AsyncStorage.getItem('username').then((item) => {
      if (item) {
        dispatch(action_update_user(item));
      }
      console.log(item);
    });
  };
  AsyncStorage.getItem('mobileno').then((item) => {
    if (item) {
      setmobileno(item);
    }
    console.log(item);
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 60}}>
        <Text h5 style={{alignContent: 'center', width: '100%'}}>
          Verify the Authentication
        </Text>
        <Text h6 style={{alignContent: 'center', width: '100%'}}>
          Sent to {mobileno}
        </Text>
        <OTPInputView
          style={{width: '100%', height: 200}}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <Text h6 style={{alignContent: 'center', width: '100%'}}>
          Authentication Code until {timer} seconds
        </Text>
        <View style={{padding: 60, borderRadius: 20}}>
          <Button
            style={{color: '#0148a4'}}
            onPress={handleSubmit}
            title="Submit"
            color="#0148a4"
            accessibilityLabel="Submit"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 100,
    height: 100,
  },

  borderStyleHighLighted: {
    borderColor: 'black',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    color: 'black',
    fontSize: 20,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: 'black',
  },
});
export default OTPScreen;