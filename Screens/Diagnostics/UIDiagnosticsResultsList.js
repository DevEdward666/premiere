import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ImageBackground,
} from 'react-native';
import {Card} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {action_GET_diagnostics_resultlist} from '../Services/Actions/Diagnostic_Actions';
import styles from './diagnosticresultstyles';
const UIDiagnosticsRequestList = () => {
  const [premid, setpremid] = useState('');
  const [offset, setoffset] = useState(0);
  const [resulturl, setresulturl] = useState('');
  const dispatch = useDispatch();
  const diagnostics_result_reducers = useSelector(
    (state) => state.Diagnostic_Reducers.data_result,
  );

  const getprem_id = async () => {
    let mounted = true;
    if (mounted) {
      try {
        const prem_id = await AsyncStorage.getItem('prem_id');

        if (prem_id !== null) {
          setpremid(prem_id);
          await dispatch(action_GET_diagnostics_resultlist(prem_id, offset));
        }
      } catch (e) {
        alert('Failed to fetch the data from storage');
      }
    }
    return () => {
      mounted = false;
    };
  };
  useEffect(() => {
    let mounted = true;
    const getpremidandoffset = () => {
      if (mounted) {
        getprem_id();
        setoffset(10);
      }
    };

    mounted && getpremidandoffset();
    return () => {
      mounted = false;
    };
  }, [dispatch, premid]);
  const loadmore = async () => {
    let mounted = true;
    if (mounted) {
      setoffset((prev) => prev + 10);
      await dispatch(action_GET_diagnostics_resultlist(premid, offset));
    }
    return () => {
      mounted = false;
    };
  };
  const gotoresult = async (item) => {
    let mounted = true;
    if (mounted) {
      await setresulturl(item.resurl);
      await AsyncStorage.setItem('resurl', item.resurl);

      await Actions.diagnosticsresults();
    }
    return () => {
      mounted = false;
    };
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/background/white.jpg')}
        resizeMode="cover"
        blurRadius={20}>
        <FlatList
          style={styles.container}
          data={diagnostics_result_reducers}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={loadmore}
          onEndReachedThreshold={0.1}
          renderItem={({item, index}) => (
            <TouchableHighlight
              onPress={() => gotoresult(item)}
              underlayColor="white">
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 2,
                }}>
                <Card containerStyle={styles.cardresultlist}>
                  <Text style={styles.flatlistitemappointmentno}>
                    #{item.appointmentno}
                  </Text>
                  <Text style={styles.textfinishedat}>#{item.finishedat}</Text>
                </Card>
              </View>
            </TouchableHighlight>
          )}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default UIDiagnosticsRequestList;
