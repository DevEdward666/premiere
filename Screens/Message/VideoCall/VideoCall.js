import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView, View} from 'react-native';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
// Import the RtcEngine class and view rendering components into your project.
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
// Import the UI styles.
import styles from './styles';

const VideoCall = () => {
  const _engine = RtcEngine;
  const [channelName, setChannelName] = useState('Premiere');
  const [token, settoken] = useState(
    '006084d2a116b914c4c966bbd67c6799f74IAAoke4jgoWp4cJFAv4mJigZJB90mjnZ5+6YSlhTQRXxg1n/i1oAAAAAEADGTqVpbFOBYAEAAQBsU4Fg',
  );
  const [joinSucceed, setjoinSucceed] = useState(false);
  const [peerIds, setpeerIds] = useState([]);
  const appid = useSelector((state) => state.AgoraReducers.appid);

  const requestCameraAndAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        // console.log('You can use the cameras & mic');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    let mounted = true;
    const initalize = async () => {
      const _engine = await RtcEngine.create(appid);
      if (Platform.OS === 'android') {
        requestCameraAndAudioPermission();
        // .then(() => {
        //   console.log('requested!');
        // });
      }
      await _engine.enableVideo();
      await _engine.enableAudio();
      await _engine.addListener('UserJoined', (uid, elapsed) => {
        console.log('UserJoined', uid, elapsed);

        if (peerIds.indexOf(uid) === -1) {
          setpeerIds([...peerIds, uid]);
        }
      });

      await _engine.addListener('UserOffline', (uid, reason) => {
        console.log('UserOffline', uid, reason);

        setpeerIds(peerIds.filter((id) => id !== uid));
      });

      await _engine.addListener(
        'JoinChannelSuccess',
        (channel, uid, elapsed) => {
          console.log('JoinChannelSuccess', channel, uid, elapsed);

          setjoinSucceed(true);
        },
      );
    };
    mounted && initalize();
    return () => (mounted = false);
  }, [joinSucceed, peerIds]);
  console.log(peerIds);
  const startCall = useCallback(async () => {
    let _engine = await RtcEngine.create(appid);
    await _engine?.joinChannel(token, channelName, null, 0);
  }, [appid]);

  const endCall = useCallback(async () => {
    let _engine = await RtcEngine.create(appid);
    await _engine?.leaveChannel();
    setpeerIds([]);
    setjoinSucceed(false);
  }, []);
  return (
    <View style={styles.max}>
      <View style={styles.max}>
        <View style={styles.buttonHolder}>
          <TouchableOpacity onPress={() => startCall()} style={styles.button}>
            <Text style={styles.buttonText}> Start Call </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => endCall()} style={styles.button}>
            <Text style={styles.buttonText}> End Call </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fullView}>
          <RtcLocalView.SurfaceView
            style={styles.max}
            channelId={channelName}
            renderMode={VideoRenderMode.Fit}
          />
          <ScrollView
            style={styles.remoteContainer}
            contentContainerStyle={{paddingHorizontal: 2.5}}
            horizontal={true}>
            {peerIds.map((value, index, array) => {
              return (
                <RtcRemoteView.SurfaceView
                  style={styles.remote}
                  uid={value}
                  channelId={channelName}
                  renderMode={VideoRenderMode.Fit}
                  zOrderMediaOverlay={true}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

VideoCall.propTypes = {};

export default VideoCall;
