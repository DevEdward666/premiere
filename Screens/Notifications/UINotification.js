import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import CardView from 'react-native-rn-cardview';
import {Card} from 'react-native-paper';
import moment from 'moment';
import {
  action_GET_notications,
  ACTION_NOTIFICATION_OFFSET,
} from '../../Services/Actions/Default_Actions';
import Skeleton from './SkeletonNotif/Skeletonnotif';
const UINotification = () => {
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const [refreshing, setRefreshing] = useState(false);
  const notification_list = useSelector(
    (state) => state.Default_Reducers.notificationlist,
  );
  const notifoffset = useSelector(
    (state) => state.Default_Reducers.notifoffset,
  );

  const [offset, setoffset] = useState(15);
  const dispatch = useDispatch();
  const onRefresh = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      await setRefreshing(true);
      await dispatch(
        action_GET_notications(users_reducers?.prem_id, notifoffset),
      );
      await setRefreshing(false);
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const index = async () => {
      if (mounted) {
        await setoffset((prev) => prev + 2);
        await dispatch(ACTION_NOTIFICATION_OFFSET(offset));
        await dispatch(action_GET_notications(users_reducers?.prem_id, offset));
      }
    };
    mounted && index();
    return () => (mounted = false);
  }, [dispatch]);
  console.log(offset);
  const loadmore = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      +(await setoffset((prev) => prev + 2));
      dispatch(ACTION_NOTIFICATION_OFFSET(offset));
      dispatch(action_GET_notications(users_reducers?.prem_id, offset));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, offset]);
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../assets/background/white.jpg')}
      resizeMode="cover"
      blurRadius={20}>
      {notification_list?.loading ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.container}
          data={notification_list.data}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => loadmore()}
          onEndReachedThreshold={0.1}
          renderItem={({item, index}) => (
            <TouchableOpacity
            //   onPress={() => {
            //     gotoresult(item);
            //   }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 2,
                }}>
                <Card style={styles.cardresultlist}>
                  <Text style={styles.author}>
                    {moment(item.createadBy).format('MMMM D, YYYY')}
                  </Text>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.body}>{item.body}</Text>
                </Card>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Skeleton />
      )}
    </ImageBackground>
  );
};

UINotification.propTypes = {};

export default UINotification;
