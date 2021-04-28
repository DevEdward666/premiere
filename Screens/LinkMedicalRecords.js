import React, {useCallback, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, StyleSheet, Image, SafeAreaView, View} from 'react-native';
import {Button, CheckBox, Input} from 'react-native-elements';
import CustomBottomSheet from '../Plugins/CustomeBottomSheet';
import CustomTermsAndConditions from '../Plugins/CustomTermsAndConditions';
import CustomGestureHandler from '../Plugins/CustomGestureHandler';
import {useDispatch, useSelector} from 'react-redux';
import {action_SET_LinkRequest} from '../Services/Actions/Users_Actions';
import CustomOverlay from '../Plugins/CustomOverlay';
const LinkMedicalRecords = () => {
  const dispatch = useDispatch();
  const linkmessage = useSelector((state) => state.User_Reducers.link_message);
  const [agreechecked, setagreechecked] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [buttondisabled, setbuttondisabled] = useState(true);
  const [checkboxdisabled, setcheckboxdisabled] = useState(true);
  const [patient_no, setpatient_no] = useState('');
  const [prem_id, setprem_id] = useState('');
  const [messagevisible, setmessagevisible] = useState(false);
  const handleagreechecked = useCallback(() => {
    if (agreechecked) {
      setagreechecked(false);
      setbuttondisabled(true);
    } else {
      setagreechecked(true);
      setbuttondisabled(false);
      setisVisible(true);
    }
  }, [agreechecked]);
  const handleGestureDown = useCallback(() => {
    setTimeout(() => {
      setisVisible(false);
    }, 0);
  }, [isVisible]);
  const handleOnchangePatientNo = useCallback(
    async (text) => {
      await setpatient_no(text);
      if (text !== ' ') {
        await setcheckboxdisabled(false);
      }
    },
    [patient_no],
  );
  AsyncStorage.getItem('prem_id').then((item) => {
    setprem_id(item);
  });
  const handleLinkMedical = useCallback(async () => {
    await dispatch(
      action_SET_LinkRequest(
        patient_no.toString(),
        prem_id.toString(),
        'pending',
      ),
      setmessagevisible(true),
      alert(linkmessage),
    );
  }, [dispatch, patient_no, prem_id]);
  useEffect(() => {
    let mounted = true;
    const setstates = () => {
      if (patient_no !== '') {
        setcheckboxdisabled(false);
      } else {
        setcheckboxdisabled(true);
        setagreechecked(false);
        setbuttondisabled(true);
      }
    };

    mounted && setstates();
    return () => (mounted = false);
  }, [patient_no]);
  return (
    <SafeAreaView style={styles.container}>
      <CustomOverlay Visible={messagevisible} message={'test'} />
      <View style={styles.ImageContainer}>
        <Image
          style={styles.ImageSize}
          resizeMode="contain"
          source={require('../assets/icons/record.png')}
        />
      </View>
      <View style={styles.TextContainer}>
        <Text style={styles.Title}>Link Medical Records</Text>
        <View style={styles.InputContainer}>
          <Input
            onChangeText={(text) => handleOnchangePatientNo(text)}
            leftIcon={{type: 'font-awesome', name: 'th'}}
            placeholder="Patient No"
            value={patient_no}
          />
        </View>
        <CheckBox
          disabled={checkboxdisabled}
          style={styles.Title}
          center
          title="I agree to the terms and conditions"
          checked={agreechecked}
          onPress={() => handleagreechecked()}
        />
        <View style={styles.ButtonContainer}>
          <Button
            disabled={buttondisabled}
            raised
            onPress={() => handleLinkMedical()}
            title="Link Now"
            type="outlined"
          />
        </View>
      </View>
      <CustomGestureHandler
        down={() => handleGestureDown()}
        UI={
          <CustomBottomSheet
            isVisible={isVisible}
            color="white"
            UI={<CustomTermsAndConditions />}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: 100 + '%',

    height: 10 + '%',
  },
  ImageContainer: {
    width: 100 + '%',
    height: 30 + '%',
  },
  TextContainer: {
    flex: 1,
    width: 100 + '%',
    height: 20 + '%',
  },
  ButtonContainer: {
    flex: 1,
    width: 80 + '%',
    height: 1 + '%',
    alignSelf: 'center',
    padding: 20,
  },
  InputContainer: {
    width: 80 + '%',
    height: 20 + '%',
    alignSelf: 'center',
    padding: 20,
  },
  Title: {
    textAlign: 'center',
    fontFamily: 'Open-Sans',
    fontSize: 18,
    width: 100 + '%',
    fontWeight: 'bold',
  },
  ImageSize: {
    width: 30 + '%',
    height: 10 + '%',
    alignSelf: 'center',
    flex: 1,
  },
});
export default LinkMedicalRecords;
