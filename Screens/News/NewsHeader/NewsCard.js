import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, ImageBackground, Dimensions} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import styles from './styles';
import {Thumbnail} from 'react-native-thumbnail-video';
import {useDispatch, useSelector} from 'react-redux';
import * as VideoThumbnails from 'expo-video-thumbnails';

const NewsCard = ({title, img, description, userimg, UI}) => {
  const maxHeight = Dimensions.get('window').height; // or something else
  const maxWidth = Dimensions.get('window').width;
  const [ext, setext] = useState('');
  const [thumbimage, setImage] = useState(null);

  useEffect(() => {
    let mounted = true;
    const getext = async () => {
      if (mounted) {
        setext(img.slice(-3));

        const {uri} = await VideoThumbnails.getThumbnailAsync(img, {
          time: 30000,
        });
        setImage(uri);

        console.log(uri);
      }
    };
    mounted && getext();
    return () => {
      mounted = false;
    };
  }, [ext, img]);

  return (
    <View>
      {ext !== 'mp4' ? (
        <ImageBackground
          style={{
            width: maxWidth,
            aspectRatio: 1 / 1,
            height: maxWidth,
          }}
          resizeMode="contain"
          progressiveRenderingEnabled={true}
          source={{uri: img, scale: 5, width: maxWidth, aspectRatio: 1 / 1}}>
          <Text numberOfLines={4} style={styles.carddesc}>
            <Text numberOfLines={3} style={styles.cardtitle}>
              {title}
            </Text>
            {'\n'}
            {description}
          </Text>
        </ImageBackground>
      ) : (
        <ImageBackground
          style={{
            width: maxWidth,
            aspectRatio: 1 / 1,
            height: maxWidth,
          }}
          resizeMode="contain"
          progressiveRenderingEnabled={true}
          source={{
            uri: thumbimage,
            scale: 5,
            width: maxWidth,
            aspectRatio: 1 / 1,
          }}>
          <Text numberOfLines={4} style={styles.carddesc}>
            <Text numberOfLines={3} style={styles.cardtitle}>
              {title}
            </Text>
            {'\n'}
            {description}
          </Text>
        </ImageBackground>
      )}
      {UI}
    </View>
  );
};

NewsCard.propTypes = {};

export default NewsCard;
