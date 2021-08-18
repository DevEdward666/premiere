import React from 'react';
import {View, Text, TouchableHighlight, SafeAreaView} from 'react-native';
import {Card} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import styles from './style';
const Queueing = () => {
  return (
    <SafeAreaView>
      <View style={{flexDirection: 'column', height: 90}}>
        <TouchableHighlight
          onPress={() => Actions.generatenumber()}
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
                  Generate Queue Number
                </Text>
              </View>
            </View>
          </Card>
        </TouchableHighlight>
      </View>
      <View style={{flexDirection: 'column', height: 100}}>
        <TouchableHighlight
          onPress={() => Actions.numbersonqueue()}
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
                  View Numbers On Queue
                </Text>
              </View>
            </View>
          </Card>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};
export default Queueing;
