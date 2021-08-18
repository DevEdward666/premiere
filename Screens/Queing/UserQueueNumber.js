import React from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {useSelector} from 'react-redux';
import styles from './style';
const UserQueueNumber = () => {
  const queueusernumber = useSelector(
    (state) => state.QueueReducers.queueusernumber,
  );
  console.log(queueusernumber.data[0]?.queueno);
  return (
    <Card
      containerStyle={{
        borderRadius: 10,
        elevation: 15,
        height: 180,
        padding: 10,
      }}>
      <View
        style={[
          styles.userqueuenumbercontainer,
          {
            flexDirection: 'row',
          },
        ]}>
        <View style={{flex: 5, padding: 10}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'SFUIDisplay-SemiBold',
              fontWeight: '900',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}>
            YOUR QUEUE NUMBER FOR THIS COUNTER
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.userqueuenumbercontainer,
          {
            flexDirection: 'row',
          },
        ]}>
        <View style={{flex: 5, padding: 10}}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'SFUIDisplay-SemiBold',
              fontWeight: '900',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}>
            {queueusernumber.data[0]?.queueno}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.userqueuenumbercontainer,
          {
            flexDirection: 'row',
          },
        ]}>
        <View style={{flex: 5, padding: 10}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'SFUIDisplay-SemiBold',
              fontWeight: '900',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}>
            ON QUEUE
          </Text>
        </View>
      </View>
    </Card>
  );
};
export default UserQueueNumber;
