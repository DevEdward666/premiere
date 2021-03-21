import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {action_GET_doctors_info} from '../Services/Actions/Doctors_Actions';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  action_GET_userdetails,
  action_GET_Docs,
} from '../Services/Actions/Users_Actions';
import {ScrollView} from 'react-native-gesture-handler';
const MeInfo = () => {
  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const users_image = useSelector((state) => state.User_Reducers.image);
  const docs_image = useSelector((state) => state.User_Reducers.docimage);
  const [username, setusername] = useState('');
  const [docname, setdocname] = useState('');
  let imageUri = 'data:image/jpg;base64,' + users_image;
  let DocimageUri = 'data:image/jpg;base64,' + docs_image;
  useEffect(() => {
    AsyncStorage.getItem('username').then((item) => {
      setusername(item);
      dispatch(action_GET_userdetails(item));
      dispatch(action_GET_Docs(item));
    });
  }, [dispatch, username]);

  const FirstRoute = () => (
    <View style={styles.body}>
      <View style={styles.bodyContent}>
        <Text style={styles.description}>Details</Text>
        <Text style={styles.details}>{users_reducers?.email}</Text>
        <Text style={styles.details}>{users_reducers?.mobileno}</Text>
        {/* <View style={styles.body}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Message</Text>
            </TouchableOpacity>
          </View> */}
      </View>
    </View>
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
    <ScrollView>
      <View style={styles.container}>
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
      <TabView
        style={styles.maincontainer}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </ScrollView>
  );
};
export default MeInfo;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 100,
  },
  maincontainer: {
    marginTop: 10,
  },

  avatar: {
    width: 180,
    height: 180,
    borderRadius: 120,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 10,
  },
  docs: {
    margin: 10,
    width: '80%',
    height: 500,
    //borderColor: 'white',
    alignSelf: 'center',
    resizeMode: 'contain',
    // position: 'absolute',
  },

  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  body2: {
    marginTop: 80,
  },
  bodyContent2: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
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
  details: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'justify',
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
