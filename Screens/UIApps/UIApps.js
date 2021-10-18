import React from 'react';
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
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const UIApps = () => {
  const gotodiagnostics = () => {
    Actions.maindiagnosticsui();
  };
  const gotoclinic = () => {
    Actions.indexclinic();
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          <TouchableHighlight
            onPress={() => gotodiagnostics()}
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
                    width: '80%',
                    height: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      marginStart: 10,
                      fontSize: 14,
                      alignContent: 'center',
                    }}>
                    Diagnostic Drive Thru
                  </Text>
                </View>
                <View
                  style={{
                    width: '10%',
                    height: 50,
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      height: 50,
                      width: '100%',
                      resizeMode: 'center',
                      alignContent: 'flex-start',
                    }}
                    source={require('../assets/icons/diagnostic.png')}
                  />
                </View>
              </View>
            </Card>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => gotoclinic()}
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
                    width: '80%',
                    height: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      marginStart: 10,
                      fontSize: 14,
                      alignContent: 'center',
                    }}>
                    Consultation Request
                  </Text>
                </View>
                <View
                  style={{
                    width: '10%',
                    height: 50,
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      height: 50,
                      width: '100%',
                      resizeMode: 'center',
                      alignContent: 'flex-start',
                    }}
                    source={require('../assets/icons/diagnostic.png')}
                  />
                </View>
              </View>
            </Card>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};

export default UIApps;
