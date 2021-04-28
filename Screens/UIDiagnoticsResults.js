import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PDFView from 'react-native-view-pdf';
const UIDiagnoticsResults = () => {
  const diagnostic_url = useSelector((state) => state.Diagnostic_Reducers.url);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
    },
  });
  const [resurls, setresurls] = useState('');
  const geturl = async () => {
    try {
      const resurl = await AsyncStorage.getItem('resurl');
      if (resurl !== null) {
        setresurls(resurl);
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };

  useEffect(() => {
    geturl();
  }, [resurls]);
  const resources = {
    file:
      Platform.OS === 'ios'
        ? 'test-pdf.pdf'
        : '/sdcard/DCIM/Premiere/SOA_00745411.pdf',
    url:
      //'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      `${diagnostic_url}${resurls}`,
    //'https://pdftron.s3.amazonaws.com/downloads/pdfref.pdf',
    base64: 'asdsadasd',
  };
  const resourceType = 'file';

  return (
    <View style={{flex: 1}}>
      <PDFView
        fadeInDuration={250.0}
        style={{flex: 1}}
        resource={resources[resourceType]}
        resourceType={resourceType}
        onLoad={(e) => console.log(`PDF rendered from ${resourceType}`)}
        onError={(e) => console.log('Cannot render PDF', e)}
      />
    </View>
  );
};

export default UIDiagnoticsResults;
