import React from 'react';
import styles from './style';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-elements';
const Consult_info = () => {
  const consult_info = useSelector(
    (state) => state.Clinic_Reducers.consult_info.data,
  );
  console.log(consult_info);
  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.Inputcontainer}>
        <Button
          onPress={() => handleDone()}
          buttonStyle={{
            backgroundColor: '#034c81',
            marginTop: 10,
            borderRadius: 10,
            width: '70%',
            marginBottom: 10,
            alignSelf: 'center',
            height: 50,
          }}
          title="View Medical Prescription"
        />
      </View>
      <View style={styles.Inputcontainer}>
        <Button
          onPress={() => handleDone()}
          buttonStyle={{
            backgroundColor: '#034c81',
            borderRadius: 10,
            width: '70%',
            marginBottom: 10,
            alignSelf: 'center',
            height: 50,
          }}
          title="View Medical Procedures"
        />
      </View>
      <View style={styles.Inputcontainer}>
        <Button
          onPress={() => handleDone()}
          buttonStyle={{
            backgroundColor: '#034c81',
            borderRadius: 10,
            width: '70%',
            marginBottom: 80,
            alignSelf: 'center',
            height: 50,
          }}
          title="View Medical Certificate"
        />
      </View> */}
      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'white',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="Fullname"
          value={consult_info[0]?.first_name + ' ' + consult_info[0]?.last_name}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="Phone No."
          value={consult_info[0]?.mob_no}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="Email Address"
          value={consult_info[0]?.email}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="Line1"
          value={consult_info[0]?.line1}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="Line2"
          value={consult_info[0]?.line2}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="State"
          value={consult_info[0]?.provincedesc}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="Postal Code"
          value={consult_info[0]?.zip_code}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="City"
          value={consult_info[0]?.citymun_desc}
        />
      </View>

      <View style={styles.Inputcontainer}>
        <TextInput
          style={styles.text}
          dense={true}
          theme={{
            colors: {
              primary: '#3eb2fa',
              backgroundColor: 'rgba(255,255,355,0.1)',
              underlineColor: 'rgba(255,255,355,0.1)',
            },
          }}
          mode="flat"
          label="Country"
          value={'PH'}
        />
      </View>
    </View>
  );
};
export default Consult_info;
