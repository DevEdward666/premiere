import React, {useCallback, useEffect, useState} from 'react';
import {Button} from 'react-native-elements';
import {View} from 'react-native';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {
  createsource,
  createpayment,
} from '../../../Services/Actions/Clinic_actions';
const GcashFooter = () => {
  const dispatch = useDispatch();
  const [billingaddress, setbillinaddress] = useState([]);
  const [billingredirect, setbillingredirect] = useState([]);
  const [constult_pk, setconstult_pk] = useState('');
  const [billingtype, setbillingtype] = useState([]);
  const [billingdata, setbillingdata] = useState([]);
  const [billingcurrency, setbillingcurrency] = useState('');
  const [billingamount, setbillingamount] = useState(0);
  const [billingdescription, setbillingdescription] = useState('');
  const [sourcecreated, setsourcecreated] = useState(false);
  const [PayDisabled, setPayDisabled] = useState(false);
  const [CancelDisabled, setCancelDisabled] = useState(false);
  const [PayEffect, setPayEffect] = useState(0);
  const [DonePayEffect, setDonePayEffect] = useState(0);
  const [
    billingstatement_descriptor,
    setbillingstatement_descriptor,
  ] = useState('');
  const appointment_message = useSelector(
    (state) => state.Clinic_Reducers.appointment_message,
  );
  const sourcedata = useSelector((state) => state.Clinic_Reducers.sourcedata);

  const handlePay = useCallback(async () => {
    await setconstult_pk(appointment_message?.data[0]?.appointment_id);
    await setbillingtype('gcash');
    await setbillingcurrency('PHP');
    await setbillingamount(50000);
    await setbillingdescription('Consultation Payment');
    await setbillingstatement_descriptor(
      'Consultation Payment from OPD Telemedicine',
    );
    await setbillinaddress({
      address: {
        line1: appointment_message?.data[0]?.line1,
        state: appointment_message?.data[0]?.regiondesc,
        postal_code: appointment_message?.data[0]?.zipcode,
        city: appointment_message?.data[0]?.citymundesc,
        country: 'PH',
        line2: appointment_message?.data[0]?.line2,
      },
      name: `${appointment_message?.data[0]?.firstname} ${appointment_message?.data[0]?.middlename} ${appointment_message?.data[0]?.lastname} `,
      phone: appointment_message?.data[0]?.mobileno,
      email: appointment_message?.data[0]?.email,
    });
    await setbillingredirect({
      success:
        'https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success',
      failed:
        'https://opd.perpetualsuccourcebu.com:60355/payment-feedback/failed',
      checkout_url:
        'https://opd.perpetualsuccourcebu.com:60355/payment-feedback/success',
    });
    setPayEffect((prev) => prev + 1);
  }, [
    dispatch,
    constult_pk,
    billingtype,
    billingcurrency,
    billingamount,
    billingdescription,
    billingstatement_descriptor,
    billingaddress,
    billingredirect,
  ]);
  const handleDonePayment = useCallback(async () => {
    await setbillingdata({
      id: sourcedata?.source,
      attributes: {
        amount: billingamount,
        description: billingdescription,
        currency: billingcurrency,
        statement_descriptor: billingstatement_descriptor,
        type: 'payment.paid',
        data: {
          attributes: {
            source: {id: sourcedata?.source, type: 'source'},
            amount: billingamount,
            bliing: {
              address: {
                line1: appointment_message?.data[0]?.line1,
                state: appointment_message?.data[0]?.regiondesc,
                postal_code: appointment_message?.data[0]?.zipcode,
                city: appointment_message?.data[0]?.citymundesc,
                country: 'PH',
                line2: appointment_message?.data[0]?.line2,
              },
              name: `${appointment_message?.data[0]?.firstname} ${appointment_message?.data[0]?.middlename} ${appointment_message?.data[0]?.lastname} `,
              phone: appointment_message?.data[0]?.mobileno,
              email: appointment_message?.data[0]?.email,
            },
            type: 'gcash',
            currency: billingcurrency,
            livemode: false,
            status: 'chargeable',
            description: billingdescription,
          },
          type: 'source',
        },
      },
    });
    dispatch(createpayment(billingdata, sourcedata?.source));
  }, [
    dispatch,
    appointment_message,
    billingtype,
    billingcurrency,
    billingamount,
    billingdescription,
    billingstatement_descriptor,
    billingaddress,
    billingredirect,
    billingdata,
    sourcedata?.source,
  ]);
  const handleCancel = () => {};

  useEffect(() => {
    let mounted = true;
    const pay = () => {
      if (mounted) {
        dispatch(
          createsource(
            constult_pk,
            billingtype,
            billingcurrency,
            billingamount,
            billingdescription,
            billingstatement_descriptor,
            billingaddress,
            billingredirect,
          ),
        );
      }
    };
    mounted && pay();
    return () => {
      mounted = false;
    };
  }, [dispatch, PayEffect]);
  useEffect(() => {
    let mounted = true;
    const donepay = () => {
      if (mounted) {
        if (appointment_message?.data[0]?.sts_desc === 'for approval') {
          setPayDisabled(true);
          alert(
            'Your request is being processed please wait for admins approval',
          );
        } else if (appointment_message?.data[0]?.sts_desc === 'paid') {
          setPayDisabled(true);
          setCancelDisabled(true);
        } else if (appointment_message?.data[0]?.sts_desc === 'approved') {
          setPayDisabled(false);
        }
      }
    };
    mounted && donepay();
    return () => {
      mounted = false;
    };
  }, [appointment_message?.data[0]?.sts_desc]);
  return (
    <View
      style={[
        styles.mainContainer,
        {
          flexDirection: 'row',
        },
      ]}>
      {sourcedata?.status === 'pending' ? (
        <View style={{flex: 2}}>
          <Button
            onPress={() => handleDonePayment()}
            buttonStyle={styles.btnpay}
            title="Done Payment"
          />
        </View>
      ) : CancelDisabled ? null : (
        <>
          <View style={{flex: 2}}>
            <Button
              disabled={CancelDisabled}
              onPress={() => handleCancel()}
              buttonStyle={styles.btncancel}
              title="Cancel"
            />
          </View>
          <View style={{flex: 2}}>
            <Button
              disabled={PayDisabled}
              onPress={() => handlePay()}
              buttonStyle={styles.btnpay}
              title="Pay Via Gcash"
            />
          </View>
        </>
      )}
    </View>
  );
};

export default GcashFooter;
