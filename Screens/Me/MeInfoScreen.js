import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {action_GET_doctors_info} from '../../Services/Actions/Doctors_Actions';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  action_GET_userdetails,
  action_GET_Docs,
} from '../../Services/Actions/Users_Actions';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './infostyle';
import {Card} from 'react-native-elements';
import moment from 'moment';
import {SafeAreaView} from 'react-native';
const MeInfo = () => {
  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const users_image = useSelector((state) => state.User_Reducers.image);
  const docs_image = useSelector((state) => state.User_Reducers.docimage);
  const base_url = useSelector((state) => state.Default_Reducers.base_url);
  const [username, setusername] = useState('');
  const [docname, setdocname] = useState('');
  let imageUri = `${base_url}/${users_reducers?.img}`;
  let DocimageUri = `${base_url}/${users_reducers?.docs}`;

  useEffect(() => {
    let mounted = true;
    const getuserdocs = () => {
      if (mounted) {
        AsyncStorage.getItem('username').then((item) => {
          setusername(item);
          dispatch(action_GET_userdetails(item));
          dispatch(action_GET_Docs(item));
        });
      }
    };

    mounted && getuserdocs();
    return () => {
      mounted = false;
    };
  }, [dispatch, username]);

  const FirstRoute = () => (
    <SafeAreaView>
      <Card containerStyle={styles.userplate}>
        <View style={styles.body}>
          <View style={styles.mainbody}>
            <View style={styles.bodyTitle}>
              <Text style={styles.details}>Mobile No.</Text>
              <Text style={styles.details}>Email</Text>
              <Text style={styles.details}>Birthdate</Text>
            </View>
            <View style={styles.bodyContent}>
              <Text style={styles.details}>{users_reducers?.mobileno}</Text>
              <Text style={styles.details}>{users_reducers?.email}</Text>
              <Text style={styles.details}>
                {moment(users_reducers?.birthdate).format('MMMM D, YYYY')}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </SafeAreaView>
  );

  const SecondRoute = () => (
    <Image style={styles.docs} source={{uri: DocimageUri}} />
  );

  const initialLayout = {width: Dimensions.get('window').width};
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Information'},
    {key: 'second', title: 'Docs'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../assets/background/white.jpg')}
      resizeMode="cover"
      blurRadius={20}>
      <ScrollView style={styles.container}>
        <Card containerStyle={styles.userplate}>
          <View>
            <View style={styles.header}></View>
            <Image
              style={styles.avatar}
              source={{
                uri: imageUri,
                scale: 1,
              }}
            />
          </View>
          <View style={styles.body2}>
            <View style={styles.bodyContent2}>
              <Text style={styles.name}>
                {users_reducers?.lastname}, {users_reducers?.firstname}{' '}
                {users_reducers?.middlename}
              </Text>

              <Text style={styles.info}>{users_reducers?.prem_id}</Text>
            </View>
          </View>
        </Card>
        <TabView
          style={styles.maincontainer}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={(props) => (
            <TabBar {...props} style={{backgroundColor: '#1dc259'}} />
          )}
        />
      </ScrollView>
    </ImageBackground>
  );
};
export default MeInfo;
