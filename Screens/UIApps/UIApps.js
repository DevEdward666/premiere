import React from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ImageBackground
} from 'react-native';
import { Card } from 'react-native-elements';
import CardView from 'react-native-rn-cardview';
import {Actions} from 'react-native-router-flux';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
import styles from './style'
const UIApps = () => {


  const gotodiagnostics = () => {
    Actions.maindiagnosticsui();
  };
  return (
    <ImageBackground
    style={{flex: 1}}
    source={require('../../assets/background/white.jpg')}
    resizeMode="cover"
    blurRadius={20}>
      <View style={styles.container}>
    <ScrollView >
    
        <View>
          <View style={{flexDirection: 'column'}}>
            <TouchableHighlight
              onPress={() => gotodiagnostics()}
              underlayColor="white">
              <Card containerStyle={styles.plate}>
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
              </Card>
            </TouchableHighlight>
          </View>
        </View>

    </ScrollView>
    </View>
    </ImageBackground>
  );
};

export default UIApps;
