import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_GET_news_images,
  action_GET_news_info,
  action_GET_news_comment,
} from '../../../Services/Actions/News_Actions';
import UINewsInfo from './UINewsInfo';
const MainInfo = () => {
  const dispatch = useDispatch();
  const news_id = useSelector((state) => state.News_Reducers.news_id);

  useEffect(() => {
    let mounted = true;
    const getnewsinfo = async () => {
      if (mounted) {
        await dispatch(action_GET_news_info(news_id));
        await dispatch(action_GET_news_images(news_id));
        await dispatch(action_GET_news_comment(news_id, 10));
      }
    };

    mounted && getnewsinfo();
    return () => {
      mounted = false;
    };
  }, [dispatch, news_id]);
  return <UINewsInfo />;
};
export default MainInfo;
