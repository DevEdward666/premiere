import React, {useEffect, useCallback, useState, useRef} from 'react';

import PropTypes from 'prop-types';
import {
  FlatList,
  RefreshControl,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {
  action_GET_messages,
  action_send_messages,
  action_send_signal,
  action_set_message,
} from '../../Services/Actions/SignalRActions';
import {
  ACTION_REFRESH,
  ACTION_OFFSET,
  ACTION_NOTIF,
} from '../../Services/Actions/Default_Actions';
import SkeletonMsgLst from '../SkeletonMessageList/SkeletonMsgLst';
const MessageList = () => {
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const dispatch = useDispatch();
  const [offset, setoffset] = useState(50);
  const [message, setmessage] = useState([]);
  const messages = useSelector((state) => state.SignalRReducers.messages);
  const {width, height} = Dimensions.get('window');
  const gorefresh = useSelector((state) => state.Default_Reducers.refresh);
  const addoffset = useSelector((state) => state.Default_Reducers.offset);
  const hubConnect = useSelector((state) => state.Default_Reducers.hubconnect);
  const scrollViewRef = useRef(null);
  const MY_USER_ID = users_reducers?.prem_id;
  useEffect(() => {
    let mounted = true;
    const getmessages = async () => {
      if (messages?.loading) {
        await setoffset((prev) => prev + addoffset);
        await dispatch(ACTION_OFFSET(offset));

        await dispatch(
          action_GET_messages(users_reducers.prem_id, 'pgh', offset),
        );
        await setmessage(messages?.data);
      }
      await dispatch(
        action_GET_messages(users_reducers.prem_id, 'pgh', offset),
      );
      await setmessage(messages?.data);
    };

    mounted && getmessages();
    return () => (mounted = false);
  }, [dispatch, messages?.loading]);
  useEffect(() => {
    let mounted = true;
    const createHubConnection = async () => {
      try {
        hubConnect.on('sendToReact', async (data) => {
          if (data.to === users_reducers?.prem_id) {
            await dispatch(
              ACTION_NOTIF(
                'From ' + data.from + ' To ' + data.to,
                data.message,
                data.to,
                'Message',
              ),
            );
          }

          await setmessage((message) => [
            ...message,
            {
              message: data.message,
              from: data.from,
              to: data.to,
            },
          ]);
        });
      } catch (err) {
        // alert(err);
        // console.log(err);
        console.log(
          'Error while establishing connection: ' + JSON.stringify({err}),
        );
      }

      // dispatch(signalr_connection());
    };
    mounted && createHubConnection();
    return () => (mounted = false);
  }, [dispatch, hubConnect]);

  const handleRefresh = useCallback(async () => {
    await setoffset((prev) => prev + addoffset);
    await dispatch(ACTION_REFRESH(true));
    await dispatch(ACTION_OFFSET(offset));
    setTimeout(() => {
      dispatch(ACTION_REFRESH(false));
    }, 500);
    setTimeout(() => {
      dispatch(action_GET_messages(users_reducers.prem_id, 'pgh', offset));
      setmessage(messages);
    }, 100);
  }, [dispatch, addoffset, messages]);
  return messages?.loading ? (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={gorefresh}
          onRefresh={() => handleRefresh()}
        />
      }
      style={{marginBottom: 50}}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        setTimeout(() => {
          scrollViewRef.current.scrollToEnd();
        }, 1)
      }
      data={message}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
        // if (item.from === users_reducers?.prem_id) {
        // }
        if (item.from === MY_USER_ID) {
          return (
            <View
              key={index}
              style={{
                alignSelf: 'flex-end',

                maxWidth: width,
                maxHeight: height,
              }}>
              <Card
                containerStyle={{
                  backgroundColor: '#0099ff',
                }}
                borderRadius={20}>
                <Text style={{color: 'white'}}>
                  Me
                  {'\n'}
                  {item?.message}
                </Text>
              </Card>
            </View>
          );
        } else {
          return (
            <View
              key={index}
              style={{
                alignSelf: 'flex-start',
                maxWidth: width,
                maxHeight: height,
              }}>
              <Card
                containerStyle={{backgroundColor: '#e4e6eb'}}
                borderRadius={20}>
                <Text>
                  {item?.from}
                  {'\n'}
                  {item?.message}
                </Text>
              </Card>
            </View>
          );
        }
      }}
    />
  ) : (
    <SkeletonMsgLst />
  );
};

const styles = StyleSheet.create({
  scrollView: {flexGrow: 1, flexShrink: 1},
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    textAlign: 'justify',
    fontSize: 10,
  },
});

export default MessageList;
