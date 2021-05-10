import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useCallback} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight,View,Text,Image} from 'react-native'
import {Card} from 'react-native-elements'
import styles from './style'
import { Actions } from 'react-native-router-flux';
import {useSelector} from 'react-redux'
const MeBody = props => {
    const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const gotoqr = async () => {
    let mounted=true
    if (mounted)
  {  await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
    Actions.qrscreen();}
    return()=>{mounted=false}
  };
  const gotoapps = useCallback(async () => {
    let mounted=true
    if (mounted)
  {  await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
    Actions.uiapps();}
    return()=>{mounted=false}
  });
  const gotolink = async () => {
    let mounted=true
    if (mounted)
  {  if (users_reducers?.patno === null) {
      await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
      Actions.link();
    } else {
      Actions.medicalrecords();
    }}
    return()=>{mounted=false}
  };
  const gotomessage = async () => {
    let mounted=true
    if (mounted)
   { await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
    Actions.message();}
    return()=>{mounted=false}
  };
  const gotosafedavaoqr = async () => {
    let mounted=true
    if (mounted)
  {  await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
    Actions.safedavaoqr();}
    return()=>{mounted=false}
  };
  const gotocalendar = async () => {
    //  await AsyncStorage.setItem('prem_id', users_reducers?.prem_id);
    Actions.calendar();
  };
  const removeValue = async () => {
    try {
      await AsyncStorage.getAllKeys().then((keys) =>
        AsyncStorage.multiRemove(keys),
      );
      await Actions.home();
    } catch (e) {
      // remove error
    }
  };
    return (
        <Card  containerStyle={styles.userplate}>
        <TouchableHighlight
          onPress={() => gotolink()}
          underlayColor="#f7f7f7">
          <View
            style={{
              flexDirection: 'row',
              height: 70,
              alignItems: 'center',
            }}>
            <View
              style={styles.viewstyle}>
              <Text
                style={styles.textstyle}>
                Medical Records
              </Text>
            </View>
            <View
              style={{
                width: '10%',
                height: 50,
                justifyContent: 'center',
              }}>
              <Image
             style={styles.iconstyle}
                source={require('../assets/icons/ic_admission_prem-playstore.png')}
              />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => gotomessage()}
          underlayColor="#f7f7f7">
          <View
            style={{
              flexDirection: 'row',
              height: 70,
              alignItems: 'center',
            }}>
            <View
              style={styles.viewstyle}>
              <Text
                style={styles.textstyle}>
                Messages
              </Text>
            </View>
            <View
              style={{
                width: '10%',
                height: 50,
                justifyContent: 'center',
              }}>
              <Image
              style={styles.iconstyle}
                source={require('../assets/icons/messages.png')}
              />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => gotoapps()}
          underlayColor="#f7f7f7">
          <View
            style={{
              flexDirection: 'row',
              height: 70,
              alignItems: 'center',
            }}>
            <View
               style={styles.viewstyle}>
              <Text
                style={styles.textstyle}>
                Apps
              </Text>
            </View>
            <View
              style={{
                width: '10%',
                height: 50,
                justifyContent: 'center',
              }}>
              <Image
                style={styles.iconstyle}
                source={require('../assets/icons/apps.png')}
              />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => gotoqr()}
          underlayColor="#f7f7f7">
          <View
            style={{
              flexDirection: 'row',
              height: 70,
              alignItems: 'center',
            }}>
            <View
               style={styles.viewstyle}>
              <Text
                style={styles.textstyle}>
                My QR
              </Text>
            </View>
            <View
              style={{
                width: '10%',
                height: 50,
                justifyContent: 'center',
              }}>
              <Image
                style={styles.iconstyle}
                source={require('../assets/icons/ic_my_qr_prem-playstore.png')}
              />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => gotosafedavaoqr()}
          underlayColor="#f7f7f7">
          <View
            style={{
              flexDirection: 'row',
              height: 70,
              alignItems: 'center',
            }}>
            <View
              style={styles.viewstyle}>
              <Text
                style={styles.textstyle}>
                Safe Davao QR
              </Text>
            </View>
            <View
              style={{
                width: '10%',
                height: 50,
                justifyContent: 'center',
              }}>
              <Image
                style={styles.iconstyle}
                source={require('../assets/icons/ic_safedavao_prem-playstore.png')}
              />
            </View>
          </View>
        </TouchableHighlight>

        <View
          style={{
            flexDirection: 'row',
            height: 70,
            alignItems: 'center',
          }}>
          <View
            style={styles.viewstyle}>
              <Text
                style={styles.textstyle}>
              Health Declaration
            </Text>
          </View>
          <View
            style={{width: '10%', height: 50, justifyContent: 'center'}}>
            <Image
             style={styles.iconstyle}
              source={require('../assets/icons/ic_healthdeclaration_prem-playstore.png')}
            />
          </View>
        </View>
        <TouchableHighlight
          onPress={() => gotocalendar()}
          underlayColor="#f7f7f7">
          <View
            style={{
              flexDirection: 'row',
              height: 70,
              alignItems: 'center',
            }}>
            <View
              style={styles.viewstyle}>
              <Text
                style={styles.textstyle}>
                Calendar
              </Text>
            </View>
            <View
              style={{
                width: '10%',
                height: 50,
                justifyContent: 'center',
              }}>
              <Image
                style={styles.iconstyle}
                source={require('../assets/icons/ic_calendar_prem-playstore.png')}
              />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => removeValue()}
          underlayColor="#f7f7f7">
          <View
            style={{
              flexDirection: 'row',
              height: 70,
              alignItems: 'center',
            }}>
            <View
               style={styles.viewstyle}>
              <Text
                style={styles.textstyle}>
                Logout
              </Text>
            </View>
            <View
              style={{
                width: '10%',
                height: 50,
                justifyContent: 'center',
              }}>
              <Image
                style={styles.iconstyle}
                source={require('../assets/icons/ic_logout_prem-playstore.png')}
              />
            </View>
          </View>
        </TouchableHighlight>
      </Card>
 
    );
};

MeBody.propTypes = {
    
};

export default MeBody;