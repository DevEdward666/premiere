import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {action_GET_events} from '../Services/Actions/Events_Actions';
import EventCalendar from 'react-native-events-calendar';
import wait from '../Plugins/waitinterval';
import {ScrollView} from 'react-native-gesture-handler';
const UICalendar = () => {
  const window = useWindowDimensions();
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const events_reducers = useSelector((state) => state.Events_Reducers.data);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      dispatch(action_GET_events());
    });
  }, [dispatch]);
  useEffect(() => {
    setSpinner(true);
    setInterval(() => {
      setSpinner(false);
    }, 1000);
    dispatch(action_GET_events());
    getCurrentDate();
  }, [dispatch]);
  const events_data = events_reducers.map((e) => ({
    start: `${e.datestart} ${e.evstarttime}:00`,
    end: `${e.dateend} ${e.evendtime}:00`,
    title: `${e.evtitle}`,
    summary: `${e.evdesc}`,
  }));
  const getCurrentDate = () => {
    var date = new Date().getDate();

    var month = new Date().getMonth() + 1;

    var year = new Date().getFullYear();

    // You can turn it in to your desired format
    if (month > 9) {
      return year + '-' + month + '-' + date; //format: dd-mm-yyyy;
    } else {
      return year + '-0' + month + '-' + date; //format: dd-mm-yyyy;
    }
  };
  const getevents = (event) => {
    console.log(event[0].title);
  };
  return (
    <SafeAreaView style={styles.flatlistcontainer}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <EventCalendar
          eventTapped={() => getevents(events)}
          events={events_data}
          width={window.width}
          initDate={getCurrentDate()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
    backgroundColor: '#000000a0',
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
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
    height: 20,
  },
});
export default UICalendar;
