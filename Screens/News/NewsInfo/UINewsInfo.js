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
  Image,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import CardView from 'react-native-rn-cardview';
import {Card} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../Plugins/waitinterval';
import {action_GET_news_info} from '../Services/Actions/News_Actions';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
import styles from './style';
import ImageView from 'react-native-image-viewing';
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
      if (!news_reducers_info?.data == '') {
        dispatch(action_GET_news_info(news_id.toString()));
      }
    };

    mounted && getnewsinfo();
    return () => {
      mounted = false;
    };
  }, [dispatch, news_id]);

  useEffect(() => {
    let mounted = true;
    const getnewsinfo = async () => {
      await setSpinner(true);
      if (news_reducers_info?.loading) {
        setSpinner(false);
      }
    };

    mounted && getnewsinfo();
    return () => {
      mounted = false;
    };
  }, [news_reducers_info?.loading]);
  const images = [
    {
      uri: `${news_reducers_url}/${news_reducers_info.data[0]?.Image}`,
    },
  ];
  const [visible, setIsVisible] = useState(false);

  return (
    <ScrollView>
      <SafeAreaView style={styles.flatlistcontainer}>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Card containerStyle={styles.cardmain}>
          <View
            style={{
              flexDirection: 'row',
              height: 300,
              alignItems: 'center',
            }}>
            <ImageView
              images={images}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />

            <TouchableHighlight
              style={styles.topicimage}
              onPress={() => setIsVisible(true)}>
              <>
                <Image
                  progressiveRenderingEnabled={true}
                  source={{
                    uri: `${news_reducers_url}/${news_reducers_info.data[0]?.Image}`,
                  }}
                  style={styles.topicimage}
                />
              </>
            </TouchableHighlight>
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: 300,
              alignItems: 'center',
            }}>
            <Text style={styles.baseText}>
              <Text style={styles.textTitle}>
                {news_reducers_info.data[0]?.Title}
              </Text>
              {'\n'}
              {'\n'}
              <Text style={styles.text}>
                {news_reducers_info.data[0]?.description}
              </Text>
            </Text>
          </View>
        </Card>
      </SafeAreaView>
    </ScrollView>
  );
};
export default UINews;
