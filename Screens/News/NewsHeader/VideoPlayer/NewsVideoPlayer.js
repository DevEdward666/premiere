import React from 'react';
import {AppRegistry, StyleSheet, View, Dimensions} from 'react-native';
// import Video from 'react-native-video';
import styles from './style';
import {useSelector} from 'react-redux';
import {Video, AVPlaybackStatus} from 'expo-av';

const NewsVideoPlayer = ({url}) => {
  const video = React.useRef(null);
  console.log(url);
  return (
    <View>
      {/* <VideoPlayer
        fullScreenOnLongPress
        resizeMode="cover"
        video={{uri: url}}
        disableFullscreen={false}
      /> */}
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: url,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
      {/* <Video
        hideShutterView={true}
        resizeMode="cover"
        pictureInPicture={true}
        fullscreenAutorotate={true}
        controls={true}
        paused={true}
        source={{
          uri: url,
        }} // Can be a URL or a local file.
        onBuffer={onBuffer} // Callback when remote video is buffering
        onError={videoError} // Callback when video cannot be loaded
        style={styles.backgroundVideo}
      /> */}
    </View>
  );
};
export default NewsVideoPlayer;
