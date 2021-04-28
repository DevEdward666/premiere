import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import CardView from 'react-native-rn-cardview';
import {Card} from 'react-native-paper';
import {action_GET_notications} from '../../Services/Actions/Default_Actions';
const UINotification = () => {
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const [refreshing, setRefreshing] = useState(false);
  const notification_list = useSelector(
    (state) => state.Default_Reducers.notificationlist,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const index = () => {
      dispatch(action_GET_notications(users_reducers?.prem_id));
    };
    mounted && index();
    return () => (mounted = false);
  }, [dispatch]);
  const onRefresh = useCallback(async () => {
    await setRefreshing(true);
    await dispatch(action_GET_notications(users_reducers?.prem_id));
    await setRefreshing(false);
  }, [dispatch]);
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
      data={notification_list.data}
      keyExtractor={(item, index) => index.toString()}
      //   onEndReached={loadmore}
      //   onEndReachedThreshold={0.1}
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
              <Text style={styles.author}>{item.createdBy}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </Card>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

UINotification.propTypes = {};

export default UINotification;
