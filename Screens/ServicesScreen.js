import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_GET_Services,
  action_GET_Servicesimage,
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
    setSpinner(true);
    setInterval(() => {
      setSpinner(false);
    }, 1000);
    dispatch(action_GET_Services(offset));
    if (services_reducer.services_img != undefined) {
      for (var i = 0; i < services_reducer.length; i++) {
        setimg(services_reducer[i].services_img);
        dispatch(action_GET_Servicesimage(img));
        console.log(services_reducer[i].services_img);
      }
    }
  }, [dispatch, offset]);
  useEffect(() => {
    if ((prev) => prev != offset) {
      setSpinner(true);
      setInterval(() => {
        setSpinner(false);
      }, 1000);

      dispatch(action_GET_Services(offset));
    } else {
      setSpinner(true);
      setInterval(() => {
        setSpinner(false);
      }, 1000);

      dispatch(action_GET_Services(offset));
    }
  }, [dispatch, offset, loadmore]);
  const loadmore = () => {
    setoffset((prev) => prev + 10);

    dispatch(action_GET_Services(offset));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      for (var i = 0; i < services_reducer.length; i++) {
        setimg(services_reducer[i].services_img);
        dispatch(action_GET_Servicesimage(services_reducer[i].services_img));
      }
      dispatch(action_GET_Services(offset));
    });
  }, [dispatch, img, offset]);

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
        keyExtractor={(item) => item.hosp_serv_name}
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
            <View style={{width: ITEM_SIZE}}>
              <Animated.View
                key={item.id}
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 12,
                  transform: [{translateY}],
                }}>
                <Image
                  source={{uri: `${base_url}/${item.services_img}`}}
                  style={styles.posterImage}></Image>
                <Text style={{fontSize: 18}} numberOfLines={1}>
                  {item.hosp_serv_name}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: 'justify',
                    fontFamily: 'Poppins',
                  }}
                  numberOfLines={8}>
                  {item.hosp_serv_description}
                </Text>
              </Animated.View>
            </View>
          );
          //<Text style={styles.item}>{item.title}</Text>
        }}
      />
    </View>
  );
};

ServicesScreen.propTypes = {};

export default ServicesScreen;
