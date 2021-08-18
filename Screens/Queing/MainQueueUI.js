import React, {useCallback, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Card} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import {generatenumberregular} from '../../Services/Actions/QueueActions';
import DoneOverlay from '../../Plugins/CustomOverlay/DoneOverlay';
import {Button} from 'react-native-elements';
const MainQueueUI = () => {
  const regular = useSelector((state) => state.QueueReducers.regular);
  const generatednumber = useSelector(
    (state) => state.QueueReducers.generatednumber,
  );
  const [overlayvisible, setoverlayvisible] = useState(false);
  console.log(generatednumber);
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const dispatch = useDispatch();
  const handleGenerate = useCallback(
    (item) => {
      dispatch(
        generatenumberregular(item?.countername, users_reducers?.prem_id),
      );
      setoverlayvisible(true);
    },
    [dispatch],
  );
  const handleDone = useCallback(() => {
    setoverlayvisible(false);
  }, []);
  return (
    <View style={styles.container}>
      <DoneOverlay
        visible={overlayvisible}
        message={`${generatednumber.message} ${generatednumber.data}`}
        UI={
          <Button
            onPress={() => handleDone()}
            buttonStyle={{
              backgroundColor: '#034c81',
              borderRadius: 10,
              width: '70%',
              marginBottom: 80,
              alignSelf: 'center',
              height: 50,
            }}
            title="Done"
          />
        }
      />
      <ScrollView>
        <View>
          <View style={{flexDirection: 'column', margin: 30}}>
            <View
              style={{
                flexDirection: 'row',
                height: 30,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  height: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',

                    fontSize: 24,
                    alignContent: 'center',
                  }}>
                  Generate Queue Number
                </Text>
              </View>
            </View>
          </View>
          {regular?.map((item, index) => {
            return (
              <View style={{flexDirection: 'column', height: 100}} key={index}>
                <TouchableHighlight
                  onPress={() => handleGenerate(item)}
                  underlayColor="white">
                  <Card containerStyle={styles.plate}>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 30,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: '100%',
                          height: 20,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            marginStart: 10,
                            fontSize: 14,
                            alignContent: 'center',
                          }}>
                          {item?.countername}
                        </Text>
                      </View>
                    </View>
                  </Card>
                </TouchableHighlight>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default MainQueueUI;
