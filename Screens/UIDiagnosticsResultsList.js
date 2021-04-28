import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {action_GET_diagnostics_resultlist} from '../Services/Actions/Diagnostic_Actions';
const UIDiagnosticsRequestList = () => {
  const [premid, setpremid] = useState('');
  const [offset, setoffset] = useState(0);
  const [resulturl, setresulturl] = useState('');
  const dispatch = useDispatch();
  const diagnostics_result_reducers = useSelector(
    (state) => state.Diagnostic_Reducers.data_result,
  );

  const getprem_id = async () => {
    try {
      const prem_id = await AsyncStorage.getItem('prem_id');

      if (prem_id !== null) {
        setpremid(prem_id);
        await dispatch(action_GET_diagnostics_resultlist(prem_id, offset));
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };
  useEffect(() => {
    let mounted = true;
    const getpremidandoffset = () => {
      getprem_id();
      setoffset(10);
    };

    mounted && getpremidandoffset();
    return () => (mounted = false);
  }, [dispatch, premid]);
  const loadmore = async () => {
    setoffset((prev) => prev + 10);
    await dispatch(action_GET_diagnostics_resultlist(premid, offset));
  };
  const gotoresult = async (item) => {
    await setresulturl(item.resurl);
    await AsyncStorage.setItem('resurl', item.resurl);

    await Actions.diagnosticsresults();
  };
  return (
    <SafeAreaView style={styles.flatlistcontainer}>
      <FlatList
        style={styles.container}
        data={diagnostics_result_reducers}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadmore}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.flatlistcontainer}
            onPress={() => {
              gotoresult(item);
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                padding: 2,
              }}>
              <Card style={styles.cardresultlist}>
                <Text style={styles.flatlistitemappointmentno}>
                  #{item.appointmentno}
                </Text>
                <Text style={styles.textfinishedat}>#{item.finishedat}</Text>
              </Card>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  flatlistcontainer: {
    backgroundColor: '#fafafa',
    flex: 1,
    paddingTop: 10,
  },
  flatlistitem: {
    marginStart: 30,
    fontSize: 14,
    fontFamily: 'Open-Sans',
    height: 10,
  },
  flatlistitemappointmentno: {
    marginStart: 30,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
  },
  textfinishedat: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
    height: 20,
  },
  cardresultlist: {
    width: '100%',
    borderRadius: 10,
    elevation: 5,
    padding: 10,
  },
});

export default UIDiagnosticsRequestList;
