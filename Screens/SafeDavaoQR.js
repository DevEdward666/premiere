import React, {useEffect, useState, useCallback} from 'react';
import {Button} from 'react-native';
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';

import {action_SET_files} from '../Services/Actions/Users_Actions';
const SafeDavaoQR = () => {
  const [imageresponse, setimageresponse] = useState(null);
  const [resourcePath, setresourcePath] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    const imagefetch = () => {
      setimageresponse(
        'file:///storage/emulated/0/Pictures/SafeDavaoQr/SafeDavaoQr.jpg',
      );
      setresourcePath(
        'file:///storage/emulated/0/Pictures/SafeDavaoQr/SafeDavaoQr.jpg',
      );
    };
    mounted && imagefetch();
    return () => (mounted = false);
  }, []);
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission title',
          message: 'Permission message',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        dispatch(action_SET_files(imageresponse));
        console.log('You can use the EXTERNAL_STORAGE');
      } else {
        console.log('EXTERNAL_STORAGE permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const HandleSaveImage = () => {
    requestStoragePermission();
  };
  const imageresponses = useCallback(() => {
    ImagePicker.launchImageLibrary(
      {
        title: 'Choose an Image',
        includeBase64: true,
      },
      (response) => {
        // let source = 'data:image/jpeg;base64,' + response.base64;
        let source = response.base64;
        setresourcePath(response.uri); // update the local state, this will rerender your TomarFoto component with the photo uri path.
        if (response.didCancel) {
          alert('Action Cancelled');
        } else if (response.error) {
          alert('Error : ', error);
        } else {
          // const source = {uri: response.uri};
          //  console.log(source);

          setimageresponse(source);

          //  dispatch(action_POST_FileImageProfile(response, username));
        }
      },
    );
  }, [setresourcePath]);
  return (
    <View style={{flex: 1}}>
      {resourcePath ? (
        <Image
          style={styles.avatar}
          source={{
            uri: resourcePath,
          }}
        />
      ) : (
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          }}
        />
      )}

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.buttonStyle}>
          <Button
            onPress={imageresponses}
            title="Choose Image"
            color="#0148a4"
            accessibilityLabel="Choose Image"
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            onPress={HandleSaveImage}
            title="Save Image"
            color="#0148a4"
            accessibilityLabel="Save Image"
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  avatar: {
    width: '90%',
    height: 500,
    borderRadius: 1,
    borderWidth: 4,
    margin: 50,
    borderColor: 'white',
    alignSelf: 'center',
  },
  buttonStyle: {
    flex: 1,

    borderRadius: 30,
    margin: 30,
    width: '50%',
  },
});
export default SafeDavaoQR;
