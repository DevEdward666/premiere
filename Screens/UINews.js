import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {ActionSheetIOS} from 'react-native';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  Image,
  View,
} from 'react-native';
import {
  Button,
  ButtonGroup,
  Badge,
  Icon,
  withBadge,
} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import CustomBottomSheet from '../Plugins/CustomeBottomSheet';
import Icons from 'react-native-vector-icons/FontAwesome';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import wait from '../Plugins/waitinterval';
import {
  action_GET_news,
  action_GET_news_comment,
  action_GET_news_reaction,
  action_set_news_reaction,
  action_set_news_comment,
} from '../Services/Actions/News_Actions';
import {action_SET_notications} from '../Services/Actions/Default_Actions';
import {ACTION_NOTIF} from '../Services/Actions/Default_Actions';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Card} from 'react-native-elements/dist/card/Card';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const UINews = () => {
  const {width, height} = Dimensions.get('window');
  const [offset, setoffset] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [posts_id, setposts_id] = useState('');
  const [comment, setcomment] = useState('');
  const [CommentIsVisible, setCommentIsVisible] = useState(false);
  const dispatch = useDispatch();
  const news_reducers = useSelector((state) => state.News_Reducers.data);
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const news_reducers_url = useSelector((state) => state.News_Reducers.url);
  const news_comments = useSelector(
    (state) => state.News_Reducers.data_comment,
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      dispatch(action_GET_news(offset));
    });
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const getnews = () => {
      dispatch(action_GET_news(offset));
    };

    mounted && getnews();
    return () => (mounted = false);
  }, [dispatch]);
  const loadmore = useCallback(async () => {
    setoffset((prev) => prev + 10);
    await dispatch(action_GET_news(offset));
  }, [dispatch]);

  const gotonewsinfo = useCallback(async (item) => {
    await AsyncStorage.setItem('news_id', item.id.toString());

    Actions.newsinfo();
  }, []);
  const onChangeText = useCallback((text) => {
    setcomment(text);
  });
  const updateIndex = useCallback(
    async (item, index) => {
      await setposts_id(item?.id);
      await dispatch(action_GET_news_comment(item?.id.toString()));

      if (index !== 0) {
        setCommentIsVisible(true);
      } else {
        await dispatch(
          action_set_news_reaction(
            item?.id.toString(),
            'Like',
            users_reducers?.prem_id,
          ),
        );
        await dispatch(action_GET_news_reaction(item?.id));
        await dispatch(action_GET_news(offset));
      }
    },
    [dispatch],
  );
  const handleCommentSend = useCallback(async () => {
    if (comment !== ' ') {
      await dispatch(
        action_set_news_comment(
          posts_id.toString(),
          comment,
          users_reducers?.prem_id,
        ),
      );
      await dispatch(action_GET_news_comment(posts_id.toString()));
      await dispatch(
        action_SET_notications(
          users_reducers.firstname +
            ' ' +
            users_reducers.lastname +
            ' Commented',
          comment,
          'high',
          'all',
          users_reducers?.prem_id,
        ),
      );
      await dispatch(
        ACTION_NOTIF(
          users_reducers.prem_id + ' Commented',
          comment,
          'pgh',
          'Comment',
        ),
      );
      await setcomment('');
    }
  }, [dispatch, comment]);
  const component1 = () => {
    return (
      <>
        <Text>
          <Icons name="thumbs-up" size={15} color="grey" /> Like
        </Text>
      </>
    );
  };
  const component2 = () => {
    return (
      <Text>
        <Icons name="comment" size={15} color="grey" /> Comment
      </Text>
    );
  };
  const buttons = [{element: component1}, {element: component2}];

  const [gestureName, setgestureName] = useState('');
  const onSwipe = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        setCommentIsVisible(false);

        break;
      case SWIPE_LEFT:
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  });
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 1000,
  };
  return (
    <SafeAreaView style={styles.flatlistcontainer}>
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
        data={news_reducers}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadmore}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => (
          <TouchableHighlight
            onPress={() => gotonewsinfo(item)}
            underlayColor="white">
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
                  source={{uri: `${news_reducers_url}/${item.Image}`}}
                  style={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}>
                    <Text numberOfLines={6} style={styles.text}>
                      {item.Title}
                      {'\n'}
                      {'\n'}
                      {item.description}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  height: 30,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                  }}>
                  <View style={{width: 30, marginBottom: -20, marginStart: 20}}>
                    <Icons name="thumbs-up" size={15} color="grey" />
                  </View>
                  <View style={{width: 80}}>
                    <Badge status="primary" value={item?.likes} />
                  </View>
                </View>
              </View>
              <ButtonGroup
                onPress={(index) => updateIndex(item, index)}
                buttons={buttons}
                containerStyle={{height: 35, marginBottom: 15}}
              />
            </CardView>
          </TouchableHighlight>
        )}
      />
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        config={config}>
        <CustomBottomSheet
          isVisible={CommentIsVisible}
          color="white"
          UI={
            <SafeAreaView>
              <ScrollView>
                <CardView>
                  <View style={styles.containerNOTIFICATION}>
                    <Text>Comments</Text>
                  </View>
                </CardView>
                {news_comments.map((Notification) => {
                  return (
                    <CardView key={Notification.news_comment_pk}>
                      <View style={styles.contentNOTIFICATION}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginBottom: 50,
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
                                uri: `${news_reducers_url}/${Notification?.img}`,
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
                            key={Notification.news_comment_pk}>
                            <Text
                              style={{
                                maxHeight: height,
                                paddingStart: 5,
                              }}>
                              {Notification?.fullname}
                              {'\n'}
                              {Notification?.comment}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </CardView>
                  );
                })}
              </ScrollView>
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
                        placeholder="Comment"
                        numberOfLines={4}
                        onChangeText={(text) => onChangeText(text)}
                        value={comment}
                      />
                    </View>
                    <View style={{width: 50, height: 50}}>
                      <Button
                        icon={
                          <Icons name="arrow-right" size={20} color="white" />
                        }
                        onPress={() => handleCommentSend()}
                      />
                    </View>
                  </View>
                </View>
              </CardView>
            </SafeAreaView>
          }
        />
      </GestureRecognizer>
    </SafeAreaView>
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

  containerNOTIFICATION: {
    width: '100%',
    height: 50,
    paddingRight: 20,
    paddingLeft: 35,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  containercomment: {
    paddingVertical: 12,
    flexDirection: 'row',
    height: 100,
    alignItems: 'flex-start',
  },
});
export default UINews;
