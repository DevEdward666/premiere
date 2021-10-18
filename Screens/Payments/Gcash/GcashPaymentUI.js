import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native';
import GcashBody from './GcashBody';
import GcashFooter from './GcashFooter';
import GcashHeader from './GcashHeader';
import {useSelector} from 'react-redux';
import styles from './style';
import {ScrollView} from 'react-native';
const GcashPaymentUI = () => {
  const appointment_message = useSelector(
    (state) => state.Clinic_Reducers.appointment_message,
  );
  return (
    <ScrollView>
      <GcashHeader
        request_code={appointment_message?.data[0]?.appointment_id}
        requested_on={appointment_message?.data[0]?.requested_at}
        requestor_name={`${appointment_message?.data[0]?.firstname} ${appointment_message?.data[0]?.middlename} ${appointment_message?.data[0]?.lastname} `}
        consultation_cost="50000"
      />
      <GcashFooter />
      <GcashBody
        name={`${appointment_message?.data[0]?.firstname} ${appointment_message?.data[0]?.middlename} ${appointment_message?.data[0]?.lastname}`}
        line1={appointment_message?.data[0]?.line1}
        line2={appointment_message?.data[0]?.line2}
        mobile={appointment_message?.data[0]?.mobileno}
        email={appointment_message?.data[0]?.email}
        state={appointment_message?.data[0]?.regiondesc}
        postal={appointment_message?.data[0]?.zipcode}
        city={appointment_message?.data[0]?.citymundesc}
        country={'PH'}
      />
    </ScrollView>
  );
};
export default GcashPaymentUI;
