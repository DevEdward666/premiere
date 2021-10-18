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
  Animated,
} from 'react-native';
import {
  Button,
  ButtonGroup,
  Badge,
  Icon,
  withBadge,
} from 'react-native-elements';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import CustomBottomSheet from '../../Plugins/CustomeBottomSheet';
import Icons from 'react-native-vector-icons/FontAwesome';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SkeletonNews from './SkeletonNews/SkeletonNews';
import wait from '../../Plugins/waitinterval';
import {
  action_GET_news,
  action_GET_news_comment,
  action_GET_news_reaction,
  action_set_news_reaction,
  action_set_news_comment,
  action_SET_news_id,
} from '../../Services/Actions/News_Actions';
import {action_GET_events} from '../../../Services/Actions/Events_Actions';
import {action_SET_notications} from '../../Services/Actions/Default_Actions';
import {
  ACTION_NOTIF,
  action_open_bottomsheet,
} from '../../Services/Actions/Default_Actions';
import {convert_to_base64} from '../../../Services/Actions/News_Actions';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
import styles from './styles';
import NewsCard from './NewsCard';
import {action_sethide_header} from '../../../Services/Actions/Default_Actions';
import NewsCarousel from './NewsCarousel';
import {HelperText} from 'react-native-paper';
import MainEvents from '../../Calendar/Events/EvetsListUI';
import MainTestimonials from '../../Testimonials/MainTestimonials';
const UINews = () => {
  const {width, height} = Dimensions.get('window');
  const [offset, setoffset] = useState(10);
  const [offsetcomment, setoffsetcomment] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [posts_id, setposts_id] = useState('');
  const [comment, setcomment] = useState('');
  const [isVisibleError, setisVisibleError] = useState(false);
  const SPACING = 10;
  const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 1;
  const EMPTY_ITEM_SIZE = width - ITEM_SIZE / 2;
  const BACKDROP_HEIGHT = height * 0.65;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const news_reducers = useSelector((state) => state.News_Reducers.data);
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const news_reducers_url = useSelector((state) => state.News_Reducers.url);
  const open_bottomsheet = useSelector(
    (state) => state.Default_Reducers.bottomSheet,
  );
  const news_comments = useSelector(
    (state) => state.News_Reducers.data_comment,
  );
  const [loggedin, setloggedin] = useState(false);
  const [token, settoken] = useState('');
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

  const onRefresh = useCallback(async () => {
    let mounted = true;
    if (mounted) {
    await  setRefreshing(true);
    dispatch(action_GET_news(offset));
         await  setRefreshing(false);
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const getnews = () => {
      if(mounted){
      dispatch(action_open_bottomsheet(false));
      dispatch(action_GET_news(offset));
      }

    };
    mounted && getnews();
    return () => {
      mounted = false;
    };
  }, [dispatch, offset]);
  const loadmoreComments = useCallback(async () => {
    let unmount = false;
    if (!unmount) {
      setoffsetcomment((prev) => prev + 10);
      dispatch(action_GET_news_comment(item?.id.toString(), offsetcomment));
    }
    return () => {
      unmount = true;
    };
  }, [dispatch, offset]);
  const loadmore = useCallback(async () => {
    let unmount = false;
    if (!unmount) {
      setoffset((prev) => prev + 10);
      await dispatch(action_GET_news(offset));
    }
    return () => {
      unmount = true;
    };
  }, [dispatch, offset]);

  const gotonewsinfo = useCallback(
    async (item) => {
      let mounted = true;
      if (mounted) {
        dispatch(action_SET_news_id(item.id));

        await Actions.newsinfo();
      }
      return () => {
        mounted = false;
      };
    },
    [dispatch],
  );
  const onChangeText = useCallback(
    (text) => {
      let mounted = true;
      if (mounted) {
        if (loggedin) {
          setcomment(text);
          setisVisibleError(false);
        } else {
          setisVisibleError(true);
          setcomment('');
        }
      }
      return () => {
        mounted = false;
      };
    },
    [loggedin],
  );

  const updateIndex = useCallback(
    async (item, index) => {
      let mounted = true;

      if (mounted) {
        await setposts_id(item?.id);
        dispatch(action_GET_news_comment(item?.id.toString(), 10));

        if (index !== 0) {
          dispatch(action_open_bottomsheet(true));
        } else {
          dispatch(
            action_set_news_reaction(
              item?.id.toString(),
              'Like',
              users_reducers?.prem_id,
            ),
          );
          dispatch(action_GET_news_reaction(item?.id));
          dispatch(action_GET_news(offset));
        }
      }
      return () => {
        mounted = false;
      };
    },
    [dispatch],
  );
  const handleCommentSend = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      if (loggedin) {
        if (comment !== ' ') {
          dispatch(
            action_set_news_comment(
              posts_id.toString(),
              comment,
              users_reducers?.prem_id,
            ),
          );
          dispatch(action_GET_news_comment(posts_id.toString()));
          dispatch(
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
          dispatch(
            ACTION_NOTIF(
              users_reducers.prem_id + ' Commented',
              comment,
              'pgh',
              'Comment',
            ),
          );
          await setcomment('');
        }
        setisVisibleError(false);
      } else {
        setisVisibleError(true);
        setcomment('');
      }
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, comment, loggedin]);
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

  return (
    <ScrollView style={styles.flatlistcontainer}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <NewsCarousel />

      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                flex: 1,
                color: 'black',
                marginStart: 30,
                textAlign: 'left',
                fontSize: 36,
                fontFamily: 'SFUIDisplay-Bold',
              }}>
              Events
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <TouchableHighlight
            onPress={() => Actions.seemoreevents()}
            underlayColor="white">
            <Text
              style={{
                flex: 1,
                color: 'black',
                marginStart: 30,
                alignSelf: 'flex-end',
                textAlign: 'right',
                fontSize: 12,
                marginEnd: 15,
                marginBottom: 30,
                fontFamily: 'SFUIDisplay-Bold',
              }}>
              See More
            </Text>
          </TouchableHighlight>
        </View>
        <MainEvents />
        <View style={{marginTop: 30}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  flex: 1,
                  color: 'black',
                  marginStart: 30,
                  textAlign: 'left',
                  fontSize: 36,
                  fontFamily: 'SFUIDisplay-Bold',
                }}>
                News
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <TouchableHighlight
              onPress={() => Actions.newslist()}
              underlayColor="white">
              <Text
                style={{
                  flex: 1,
                  color: 'black',
                  marginStart: 30,
                  alignSelf: 'flex-end',
                  textAlign: 'right',
                  fontSize: 12,
                  marginEnd: 15,
                  fontFamily: 'SFUIDisplay-Bold',
                }}>
                See More
              </Text>
            </TouchableHighlight>
          </View>
          {news_reducers.length <= 0 ? (
            <Card
              style={{flex: 1, borderRadius: 15, marginEnd: 5, padding: 10}}>
              <Card.Title
                style={styles.EventListTitle}
                title={''}
                subtitle={''}
              />
              <Image
                style={{
                  resizeMode: 'center',
                  height: 150,
                  width: 150,
                  alignSelf: 'center',
                }}
                source={require('../../../assets/icons/newspaper.jpg')}
              />
              <Card.Content>
                <Title style={styles.EventListTitleThin}>
                  No new news for today
                </Title>
                <Paragraph style={styles.EventListTitle}></Paragraph>
              </Card.Content>
            </Card>
          ) : (
            <Animated.FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              horizontal={true}
              style={styles.container}
              data={news_reducers}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={loadmore}
              onEndReachedThreshold={0.1}
              onEndReachedThreshold={0.1}
              onEndReachedThreshold={0.1}
              contentContainerStyle={{
                alignItems: 'center',
              }}
              snapToInterval={ITEM_SIZE}
              decelerationRate={1}
              bounces={true}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
              scrollEventThrottle={26}
              renderItem={({item, index}) => {
                const inputRange = [
                  (index - 1) * ITEM_SIZE,
                  index * ITEM_SIZE,
                  (index + 1) * ITEM_SIZE,
                ];
                const translateY = scrollX.interpolate({
                  inputRange,
                  outputRange: [0, 0, 0],
                  extrapolate: 'clamp',
                });
                return (
                  <TouchableHighlight
                    onPress={() => gotonewsinfo(item)}
                    underlayColor="white">
                    <NewsCard
                      title={item.Title}
                      img={`${news_reducers_url}/${item.Image}`}
                      description={item.description}
                      UI={
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 1,
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                flex: 2,
                                justifyContent: 'flex-start',
                              }}>
                              <View
                                style={{
                                  width: 30,
                                  marginBottom: -20,
                                  marginStart: 20,
                                }}>
                                <Icons
                                  name="thumbs-up"
                                  size={15}
                                  color="grey"
                                />
                              </View>
                              <View style={{width: 80}}>
                                <Badge status="primary" value={item?.likes} />
                              </View>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                              }}>
                              <View style={{flex: 1, padding: 4}}>
                                <Text>
                                  Comments <Text>{item?.totalcomments}</Text>
                                </Text>
                              </View>
                            </View>
                          </View>
                          <ButtonGroup
                            onPress={(index) => updateIndex(item, index)}
                            buttons={buttons}
                            containerStyle={{height: 35, marginBottom: 15}}
                          />
                        </>
                      }
                    />
                  </TouchableHighlight>
                );
              }}
            />
          )}
          <View style={{marginTop: 30}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    flex: 1,
                    color: 'black',
                    marginStart: 30,
                    textAlign: 'left',
                    fontSize: 36,
                    fontFamily: 'SFUIDisplay-Bold',
                  }}>
                  Testimonials
                </Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <MainTestimonials />
            </View>
          </View>
        </View>
      </View>
      <CustomBottomSheet
        isVisible={open_bottomsheet}
        color="white"
        UI={
          <View style={{flex: 1}}>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={styles.container}
              data={news_comments}
              keyExtractor={(comments, index) => index.toString()}
              onEndReached={loadmoreComments}
              onEndReachedThreshold={0.1}
              renderItem={({item, index}) => (
                <CardView
                  key={index}
                  style={{paddingTop: 20, paddingBottom: 20}}>
                  <View style={styles.contentNOTIFICATION}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: width,
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
                          }}>
                          {item?.fullname}
                          {'\n'}
                          {item?.comment}
                        </Text>
                      </View>
                    </View>
                  </View>
                </CardView>
              )}
              ListHeaderComponent={
                <View style={styles.containerNOTIFICATION}>
                  <Text>Comments</Text>
                </View>
              }
              ListFooterComponent={
                <SafeAreaView style={{flex: 1}}>
                  <HelperText type="error" visible={isVisibleError}>
                    You need to be logged in to use this function
                  </HelperText>
                  <View style={styles.containerComment}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: 50,
                      }}>
                      <View style={{width: '85%', height: 40}}>
                        <TextInput
                          style={{borderWidth: 2, borderColor: '#f7f5f5'}}
                          multiline
                          placeholder="Type a comment here"
                          numberOfLines={4}
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
                            icon={
                              <Icons
                                name="arrow-right"
                                size={20}
                                color="white"
                              />
                            }
                            onPress={() => handleCommentSend()}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </SafeAreaView>
              }
            />
          </View>
        }
      />
    </ScrollView>
  );
};

export default UINews;
