import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity,ImageBackground} from 'react-native';
import {action_GET_doctors_info} from '../../Services/Actions/Doctors_Actions';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './infostyle'
import { Card } from 'react-native-elements';
const Profile = () => {
  AsyncStorage.getItem('doccodes').then((item) => {
    setdoccode(item);
  });
  const dispatch = useDispatch();
  const doctors_reducers = useSelector(
    (state) => state.Doctors_Reducers.doc_info,
  );
  const [doccode, setdoccode] = useState('');
  const [docname, setdocname] = useState('');

  useEffect(() => {
    let mounted = true;
    const getdoctorsinfo = () => {
      //console.log('doccode', doccode);
      dispatch(action_GET_doctors_info(doccode));
    };

    mounted && getdoctorsinfo();
    return () => (mounted = false);
  }, [dispatch, doccode]);
  console.log('test');
  return (
    <ImageBackground
    style={{flex: 1}}
    source={require('../../assets/background/white.jpg')}
    resizeMode="cover"
    blurRadius={20}>
    
    <View style={styles.body}>
    <Card containerStyle={styles.plate}>
     
      <Image
        style={styles.avatar}
        source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
      />
       <View style={styles.viewdetails}>
        <Text style={styles.name}>{doctors_reducers?.lastname}, {doctors_reducers?.firstname}{' '}{doctors_reducers?.middlename}
       </Text>
       <Text style={styles.info}>{doctors_reducers?.spcldesc}</Text>
       </View>
     
      <View style={styles.viewstandard}>
        <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.btntext}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.btntext}> Message</Text>
            </TouchableOpacity>
        </View>
          
         
           
      
     
    </Card>
    </View>
    </ImageBackground>
  );
};
export default Profile;
