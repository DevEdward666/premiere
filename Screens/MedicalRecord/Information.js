import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import CustomBottomSheet from '../../Plugins/CustomeBottomSheet';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {TextInput, Surface, Text} from 'react-native-paper';
import CardView from 'react-native-rn-cardview';
import {FlatList, View, Dimensions, ScrollView,ImageBackground} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './style';
import {action_get_info} from '../../Services/Actions/MedicalRecords_Actions';
import Dateconverter from '../../Plugins/Dateconverter';
import { Card } from 'react-native-elements';
const Information = () => {
  const info = useSelector(
    (state) => state.MedicalRecords_Reducers.patientinfo,
  );
  const dispatch = useDispatch();
  const {width, height} = Dimensions.get('window');
  const [gestureName, setgestureName] = useState('');
  const onSwipe = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        dispatch(
          action_get_info(
            {
              admissiondate: '',
              admdiagnosis: '',
              patientname: '',
              patno: '',
              complaint: '',
            },
            false,
          ),
        );

        break;
      case SWIPE_LEFT:
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        dispatch(
          action_get_info(
            {
              admissiondate: '',
              admdiagnosis: '',
              patientname: '',
              patno: '',
              complaint: '',
            },
            false,
          ),
        );
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  });
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 1000,
  };
  return (
    <GestureRecognizer
      onSwipe={(direction, state) => onSwipe(direction, state)}
      config={config}>
      <CustomBottomSheet
        isVisible={info?.visible}
        color="white"
        UI={
 
          <ScrollView style={{height: height}}>
                   <ImageBackground
    style={{flex: 1}}
    source={require('../../assets/background/white.jpg')}
    resizeMode="cover"
    blurRadius={20}>
            <Card containerStyle={styles.userplate}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: height,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: width - 60,
                      height: height + 50,
                    }}>
                    <View style={{padding: 10}}>
                      <Surface style={styles.surface}>
                        <Text style={{fontWeight: 'bold'}}>Information</Text>
                      </Surface>
                    </View>
                    <View style={{padding: 10}}>
                      <TextInput
                        label="Patient No."
                        value={info?.data?.patno}
                        disabled={true}
                        theme={{
                          colors: {
                            primary: '#3eb2fa',
                            background: 'white',
                            underlineColor: 'transparent',
                          },
                        }}
                        mode="outlined"
                      />
                    </View>
                    <View style={{padding: 10}}>
                      <TextInput
                        label="Patient Name"
                        value={info?.data?.patientname}
                        disabled={true}
                        theme={{
                          colors: {
                            primary: '#3eb2fa',
                            background: 'white',
                            underlineColor: 'transparent',
                          },
                        }}
                        mode="outlined"
                      />
                    </View>
                    <View style={{padding: 10}}>
                      <TextInput
                        label="Diagnosis"
                        multiline={true}
                        numberOfLines={5}
                        value={info?.data?.admissiondiagnosis}
                        disabled={true}
                        theme={{
                          colors: {
                            primary: '#3eb2fa',
                            background: 'white',
                            underlineColor: 'transparent',
                          },
                        }}
                        mode="outlined"
                      />
                    </View>
                    <View style={{padding: 10}}>
                      <TextInput
                        label="Complaints"
                        multiline={true}
                        numberOfLines={5}
                        value={info?.data?.complaint}
                        disabled={true}
                        theme={{
                          colors: {
                            primary: '#3eb2fa',
                            background: 'white',
                            underlineColor: 'transparent',
                          },
                        }}
                        mode="outlined"
                      />
                    </View>
                    <View style={{padding: 10}}>
                      <TextInput
                        label="Admission Date"
                        value={Dateconverter(info?.data?.admissiondate)}
                        disabled={true}
                        theme={{
                          colors: {
                            primary: '#3eb2fa',
                            background: 'white',
                            underlineColor: 'transparent',
                          },
                        }}
                        mode="outlined"
                      />
                    </View>
                  </View>
                </View>
            </Card>
            </ImageBackground>
          </ScrollView>
        }
      />
    </GestureRecognizer>
  );
};

Information.propTypes = {};

export default Information;
