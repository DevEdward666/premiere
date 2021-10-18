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
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import CardView from 'react-native-rn-cardview';
import {Card} from 'react-native-elements';
import {
  action_GET_news_info,
  action_GET_news,
  action_GET_news_comment,
  action_GET_news_reaction,
  action_set_news_reaction,
  action_set_news_comment,
  action_GET_news_images,
} from '../../../Services/Actions/News_Actions';
import NewsVideoPlayer from '../NewsHeader/VideoPlayer/NewsVideoPlayer';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../Plugins/waitinterval';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
import styles from './style';
import ImageView from 'react-native-image-viewing';
import {ACTION_NOTIF} from '../../../Services/Actions/Default_Actions';
import {action_SET_notications} from '../../../Services/Actions/Default_Actions';
import NewsComments from '../NewsComments/NewsComments';
import FbGrid from 'react-native-fb-image-grid';
import ImageViewer from '../NewsHeader/ImageViwer/ImageViewer';
import {Divider} from '@material-ui/core';

const UINews = () => {
  const [offset, setoffset] = useState(10);
  const [comment, setcomment] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [ext, setext] = useState('');
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();
  const [images, setimages] = useState([]);
  const {width, height} = Dimensions.get('window');
  const news_reducers_info = useSelector(
    (state) => state.News_Reducers.data_info,
  );
  const news_reducers_url = useSelector((state) => state.News_Reducers.url);
  const news_image = useSelector((state) => state.News_Reducers.news_image);
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const news_comments = useSelector(
    (state) => state.News_Reducers.data_comment,
  );
  const [loggedin, setloggedin] = useState(false);
  const [token, settoken] = useState('');
  const [isVisibleError, setisVisibleError] = useState(false);
  const news_id = useSelector((state) => state.News_Reducers.news_id);

  AsyncStorage.getItem('tokenizer').then((item) => {
    let mounted = true;
    const gettoken = () => {
      if (mounted) {
        settoken(item);
      }
    };
    mounted && gettoken();
    return () => {
      mounted = false;
    };
  });
  useEffect(() => {
    let mounted = true;
    const loaded = () => {
      if (mounted) {
        setisVisibleError(false);
        if (token !== null) {
          setloggedin(true);
        } else {
          setloggedin(false);
        }
      }
    };
    mounted && loaded();
    return () => {
      mounted = false;
    };
  }, [token]);

  useEffect(() => {
    let mounted = true;
    const getnewsinfo = () => {
      if (mounted) {
        setext(news_image?.data[0]?.news_image.slice(-3));
      }
    };

    mounted && getnewsinfo();
    return () => {
      mounted = false;
    };
  }, [news_image?.data]);

  const onRefresh = useCallback(() => {
    let mounted = true;
    if (mounted) {
      setRefreshing(true);
      wait(1000).then(() => {
        setRefreshing(false);
        dispatch(action_GET_news_comment(news_id, offset));
        dispatch(action_GET_news_images(news_id));
      });
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, news_id]);
  const loadmore = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      setoffset((prev) => prev + 10);
      await dispatch(action_GET_news_comment(news_id, offset));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, offset]);
  const onChangeText = useCallback((text) => {
    let mounted = true;
    if (mounted) {
      setcomment(text);
    }
    return () => {
      mounted = false;
    };
  }, []);
  const handleCommentSend = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      if (comment !== ' ') {
        dispatch(
          action_set_news_comment(
            news_id.toString(),
            comment,
            users_reducers?.prem_id,
          ),
        );
        dispatch(action_GET_news_comment(news_id, 10));
        // dispatch(
        //   action_SET_notications(
        //     users_reducers.firstname +
        //       ' ' +
        //       users_reducers.lastname +
        //       ' Commented',
        //     comment,
        //     'high',
        //     'all',
        //     users_reducers?.prem_id,
        //   ),
        // );
        // await dispatch(
        //   ACTION_NOTIF(
        //     users_reducers.prem_id + ' Commented',
        //     comment,
        //     'pgh',
        //     'Comment',
        //   ),
        // );
        await setcomment('');
      }
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, comment]);
  console.log(ext);
  return (
    <SafeAreaView style={styles.cardmain}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
        data={news_comments}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadmore}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <View style={styles.contentNOTIFICATION}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 20,
                width: width,
                maxHeight: height,
              }}>
              <View
                style={{
                  width: '20%',
                  height: 50,
                  maxHeight: height,
                }}>
                <Image
                  source={{
                    uri: `${news_reducers_url}/${item?.img}`,
                  }}
                  style={{
                    marginTop: 10,
                    marginStart: 10,
                    width: 40,
                    height: 40,

                    borderRadius: 120 / 2,
                    overflow: 'hidden',
                    borderWidth: 3,
                  }}
                />
              </View>
              <View
                style={{
                  padding: 5,
                  width: '90%',
                  maxHeight: height,
                }}
                key={index}>
                <Text
                  style={{
                    maxHeight: height,
                    paddingStart: 5,
                    fontFamily: 'SFUIDisplay-Regular',
                  }}>
                  {item?.fullname}
                  {'\n'}
                  {item?.comment}
                </Text>
              </View>
            </View>
          </View>
        )}
        ListHeaderComponent={
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: 300,
                alignItems: ext !== 'mp4' ? 'center' : 'stretch',
              }}>
              {ext !== 'mp4' ? (
                <ImageViewer />
              ) : (
                <NewsVideoPlayer
                  url={`${news_reducers_url}/${news_image?.data[0]?.news_image}`}
                />
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                flex: 1,
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
            <Text style={styles.textTitle}>Comments</Text>
            <CardView>
              <View style={styles.containerNOTIFICATION}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 50,
                  }}>
                  <View style={{width: 320, height: 40}}>
                    <TextInput
                      style={{borderWidth: 2, borderColor: '#f7f5f5'}}
                      multiline
                      placeholder="Type a comment here"
                      numberOfLines={2}
                      onChangeText={(text) => onChangeText(text)}
                      value={comment}
                    />
                  </View>
                  <View style={{width: 60, height: 50}}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 30,
                        overflow: 'hidden',
                      }}>
                      <Button
                        style={{borderRadius: 25, backgroundColor: '#0084FF'}}
                        icon={
                          <Icons name="arrow-right" size={20} color="white" />
                        }
                        onPress={() => handleCommentSend()}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </CardView>
          </View>
        }
      />
    </SafeAreaView>
  );
};
export default UINews;
