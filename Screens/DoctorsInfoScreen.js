import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {action_GET_doctors_info} from '../Services/Actions/Doctors_Actions';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>
            {doctors_reducers?.lastname}, {doctors_reducers?.firstname}{' '}
            {doctors_reducers?.middlename}
          </Text>
          <Text style={styles.info}>{doctors_reducers?.spcldesc}</Text>
          <Text style={styles.description}>Details</Text>
          <View style={styles.body}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },

  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 20,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 20,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
});
