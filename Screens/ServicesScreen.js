import React, {useState, useEffect, useCallback} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_GET_Services,
  action_GET_Servicesimage,
  action_set_service_id,
} from '../Services/Actions/Services_Actions';
import wait from '../Plugins/waitinterval';
import {FlatList} from 'react-native';
const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Backdrop = ({images, scrollX}) => {
  return (
    <View style={{height: BACKDROP_HEIGHT, width, position: 'absolute'}}>
      <FlatList
        keyExtractor={(item) => item.doccode + '-backdrop'}
        data={images.reverse}
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        renderItem={({item, index}) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: item.backdrop}}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
      {/* <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      /> */}
    </View>
  );
};

const ServicesScreen = () => {
  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
    },
    Maincontainer: {
      flex: 1,
      marginTop: 50,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    posterImage: {
      width: '100%',
      height: ITEM_SIZE * 1.2,
      resizeMode: 'cover',
      justifyContent: 'center',
      borderRadius: 24,
      margin: 0,
      marginBottom: 10,
    },
    spinnerTextStyle: {
      color: '#FFF',
    },
  });
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = React.useState(false);

  const [offset, setoffset] = useState(10);
  const [spinner, setSpinner] = useState(false);
  const services_reducer = useSelector((state) => state.Services_Reducers.data);
  const base_url = useSelector((state) => state.Default_Reducers.base_url);
  const dispatch = useDispatch();
  const services_image = useSelector((state) => state.Services_Reducers.images);
  const [img, setimg] = useState('');
  useEffect(() => {
    let mounted = true;
    const getservices = async () => {
      if (mounted) {
        await setSpinner(true);
        await setSpinner(false);
        dispatch(action_GET_Services(offset));
        if (services_reducer.services_img != undefined) {
          for (var i = 0; i < services_reducer.length; i++) {
            await setimg(services_reducer[i]?.services_img);
            dispatch(action_GET_Servicesimage(img));
          }
        }
      }
    };

    mounted && getservices();
    return () => {
      mounted = false;
    };
  }, [dispatch, offset]);
  useEffect(() => {
    let mounted = true;
    const getservices = async () => {
      if (mounted) {
        if ((prev) => prev != offset) {
          await setSpinner(true);

          await setSpinner(false);

          dispatch(action_GET_Services(offset));
        } else {
          await setSpinner(true);

          await setSpinner(false);

          dispatch(action_GET_Services(offset));
        }
      }
    };

    mounted && getservices();
    return () => {
      mounted = false;
    };
  }, [dispatch, offset, loadmore]);
  const loadmore = async () => {
    let mounted = true;
    if (mounted) {
      await setoffset((prev) => prev + 10);

      dispatch(action_GET_Services(offset));
    }
    return () => {
      mounted = false;
    };
  };
  const onRefresh = React.useCallback(async () => {
    let mounted = true;
    if (mounted) {
      await setRefreshing(true);

      await setRefreshing(false);
      for (var i = 0; i < services_reducer.length; i++) {
        await setimg(services_reducer[i]?.services_img);
        dispatch(action_GET_Servicesimage(services_reducer[i]?.services_img));
      }
      dispatch(action_GET_Services(offset));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, img, offset]);
  const handleService = useCallback(
    (item) => {
      dispatch(action_set_service_id(item?.id));

      Actions.service_desc();
    },
    [dispatch],
  );
  let imageUri = 'data:image/png;base64,' + services_image;
  return (
    <View style={styles.container}>
      <Backdrop
        images={require('../assets/doctors/john.jpg')}
        scrollX={scrollX}
      />
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.hosp_serv_name}
        data={services_reducer}
        horizontal
        contentContainerStyle={{
          alignItems: 'center',
        }}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
            extrapolate: 'clamp',
          });
          return (
            <TouchableHighlight onPress={() => handleService(item)}>
              <View style={{width: ITEM_SIZE}}>
                <Animated.View
                  key={item?.id}
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: 'center',
                    elevation: 50,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    transform: [{translateY}],
                  }}>
                  <Image
                    source={{uri: `${base_url}/${item?.services_img}`}}
                    style={styles.posterImage}></Image>
                  <Text
                    style={{fontSize: 18, fontFamily: 'SFUIDisplay-Bold'}}
                    numberOfLines={1}>
                    {item?.hosp_serv_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'justify',
                      fontFamily: 'SFUIDisplay-Light',
                    }}
                    numberOfLines={8}>
                    {item?.hosp_serv_description}
                  </Text>
                </Animated.View>
              </View>
            </TouchableHighlight>
          );
          //<Text style={styles.item}>{item.title}</Text>
        }}
      />
    </View>
  );
};

ServicesScreen.propTypes = {};

export default ServicesScreen;
