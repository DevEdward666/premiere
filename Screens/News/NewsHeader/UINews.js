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
import CustomBottomSheet from '../../Plugins/CustomeBottomSheet';
import Icons from 'react-native-vector-icons/FontAwesome';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import wait from '../../Plugins/waitinterval';
import {
  action_GET_news,
  action_GET_news_comment,
  action_GET_news_reaction,
  action_set_news_reaction,
  action_set_news_comment,
} from '../../Services/Actions/News_Actions';
import {action_SET_notications} from '../../Services/Actions/Default_Actions';
import {ACTION_NOTIF,action_open_bottomsheet} from '../../Services/Actions/Default_Actions';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Card} from 'react-native-elements/dist/card/Card';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
import styles from './styles'
import NewsCard from './NewsCard'
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
  const open_bottomsheet = useSelector((state) => state.Default_Reducers.bottomSheet);
  const news_comments = useSelector(
    (state) => state.News_Reducers.data_comment,
  );

  const onRefresh = useCallback(() => {
    let unmount =false;
    if(!unmount){
      setRefreshing(true);
      wait(1000).then(() => {
        setRefreshing(false);
        dispatch(action_GET_news(offset));
      });
    }
    return ()=> {unmount=true}
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const getnews = () => {
      dispatch(action_GET_news(offset));
    };
    mounted && getnews();
    return () => {mounted = false};
  }, [dispatch,offset]);
  const loadmore = useCallback(async () => {
    let unmount =false;
    if(!unmount){
    setoffset((prev) => prev + 10);
    await dispatch(action_GET_news(offset));
  }
  return ()=> {unmount=true}
  }, [dispatch,offset]);

  const gotonewsinfo = useCallback(async (item) => {
    let unmount =false;
    if(!unmount){
    await AsyncStorage.setItem('news_id', item.id.toString());

    Actions.newsinfo();
  }
  return ()=> {unmount=true}
  }, []);
  const onChangeText = useCallback((text) => {
    let unmount =false;
    if(!unmount){
    setcomment(text);
  }
  return ()=> {unmount=true}
  },[]);
  const updateIndex = useCallback(
    async (item, index) => {
      let unmount =false;
      if(!unmount){
      await setposts_id(item?.id);
      await dispatch(action_GET_news_comment(item?.id.toString()));

      if (index !== 0) {
        dispatch(action_open_bottomsheet(true))
        // setCommentIsVisible(true);
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
    }
    return ()=> {unmount=true}
    },
    [dispatch],
  );
  const handleCommentSend = useCallback(async () => {
    let unmount =false;
    if(!unmount){
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
  }
  return ()=> {unmount=true}
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
  return (
    <SafeAreaView style={styles.flatlistcontainer}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
       <ImageBackground
      style={{flex: 1}}
      source={require('../../assets/background/white.jpg')}
      resizeMode="cover"
      blurRadius={20}>
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
              <NewsCard title={item.Title} img={`${news_reducers_url}/${item.Image}`} description={item.description} UI={
<>
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
</>
              }/>
            
             
          </TouchableHighlight>
         
          
        )}
      />
    
        <CustomBottomSheet
          isVisible={open_bottomsheet}
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
        </ImageBackground>
    </SafeAreaView>
  );
};

export default UINews;
