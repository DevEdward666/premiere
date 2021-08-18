import React, {useEffect, useCallback, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {action_set_counter} from '../../Services/Actions/QueueActions';
const ListofCounter = () => {
  const listofcounter = useSelector((state) => state.QueueReducers.regular);
  const dispatch = useDispatch();
  const [selecteditem, setselecteditem] = useState('');
  const [prevselected, setprevselected] = useState('');
  const [caterogyset, setcaterogy] = useState(0);
  const handleSelectedCategory = useCallback(
    async (item, index) => {
      await setselecteditem(item?.countername);
      dispatch(action_set_counter(item?.countername));
      await setprevselected(selecteditem);
    },
    [dispatch, selecteditem],
  );
  useEffect(() => {
    let mounted = true;
    const getselected = () => {
      if (prevselected === selecteditem) {
        dispatch(action_set_counter('CASHIER'));
      }
    };
    mounted && getselected();
    return () => {
      mounted = false;
    };
  }, [dispatch, prevselected]);
  return (
    <FlatList
      data={listofcounter}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      renderItem={({item, index}) => (
        <TouchableHighlight
          onPress={() => handleSelectedCategory(item, index)}
          key={index}
          underlayColor="#ffffff00">
          <Card
            containerStyle={
              selecteditem === item?.countername
                ? prevselected === item?.countername
                  ? {
                      borderRadius: 50,
                      backgroundColor: 'white',
                      elevation: 15,

                      justifyContent: 'center',
                      height: 50,
                    }
                  : {
                      backgroundColor: '#034c81',
                      borderRadius: 50,
                      elevation: 10,
                      justifyContent: 'center',
                      height: 50,
                    }
                : {
                    borderRadius: 50,
                    backgroundColor: 'white',
                    elevation: 15,
                    justifyContent: 'center',
                    height: 50,
                  }
            }>
            <Text
              style={
                selecteditem === item?.countername
                  ? prevselected === item?.countername
                    ? {
                        color: 'black',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: 12,
                      }
                    : {
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: 12,
                      }
                  : {
                      color: 'black',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: 12,
                    }
              }>
              {item?.countername}
            </Text>
          </Card>
        </TouchableHighlight>
      )}
    />
  );
};
export default ListofCounter;
