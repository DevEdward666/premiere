import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MessageList from '../Message/MessageList/MessageList';
import Compose from '../Message/Compose/Compose';
import Icon from 'react-native-vector-icons/FontAwesome';

const iconProfile = () => <Icon color="#f53d3d" name="user-o" size={25} />;
const Message = () => {
  const dispatch = useDispatch();

  const {width, height} = Dimensions.get('window');
  return (
    <KeyboardAvoidingView style={{flex: 1, maxHeight: height - 70}}>
      <MessageList />

      <Compose />
    </KeyboardAvoidingView>
  );
};

Message.propTypes = {};

export default Message;
