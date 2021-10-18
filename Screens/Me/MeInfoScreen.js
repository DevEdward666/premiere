import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
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
import ImageView from 'react-native-image-viewing';
import {TextInput} from 'react-native-paper';
const MeInfo = () => {
  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const users_image = useSelector((state) => state.User_Reducers.image);
  const docs_image = useSelector((state) => state.User_Reducers.docimage);
  const base_url = useSelector((state) => state.Default_Reducers.base_url);
  const [username, setusername] = useState('');
  const [docname, setdocname] = useState('');

  const [visible, setIsVisible] = useState(false);
  // let imageUri = `${base_url}/${users_reducers?.img}`;
  let imageUri = `${users_image}`;
  // let DocimageUri = `${base_url}/${users_reducers?.docs}`;
  let DocimageUri = `${docs_image}`;
  useEffect(() => {
    let mounted = true;
    const getuserdocs = () => {
      if (mounted) {
        if (users_image == '')
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
    <SafeAreaView style={{padding: 10}}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}>
        <TextInput
          label="First Name"
          value={users_reducers?.firstname}
          dense={true}
          style={styles.infotext}
          editable={false}
          theme={{
            colors: {
              primary: '#3eb2fa',
              background: 'white',
              backgroundColor: 'white',
              underlineColor: 'transparent',
            },
          }}
          mode="flat"
        />
        <TextInput
          label="Middle Name"
          value={users_reducers?.middlename}
          dense={true}
          style={styles.infotext}
          editable={false}
          theme={{
            colors: {
              primary: '#3eb2fa',
              background: 'white',
              backgroundColor: 'white',
              underlineColor: 'transparent',
            },
          }}
          mode="flat"
        />
        <TextInput
          label="Last Name"
          value={users_reducers?.lastname}
          dense={true}
          style={styles.infotext}
          editable={false}
          theme={{
            colors: {
              primary: '#3eb2fa',
              background: 'white',
              backgroundColor: 'white',
              underlineColor: 'transparent',
            },
          }}
          mode="flat"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}>
        <TextInput
          label="Mobile No"
          value={users_reducers?.mobileno}
          dense={true}
          style={styles.infotext}
          editable={false}
          theme={{
            colors: {
              primary: '#3eb2fa',
              background: 'white',
              backgroundColor: 'white',
              underlineColor: 'transparent',
            },
          }}
          mode="flat"
        />
        <TextInput
          label="Email"
          value={users_reducers?.email}
          dense={true}
          style={styles.infotext}
          editable={false}
          theme={{
            colors: {
              primary: '#3eb2fa',
              background: 'white',
              backgroundColor: 'white',
              underlineColor: 'transparent',
            },
          }}
          mode="flat"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}>
        <TextInput
          label="Birthdate"
          value={moment(users_reducers?.birthdate).format('MMMM D, YYYY')}
          dense={true}
          style={styles.infotext}
          editable={false}
          theme={{
            colors: {
              primary: '#3eb2fa',
              background: 'white',
              backgroundColor: 'white',
              underlineColor: 'transparent',
            },
          }}
          mode="flat"
        />
      </View>
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
  const images = [
    {
      uri: imageUri,
    },
    {
      uri: DocimageUri,
    },
  ];
  return (
    <SafeAreaView>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <ScrollView style={styles.container}>
        <Card containerStyle={styles.userplate}>
          <View>
            <View style={styles.header}></View>
            <TouchableHighlight
              style={styles.avatar}
              onPress={() => setIsVisible(true)}>
              <Image
                style={styles.avatar}
                source={{
                  uri: imageUri,
                  scale: 1,
                }}
              />
            </TouchableHighlight>
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
            <TabBar {...props} style={{backgroundColor: '#0084FF'}} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default MeInfo;
