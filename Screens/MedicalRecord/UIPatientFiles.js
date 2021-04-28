import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import {Card} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../../Plugins/waitinterval';

const UIPatientFiles = () => {
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const ftp_reducers = useSelector((state) => state.FTP_Reducers.filename);
  const {width, height} = Dimensions.get('window');
  const dispatch = useDispatch();
  const [gestureName, setgestureName] = useState('');
  const [nameofFile, setnameofFile] = useState('');
  const [fullpathoffile, setfullpathoffile] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [resurls, setresurls] = useState('');

  const getpdffile = useCallback(
    async (value) => {
      await AsyncStorage.setItem('file_type', `${value}`);
      var timestamp = new Date().toISOString().replace(/[-:.]/g, '');
      var random = ('' + Math.random()).substring(2, 8);
      var random_number = timestamp + random;
      await setnameofFile(value);
      // await dispatch(
      //   action_set_patient_files(
      //     users_reducers?.prem_id,
      //     `${value}_${users_reducers.patno}${random_number}.pdf`,
      //     value,
      //   ),
      // );
      // await dispatch(
      //   action_get_files(
      //     `${value}`,
      //     `${value}_${users_reducers.patno}${random_number}.pdf`,
      //   ),
      // );

      await setfullpathoffile(
        `${value}_${users_reducers.patno}${random_number}`,
      );

      setSpinner(true);
      wait(1000).then(() => {
        setSpinner(false);
        Actions.listoffile();
      });
    },
    [resurls],
  );

  return (
    <SafeAreaView>
      <Spinner
        visible={spinner}
        textContent={'Syncing Files...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView>
        <TouchableHighlight
          onPress={() => getpdffile('SOA')}
          underlayColor="white">
          <Card styles={styles.container}>
            <Text>Statement of Account Files</Text>
          </Card>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => getpdffile('DTR')}
          underlayColor="white">
          <Card styles={styles.container}>
            <Text>Diagnostic Test Result</Text>
          </Card>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => getpdffile('CA')}
          underlayColor="white">
          <Card styles={styles.container}>
            <Text>Clinical Abstract</Text>
          </Card>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => getpdffile('CF')}
          underlayColor="white">
          <Card styles={styles.container}>
            <Text>Claim Forms</Text>
          </Card>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 30,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
UIPatientFiles.propTypes = {};

export default UIPatientFiles;
