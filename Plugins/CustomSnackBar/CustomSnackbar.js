import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import styles from './style';
const CustomSnackBar = ({message, open}) => {
  const [visible, setVisible] = useState(open);

  const onToggleSnackBar = () => setVisible(false);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Snackbar
        visible={open}
        onDismiss={onDismissSnackBar}
        // action={{
        //   label: 'Undo',
        //   onPress: () => {
        //     // Do something
        //   },
        // }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

export default CustomSnackBar;
