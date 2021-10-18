import React, {useEffect} from 'react';
import Consult_info from './Consult_info';
import {consultation_info} from '../../../Services/Actions/Clinic_actions';
import {useDispatch, useSelector} from 'react-redux';
export default function MainInfoConsult() {
  const dispatch = useDispatch();
  const appointment_message = useSelector(
    (state) => state.Clinic_Reducers.appointment_message,
  );
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);

  useEffect(() => {
    let mounted = true;
    const getdetails = () => {
      dispatch(
        consultation_info(
          users_reducers?.prem_id,
          appointment_message?.data[0]?.appointment_id,
        ),
      );
    };
    mounted && getdetails();
    return () => {
      mounted = false;
    };
  }, [
    dispatch,
    appointment_message?.data[0]?.appointment_id,
    users_reducers?.prem_id,
  ]);
  return <Consult_info />;
}
