import React, {useEffect} from 'react';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
import {useDispatch, useSelector} from 'react-redux';
import {View, AppState} from 'react-native';
import {action_notify_signal} from '../../../Services/Actions/SignalRActions';
import {Actions} from 'react-native-router-flux';
const VideoCallJisti = () => {
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const dispatch = useDispatch();
  let data = {
    notification: 'Calling',
    from: users_reducers?.firstname + ' ' + users_reducers?.lastname,
    to: 'pgh',
    img: users_reducers?.img,
  };
  useEffect(() => {
    dispatch(action_notify_signal(data));
    setTimeout(() => {
      const url = 'https://meet.jit.si/AdminRoom';
      const userInfo = {
        displayName: 'Edward',
        email: 'user@example.com',
        avatar: 'https:/gravatar.com/avatar/abc123',
      };
      JitsiMeet.call(url, userInfo);
      /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
      /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    return () => {
      JitsiMeet.endCall();
    };
  });
  useEffect(() => {
    AppState.addEventListener('change', handleChange);

    return () => {
      AppState.removeEventListener('change', handleChange);
    };
  }, []);
  const handleChange = (newState) => {
    if (newState === 'inactive') {
      JitsiMeet.endCall();
    }
  };
  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log(nativeEvent);
    Actions.pop();
    JitsiMeet.endCall();
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log(nativeEvent);
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log(nativeEvent);
  }

  return (
    <>
      <JitsiMeetView
        onConferenceTerminated={(e) => onConferenceTerminated(e)}
        onConferenceJoined={(e) => onConferenceJoined(e)}
        onConferenceWillJoin={(e) => onConferenceWillJoin(e)}
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}
      />
    </>
  );
};

export default VideoCallJisti;
