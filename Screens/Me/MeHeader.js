import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-native-elements';
import {View, Image, Text} from 'react-native';
import styles from './style';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonMe from './SkeletonMe/SkeletonMe';
const MeHeader = () => {
  const users_image = useSelector((state) => state.User_Reducers.image);
  AsyncStorage.setItem('prem_image', users_image);

  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const [imagerender, setimagerender] = useState(false);
  const [image, setimage] = useState('');

  AsyncStorage.getItem('prem_image').then(async (item) => {
    let mounted = true;
    const getprem_image = async () => {
      if (mounted) {
        await setimage(item);
        await setimagerender(true);
      }
    };
    mounted && getprem_image();
    return () => {
      mounted = false;
    };
  });

  let imageUri = 'data:image/png;base64,' + image;

  return (
    <Card containerStyle={styles.userplate}>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={{width: '30%', height: 100, margin: 5}}>
          {image ? (
            <Image
              style={styles.userimagestyle}
              source={{uri: imageUri, scale: 1}}
            />
          ) : (
            <SkeletonMe />
          )}
        </View>
        <View
          style={{
            width: '60%',
            height: 100,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 13,
              fontFamily: 'SFUIDisplay-Light',
            }}>
            {users_reducers?.lastname + ',' + users_reducers?.firstname}
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 13,
              fontFamily: 'SFUIDisplay-Light',
            }}>
            Premiere ID: {users_reducers?.prem_id}
          </Text>
        </View>
      </View>
    </Card>
  );
};

MeHeader.propTypes = {};

export default MeHeader;
