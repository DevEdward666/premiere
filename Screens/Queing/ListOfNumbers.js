import React, {useCallback} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {useSelector} from 'react-redux';
import CustomCard from '../../Plugins/CustomQueueCard/CustomCard';
import styles from './style';
const ListOfNumbers = () => {
  const waiting = useSelector((state) => state.QueueReducers.waiting);
  const onRefresh = useCallback(() => {
    callback;
  }, []);
  return (
    <FlatList
      //   refreshControl={
      //     <RefreshControl refreshing={refreshnumbers} onRefresh={onRefresh} />
      //   }
      contentContainerStyle={{paddingBottom: 10}}
      data={waiting.data}
      keyExtractor={(item, index) => index.toString()}
      //   onEndReached={loadmore}
      //   onEndReachedThreshold={0.1}
      //   onScrollBeginDrag={() => handleScrollTop()}
      //   style={{transform: [{translateY: searchBarAnim}]}}
      renderItem={({item, index}) => (
        <View style={styles.row}>
          <View style={{width: '100%'}}>
            <CustomCard
              countername={item?.queueno}
              counterno={`Counter ${item?.counter}`}
            />
          </View>
        </View>
      )}
    />
  );
};

export default ListOfNumbers;
