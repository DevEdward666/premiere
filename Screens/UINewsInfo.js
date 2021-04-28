import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import CardView from 'react-native-rn-cardview';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../Plugins/waitinterval';
import {action_GET_news_info} from '../Services/Actions/News_Actions';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const UINews = () => {
  const [offset, setoffset] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [news_id, setnews_id] = useState('');
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();
  const news_reducers_info = useSelector(
    (state) => state.News_Reducers.data_info,
  );
  const news_reducers_url = useSelector((state) => state.News_Reducers.url);
  AsyncStorage.getItem('news_id').then((item) => {
    if (item == null) {
      Actions.home();
    } else {
      setnews_id(item);
    }
  });
  useEffect(() => {
    let mounted = true;
    const getnewsinfo = () => {
      setSpinner(true);
      setInterval(() => {
        setSpinner(false);
      }, 1000);
      dispatch(action_GET_news_info(news_id.toString()));
    };

    mounted && getnewsinfo();
    return () => (mounted = false);
  }, [dispatch, news_id]);

  return (
    <ScrollView>
      <SafeAreaView style={styles.flatlistcontainer}>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <CardView
          style={{marginTop: -5}}
          radius={1}
          backgroundColor={'#ffffff'}>
          <View
            style={{
              flexDirection: 'row',
              height: 300,
              alignItems: 'center',
            }}>
            <ImageBackground
              source={{
                uri: `${news_reducers_url}/${news_reducers_info[0]?.Image}`,
              }}
              style={{
                width: '100%',
                height: '100%',
                flex: 1,
                resizeMode: 'cover',
                justifyContent: 'center',
              }}></ImageBackground>
          </View>
        </CardView>
        <View
          style={{
            flexDirection: 'row',
            height: 300,
            alignItems: 'center',
          }}>
          <Text style={styles.baseText}>
            <Text style={styles.textTitle}>{news_reducers_info[0]?.Title}</Text>
            {'\n'}
            {'\n'}
            <Text style={styles.text}>
              {news_reducers_info[0]?.description}
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  baseText: {
    textAlign: 'justify',
    padding: 15,
  },
  textTitle: {
    fontSize: 24,
    padding: 15,
    textAlign: 'left',
  },
  text: {
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
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
export default UINews;
