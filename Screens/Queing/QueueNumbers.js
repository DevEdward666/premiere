import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListofCounter from './ListOfCounter';
import {
  getwaitingqueue,
  GeneratorRegular,
  getuserqueuenumbers,
} from '../../Services/Actions/QueueActions';
import ListOfNumbers from './ListOfNumbers';
import UserQueueNumber from './UserQueueNumber';
const QueueNumbers = () => {
  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const notification = useSelector(
    (state) => state.Default_Reducers.notification,
  );
  const counter = useSelector((state) => state.QueueReducers.counter);

  useEffect(() => {
    let mounted = true;
    const waitinglist = () => {
      if (mounted) {
        dispatch(getwaitingqueue(counter));
        dispatch(getuserqueuenumbers(users_reducers?.prem_id, counter));
        dispatch(GeneratorRegular());
      }
    };
    mounted && waitinglist();
    return () => {
      mounted = false;
    };
  }, [dispatch, users_reducers?.prem_id, counter, notification]);
  return (
    <SafeAreaView>
      <ListofCounter />
      <UserQueueNumber />
      <ListOfNumbers />
    </SafeAreaView>
  );
};
export default QueueNumbers;
