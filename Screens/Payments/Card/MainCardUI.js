import React from 'react';
import {SafeAreaView} from 'react-native';
import CardHeader from './CardHeader';
import {useSelector} from 'react-redux';
import CardBody from './Cardbody';
import {ScrollView} from 'react-native';
const MainCardUI = () => {
  const appointment_message = useSelector(
    (state) => state.Clinic_Reducers.appointment_message,
  );
  return (
    <ScrollView>
      <CardHeader />
      <CardBody
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

export default MainCardUI;
