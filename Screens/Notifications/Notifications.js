import React from 'react';
import {useSelector} from 'react-redux';
import UINotification from './UINotification';

const Notifications = () => {
  const notification_list = useSelector(
    (state) => state.Default_Reducers.notificationlist,
  );
  console.log(notification_list);
  return (
    <>
      <UINotification />
    </>
  );
};

Notifications.propTypes = {};

export default Notifications;
