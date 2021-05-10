import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  RefreshControl,
  ImageBackground
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {action_GET_events} from '../../Services/Actions/Events_Actions';
import EventCalendar from 'react-native-events-calendar';
import wait from '../../Plugins/waitinterval';
import {ScrollView} from 'react-native-gesture-handler';
import { Button,Text,View,Dimensions,Image } from 'react-native';
import {action_open_bottomsheet} from '../../Services/Actions/Default_Actions';
import CustomBottomSheet from '../../Plugins/CustomeBottomSheet';
import Dateconverter from '../../Plugins/Dateconverter';
import CardView from 'react-native-rn-cardview';
import moment from 'moment'
import styles from './styles'
import { TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
import EventList from './EventList'
import { FAB } from 'react-native-paper';
const UICalendar = () => {
  const window = useWindowDimensions();
  const [spinner, setSpinner] = useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date());
  const [searchdate, setsearchdate] = useState(getCurrentDate);
  const [displaydate, setdisplaydate] = useState(new Date());
  const [eventsinfo, seteventsinfo] = useState('');
  const dispatch = useDispatch();
  const open_bottomsheet = useSelector((state) => state.Default_Reducers.bottomSheet);
  const [refreshing, setRefreshing] = useState(false);
  const events_reducers = useSelector((state) => state.Events_Reducers.data);
  const {width, height} = Dimensions.get('window');
  const onChange = useCallback(async(event, selectedDate) => {
    let mounted=true
    if(mounted){
      const currentDate = selectedDate || date;
    await  setShow(Platform.OS === 'ios');
    await  setDate(currentDate);
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      await  setdisplaydate(currentDate)
        if (month <= 9 && day <= 9) {
          await       setsearchdate(year + '-0' + month + '-0' + day);
        } else if (month <= 9) {
          await       setsearchdate(year + '-0' + month + '-' + day);
        } else if (day <= 9) {
          await      setsearchdate(year + '-' + month + '-0' + day);
        } else {
          await       setsearchdate(year + '-' + month + '-' + day);
        }
        dispatch(action_GET_events(searchdate));
    }
 return ()=> {mounted=false}
    //console.log(year + '-' + month + '-' + day);
  },[show,date,searchdate,displaydate]);

  const showMode = (currentMode) => {
    let mounted=true
    if(mounted){
      setShow(true);
    setMode(currentMode);
    }
    return()=>{mounted=false}
  };
  const showDatepicker = () => {
    let mounted=true
    if (mounted){
        showMode('date');
    }
  return()=>{mounted=false}
  };
  const getCurrentDate = async() => {
    let mounted=true
    if (mounted){
   var dates = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    if (month > 9) {
      return year + '-' + month + '-' + dates; 
    } else {
      if (dates<9)
      return year + '-0' + month + '-0' + dates; 
      else
      return year + '-0' + month + '-0' + dates; 
    }
    
    }
    
   return ()=>{mounted=false}
  };
  const onRefresh = useCallback(async() => {
    let mounted=true
    if (mounted){
      setRefreshing(true);
        dispatch(action_GET_events(searchdate));

      if(events_reducers?.loading){
        dispatch(action_GET_events(searchdate));
        setSpinner(false);
        setRefreshing(false)
      }
    }
return()=>{mounted=false}
  }, [dispatch,searchdate]);
  useEffect(() => {
    let mounted = true;
    const getevents = () => {
      if(mounted)
      {
        setSpinner(true);
      if(events_reducers?.loading){
        dispatch(action_GET_events(searchdate));
        setSpinner(false);
      }
      dispatch(action_GET_events(searchdate));
       setDate(getCurrentDate())
      }
    };

    mounted && getevents();
    return () => {mounted = false};
  }, [dispatch,searchdate]);


  const getevents = useCallback( async (event) => {
    let mounted =true
    if(mounted){
      await  dispatch(action_open_bottomsheet(true))
      await seteventsinfo(event)
      await console.log(event)
    }

  return ()=> {mounted=false}
  },[dispatch]);
  return (
    <SafeAreaView style={styles.flatlistcontainer}>
        <ImageBackground
    style={{flex: 1}}
    source={require('../../assets/background/white.jpg')}
    resizeMode="cover"
    blurRadius={20}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
                 <Card containerStyle={styles.dateplate}><View><Text style={styles.datetext}>{moment(`${searchdate}`).format("MMMM D, YYYY")}</Text></View></Card>
           
        {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={displaydate}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
             {events_reducers?.data?.map((e,i) => (
    <TouchableHighlight   onPress={() => getevents(e)}
    underlayColor="white" key={i}>
<EventList title={e.evtitle} description={e.evdesc}    
 UI={
  <Text style={styles.EventDate} >Date: { moment(`${e.datestart} ${e.evstarttime}`).format("MMMM D, YYYY")}</Text>
}/>
</TouchableHighlight>
  ))}
  
      </ScrollView>
      <CustomBottomSheet
          isVisible={open_bottomsheet}
         
          UI={
            <ImageBackground
    style={{flex: 1}}
    source={require('../../assets/background/white.jpg')}
    resizeMode="cover"
    blurRadius={20}>
            <SafeAreaView>
             
              <ScrollView>
         
                <Card containerStyle={styles.plate}>
                <View style={styles.headtitle}>
                <Text  style={styles.title}>Event Information</Text>
                </View>
              
                  <View style={{flex:1,width:width,justifyContent:"flex-start",height:height}}>
                  <Card containerStyle={{width:width-80}}>
                    <Text style={styles.eventtitle}>Title: {eventsinfo.evtitle}</Text>
                    <Text style={styles.eventdate}>Start Date: { moment(eventsinfo.datestart).format("MMMM D, YYYY")}</Text>
                    <Text style={styles.eventenddate}>End Date: { moment(eventsinfo.dateend).format("MMMM D, YYYY")}</Text>
                    <Text style={styles.eventdesc}>Description:{'\n'}{ eventsinfo.evdesc}</Text>
                    </Card>
                  </View>
                  
                </Card>
                </ScrollView>
                </SafeAreaView>
                </ImageBackground>
                }/>
                 <FAB
    style={styles.fab}
         color="white"
    icon="calendar-search"
    onPress={() => showDatepicker()}
  />
                </ImageBackground>
    </SafeAreaView>
    
  );
};

export default UICalendar;
