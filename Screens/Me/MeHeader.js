import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-native-elements'
import {View,Image,Text} from 'react-native'
import styles from './style'
import {useSelector} from 'react-redux'
const MeHeader = () => {
    const users_image = useSelector((state) => state.User_Reducers.image);
    let imageUri = 'data:image/png;base64,' + users_image;
    const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
    return (
        <Card containerStyle={styles.userplate}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <View style={{width: '30%', height: 100, margin: 5}}>
            <Image
              style={styles.userimagestyle}
              source={{uri: imageUri, scale: 1}}
            />
          </View>
          <View
            style={{
              width: '60%',
              height: 100,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'left', fontSize: 13,  fontFamily: "SFUIDisplay-Light"}}>
              {users_reducers?.lastname+","+users_reducers?.firstname}
            </Text>
            <Text style={{textAlign: 'left', fontSize: 13,  fontFamily: "SFUIDisplay-Light"}}>
              Premiere ID: {users_reducers?.prem_id}
            </Text>
          </View>
        </View>
      </Card>
   
    );
};

MeHeader.propTypes = {
    
};

export default MeHeader;