import React from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const UIApps = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
    },
  });

  const gotodiagnostics = () => {
    Actions.maindiagnosticsui();
  };
  return (
    <ScrollView style={{backgroundScrollViewColor: 'white'}}>
      <View style={styles.container}>
        <View>
          <View style={{flexDirection: 'column'}}>
            <TouchableHighlight
              onPress={() => gotodiagnostics()}
              underlayColor="white">
              <CardView
                style={{marginTop: -5}}
                radius={1}
                backgroundColor={'#ffffff'}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      height: 50,
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
              </CardView>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UIApps;
