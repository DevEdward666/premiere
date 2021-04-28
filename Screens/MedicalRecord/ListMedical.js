import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  RefreshControl,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CardView from 'react-native-rn-cardview';
import {ButtonGroup} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome';
import {action_get_info} from '../../Services/Actions/MedicalRecords_Actions';
import wait from '../../Plugins/waitinterval';
import styles from './style';
import {Actions} from 'react-native-router-flux';
const ListMedical = () => {
  const list_medical_records = useSelector(
    (state) => state.MedicalRecords_Reducers.list_medical_records,
  );

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      dispatch(action_get_single_medical_records(users_reducers?.patno));
    });
  }, [dispatch]);
  const component1 = () => {
    return (
      <>
        <Text>
          <Icons name="info-circle" size={15} color="grey" /> Information
        </Text>
      </>
    );
  };
  const component2 = () => {
    return (
      <Text>
        <Icons name="file" size={15} color="grey" /> Files
      </Text>
    );
  };
  const buttons = [{element: component1}, {element: component2}];

  const updateIndex = useCallback(
    async (item, index) => {
      if (index !== 0) {
        Actions.files();
      } else {
        await dispatch(
          action_get_info(
            {
              admissiondate: item?.admissiondate,
              admdiagnosis: item?.admdiagnosis,
              patientname: item?.patientname,
              patno: item?.patno,
              complaint: item?.complaint,
            },
            true,
          ),
        );
      }
    },
    [dispatch],
  );
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {list_medical_records?.data?.map((item, index) => (
        <SafeAreaView key={index}>
          <CardView
            style={{marginTop: -5}}
            radius={1}
            backgroundColor={'#ffffff'}>
            <View
              style={{
                flexDirection: 'row',
                height: 100,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <Text numberOfLines={6} style={styles.text}>
                  {item?.patno}
                  {'\n'}
                  {item?.patientname}
                </Text>
              </View>
            </View>
          </CardView>
          <ButtonGroup
            onPress={(index) => updateIndex(item, index)}
            buttons={buttons}
            containerStyle={{height: 35, marginBottom: 15}}
          />
        </SafeAreaView>
      ))}
    </ScrollView>
  );
};

ListMedical.propTypes = {};

export default ListMedical;
