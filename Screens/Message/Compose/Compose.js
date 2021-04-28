import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {TextInput, View, StyleSheet, StatusBar, Dimensions} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {
  action_GET_messages,
  action_send_messages,
  action_send_signal,
} from '../../../Services/Actions/SignalRActions';
import {
  ACTION_REFRESH,
  ACTION_OFFSET,
  ACTION_NOTIF,
} from '../../../Services/Actions/Default_Actions';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
const Compose = () => {
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const {width, height} = Dimensions.get('window');
  const dispatch = useDispatch();

  const [composed, setcomposed] = useState('');
  const handleMessageSend = useCallback(() => {
    let data = {message: composed, from: users_reducers?.prem_id, to: 'pgh'};
    dispatch(action_send_signal(data));
    dispatch(action_send_messages(composed, users_reducers?.prem_id, 'pgh'));

    setcomposed('');
  }, [dispatch, composed]);

  const onChangeText = useCallback(
    (text) => {
      setcomposed(text);
    },
    [composed],
  );
  return (
    <View
      style={{
        right: 0,
        left: 0,
        bottom: 0,
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
      <View style={{maxWidth: width, maxHeight: height}}>
        <TextInput
          style={{
            width: width - 90,
            height: 45,
            marginTop: 10,
            marginStart: 20,
            overflow: 'hidden',
            padding: 5,
            borderRadius: 20,
            borderColor: 'rgba(179, 179, 179,0.6)',
            borderWidth: 2,
          }}
          onChangeText={onChangeText}
          placeholder="Type Message"
          value={composed}
        />
      </View>
      <View style={{maxWidth: width, maxHeight: height, marginTop: 5}}>
        <Button
          type="clear"
          icon={<Icons name="send" size={35} color="#0099ff" />}
          onPress={() => handleMessageSend()}
        />
      </View>
    </View>
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

export default Compose;
