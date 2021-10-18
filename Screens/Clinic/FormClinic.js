import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import React, {useCallback, useEffect, useState} from 'react';
import {Button} from 'react-native-elements';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  SafeAreaView,
  Switch,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Image,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {Actions} from 'react-native-router-flux';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import DoneOverlay from '../../Plugins/CustomOverlay/DoneOverlay';
import {
  action_GET_barangay,
  action_GET_city,
  action_GET_civilstatus,
  action_GET_nationality,
  action_GET_procedure,
  action_GET_province,
  action_GET_region,
  action_GET_religion,
} from '../../Services/Actions/Default_Actions';
import {
  action_POST_clinic_appointment,
  action_POST_appointment_others,
  action_reset_submit,
} from '../../Services/Actions/Clinic_actions';
import styles from './style';
import DocumentPicker from 'react-native-document-picker';
import {ScrollView} from 'react-native-gesture-handler';

const FormClinic = () => {
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const appointment_message = useSelector(
    (state) => state.Clinic_Reducers.appointment_message,
  );

  const [firstname, setfirstname] = useState('');
  const [middlename, setmiddlename] = useState('');
  const [lastname, setlastname] = useState('');
  const [gender, setgender] = useState('');
  const [civilstatus, setCivilStatus] = useState('');
  const [civilstatusindex, setCivilStatusindex] = useState('');
  const [civilstatuslabel, setCivilStatuslabel] = useState('');
  const [pickdepartmentindex, setpickdepartmentindex] = useState('');
  const [pickdepartment, setpickdepartment] = useState('');
  const [pickdepartmentcode, setpickdepartmentcode] = useState('');
  const [civilstatusvalue, setCivilStatusvalue] = useState('');
  const [subtotal, setsubtotal] = useState(0);
  const [religion, setreligion] = useState('');
  const [religionindex, setreligionindex] = useState('');
  const [suffix, setSuffix] = useState('');
  const [prefix, setPrefix] = useState('');
  const [mobile, setmobile] = useState('63');
  const [email, setemail] = useState('');
  const [birthdate, setbirthdate] = useState('');
  const [reasons, setreasons] = useState('');
  const [symptomps, setsymptomps] = useState('');
  const [complaint, setcomplaint] = useState('');
  const [remarks, setremarks] = useState('');
  const [zipcode, setzipcode] = useState('');
  const [nationality, setnationality] = useState('');
  const [nationalityindex, setnationalityindex] = useState('');
  const [city, setcity] = useState('');
  const [cityindex, setcityindex] = useState('');
  const [citylabel, setcitylabel] = useState('');
  const [cityvalue, setcityvalue] = useState('');
  const [regionindex, setregionindex] = useState('');
  const [region, setregion] = useState('');
  const [regiondesc, setregiondesc] = useState('');
  const [province, setprovince] = useState('');
  const [provinceindex, setprovinceindex] = useState('');
  const [provincelabel, setprovincelabel] = useState('');
  const [provincevalue, setprovincevalue] = useState('');
  const [barangayindex, setbarangayindex] = useState('');
  const [barangay, setbarangay] = useState('');
  const [barangaylabel, setbarangaylabel] = useState('');
  const [barangayvalue, setbarangayvalue] = useState('');
  const [psgc, setpsgc] = useState('');
  const [totalrequest, settotalrequest] = useState(0);
  const [fulladdress, setfulladdress] = useState('');
  const [fulladdress2, setfulladdress2] = useState('');
  const [selecteddocs, setselecteddocs] = useState([]);
  const [overlayvisible, setoverlayvisible] = useState(false);
  const [username, setUsername] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [premid, setpremid] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    var today = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    var age_now = today.getFullYear() - currentDate.getFullYear();

    if (month <= 9 && day <= 9) {
      setbirthdate(year + '-0' + month + '-0' + day);
    } else if (month <= 9) {
      setbirthdate(year + '-0' + month + '-' + day);
    } else if (day <= 9) {
      setbirthdate(year + '-' + month + '-0' + day);
    } else {
      setbirthdate(year + '-' + month + '-' + day);
    }
  };
  const getprem_id = async () => {
    try {
      const prem_id = await AsyncStorage.getItem('prem_id');

      if (prem_id !== null) {
        setpremid(users_reducers?.prem_id);
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const dispatch = useDispatch();
  const region_reducers = useSelector((state) => state.Default_Reducers.region);

  const barangay_reducers = useSelector(
    (state) => state.Default_Reducers.barangay,
  );
  const province_reducers = useSelector(
    (state) => state.Default_Reducers.provinces,
  );
  const departments = useSelector(
    (state) => state.Default_Reducers.departments,
  );
  const city_reducers = useSelector((state) => state.Default_Reducers.city);
  const nationality_reducers = useSelector(
    (state) => state.Default_Reducers.nationality,
  );
  const civil_status_reducers = useSelector(
    (state) => state.Default_Reducers.civil_status,
  );
  const religion_reducers = useSelector(
    (state) => state.Default_Reducers.religion,
  );

  const SignUp_Reducers = useSelector((state) => state.SignUp_Reducers);
  const base_url = useSelector((state) => state.Default_Reducers.base_url);

  const [errorUsernameMessage, setErrorMessageUsername] = useState('');
  const [emailErrorMessage, setemailErrorMessage] = useState(false);
  const [InfoError, setInfoError] = useState(false);
  const [AddressError, setAddressError] = useState(false);

  const [stepError, setstepError] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [open_dropdown, setopen_dropdown] = useState(false);
  const [itemState, setitemState] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [getpickerregions, setpickerregions] = useState([]);
  const [getpickerbarangay, setpickerbarangay] = useState([]);
  const [getpickerprovince, setpickerprovince] = useState([]);
  const [getpickercity, setpickercity] = useState([]);
  const [getpickernationality, setpickernationality] = useState([]);
  const [getpickercivilstatus, setpickercivilstatus] = useState([]);
  const [getpickerreligion, setpickerreligion] = useState([]);
  const [getrequestdetails, setrequestdetails] = useState([]);
  const [getdepartments, setdepartments] = useState([]);

  useEffect(() => {
    let mounted = true;
    const dropdownitems = () => {
      if (mounted) {
        const departmentspicker = departments.map((item, index) => ({
          index: index,
          code: item.dept_pk,
          desc: item.dept_name,
          id: item.dept_pk,
          name: item.dept_name,
        }));
        const regions = region_reducers.map((item, index) => ({
          index: index,
          code: item.regioncode,
          desc: item.regiondesc,
          id: item.regioncode,
          name: item.regiondesc,
        }));
        const barangay = barangay_reducers.map((item, index) => ({
          index: index,
          code: item.barangaycode,
          desc: item.barangaydesc,
          id: item.barangaycode,
          name: item.barangaydesc,
        }));
        const province = province_reducers.map((item, index) => ({
          index: index,
          code: item.provincecode,
          desc: item.provincedesc,
          id: item.provincecode,
          name: item.provincedesc,
        }));
        const city = city_reducers.map((item, index) => ({
          index: index,
          code: item.citymuncode,
          desc: item.citymundesc,
          id: item.citymuncode,
          name: item.citymundesc,
        }));
        const nationalitypick = nationality_reducers.map((item, index) => ({
          index: index,
          code: item.nat_pk,
          desc: item.nationality,
          id: item.nat_pk,
          name: item.nationality + '(' + item.country + ')',
        }));
        const civilstatus = civil_status_reducers.map((item, index) => ({
          index: index,
          code: item.cskey,
          desc: item.csdesc,
          id: item.cskey,
          name: item.csdesc,
        }));
        const religion = religion_reducers.map((item, index) => ({
          index: index,
          code: item.religion,
          desc: item.description,
          id: item.religion,
          name: item.description + '(' + item.religion + ')',
        }));
        setdepartments(departmentspicker);
        setpickerregions(regions);
        setpickerbarangay(barangay);
        setpickerprovince(province);
        setpickercity(city);
        setpickernationality(nationalitypick);
        setpickercivilstatus(civilstatus);
        setpickerreligion(religion);
      }
    };

    mounted && dropdownitems();
    return () => {
      mounted = false;
    };
  }, [
    religion_reducers,
    departments,
    civil_status_reducers,
    nationality_reducers,
    city_reducers,
    province_reducers,
    barangay_reducers,
    region_reducers,
  ]);
  const toggleSwitch = () => {
    let mounted = true;
    if (mounted) {
      setIsEnabled((previousState) => !previousState);
      // let url = `${base_url}/${users_reducers?.img}`;
      // const fileName = 'myFile.jpg';
      // fetch(url).then(async (response) => {
      //   const contentType = response.headers.get('content-type');
      //   const blob = await response.blob();
      //   const file = new File([blob], fileName, {
      //     type: contentType,
      //   });
      //   console.log(file);
      // });
    }
    return () => {
      mounted = false;
    };
  };
  const handleRegionChange = (pickregion) => {
    let mounted = true;
    if (mounted) {
      setregionindex(pickregion?.index);
      setregion(pickregion?.code);
      setregiondesc(pickregion?.desc);
      setprovince('');
      setcity('');
      setbarangay('');
      dispatch(action_GET_province(pickregion?.code));
    }
    return () => {
      mounted = false;
    };
  };
  useEffect(() => {
    let mounted = true;
    const getresponse = () => {
      if (mounted) {
        if (appointment_message?.success) {
          setSpinner(false);
          {
            setoverlayvisible(true);
          }
        }
      }
    };
    mounted && getresponse();
    return () => {
      mounted = false;
    };
  }, [appointment_message?.success]);
  const handleSubmitAppointment = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      setSpinner(true);
      dispatch(
        action_POST_clinic_appointment(
          users_reducers?.img,
          users_reducers?.prem_id,
          users_reducers?.prem_id,
          pickdepartmentcode,
          complaint,
          symptomps,
          remarks,
          selecteddocs,
        ),
      );
    }
    return () => {
      mounted = false;
    };
  }, [
    dispatch,
    pickdepartmentcode,
    users_reducers?.prem_id,
    complaint,
    symptomps,
    remarks,
    selecteddocs,
  ]);
  const handleDone = useCallback(async () => {
    dispatch(action_reset_submit());
    await setoverlayvisible(false);
    await Actions.mainpayment();
  }, [dispatch]);
  const handleProvinceChange = (pickprovince) => {
    let mounted = true;
    if (mounted) {
      setprovince(pickprovince?.code);
      setprovinceindex(pickprovince?.index);
      setprovincelabel(pickprovince?.desc);
      setprovincevalue(pickprovince?.code);
      dispatch(action_GET_city(region, pickprovince?.code));
    }
    return () => {
      mounted = false;
    };
  };
  const handleCityChange = (pickcity) => {
    let mounted = true;
    if (mounted) {
      setcityindex(pickcity?.index);
      setcity(pickcity?.code);
      setcitylabel(pickcity?.desc);
      setcityvalue(pickcity?.code);
      dispatch(action_GET_barangay(region, provincevalue, pickcity?.code));
    }
    return () => {
      mounted = false;
    };
  };
  const handleDepartment = (pickstatus) => {
    let mounted = true;
    if (mounted) {
      setpickdepartmentindex(pickstatus?.index);
      setpickdepartmentcode(pickstatus?.code);
      setpickdepartment(pickstatus?.desc);
    }
    return () => {
      mounted = false;
    };
  };
  const handleCivilStatus = (pickstatus, index) => {
    let mounted = true;
    if (mounted) {
      console.log(pickstatus);
      setCivilStatusindex(pickstatus?.index);
      setCivilStatus(pickstatus?.code);
      setCivilStatuslabel(pickstatus?.desc);
      setCivilStatusvalue(pickstatus?.code);
    }
    return () => {
      mounted = false;
    };
  };
  const handleReligion = (pickreligion) => {
    let mounted = true;
    if (mounted) {
      setreligionindex(pickreligion?.index);
      setreligion(pickreligion?.code);
    }
    return () => {
      mounted = false;
    };
  };
  const handleBarangayChange = (pickBarangay) => {
    let mounted = true;
    if (mounted) {
      setbarangayindex(pickBarangay?.index);
      setbarangay(pickBarangay?.code);
      setbarangaylabel(pickBarangay?.desc);
      setbarangayvalue(pickBarangay?.code);
      setpsgc(pickBarangay?.desc + ',' + citylabel + ',' + provincelabel);
    }
    return () => {
      mounted = false;
    };
  };
  const handleNationality = (pickNationality) => {
    let mounted = true;
    if (mounted) {
      setnationality(pickNationality?.code);
      setnationalityindex(pickNationality?.index);
    }
    return () => {
      mounted = false;
    };
  };

  // const fileName = 'myFile.jpg';
  // const getUrlExtension = (url) => {
  //   return url.split(/[#?]/)[0].split('.').pop().trim();
  // };

  useEffect(() => {
    let mounted = true;
    const geterrors = () => {
      if (mounted) {
        getprem_id();

        if (SignUp_Reducers.username?.username == username) {
          setErrorMessageUsername('Username Already Exists');
          setstepError(true);
        } else {
          setErrorMessageUsername('');
          setstepError(false);
        }
      }
    };

    mounted && geterrors();
    return () => {
      mounted = false;
    };
  }, [username, SignUp_Reducers]);
  const handleNextInfo = useCallback(() => {
    let mounted = true;
    if (mounted) {
      if (
        firstname == '' ||
        lastname == '' ||
        gender == '' ||
        gender == undefined ||
        birthdate == '' ||
        civilstatusvalue == '' ||
        nationality == '' ||
        religion == ''
      ) {
        setInfoError(true);
        alert('Please Fill All Fields');
      } else {
        setInfoError(false);
      }
    }
    return () => {
      mounted = false;
    };
  }, [firstname, lastname, gender, birthdate]);

  const handleNextAddress = () => {
    let mounted = true;
    if (mounted) {
      if (
        nationality == '' ||
        region == '' ||
        province == '' ||
        city == '' ||
        gender == '' ||
        barangay == ''
      ) {
        setAddressError(true);
        alert('Please Fill All Fields');
      } else {
        setAddressError(false);
      }
    }
    return () => {
      mounted = false;
    };
  };
  console.log(civilstatusindex);
  const validate = (email) => {
    let mounted = true;
    if (mounted) {
      setemail(email);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        setemailErrorMessage(true);
      } else {
        setemailErrorMessage(false);
        setemail(email);
      }
    }
    return () => {
      mounted = false;
    };
  };

  const handleSubmitCredentials = useCallback(async () => {
    if (selecteddocs.length > 0) {
      if (stepError == false) {
        dispatch(
          action_POST_appointment_others(
            citylabel,
            regiondesc,
            users_reducers?.prem_id,
            prefix,
            firstname,
            middlename,
            lastname,
            suffix,
            gender,
            civilstatusvalue,
            civilstatuslabel,
            nationality,
            religion,
            birthdate,
            email,
            mobile,
            fulladdress,
            barangayvalue,
            provincevalue,
            cityvalue,
            region,
            fulladdress2,
            totalrequest.toFixed(2),
            zipcode,
            complaint,
            symptomps,
            remarks,
            pickdepartmentcode,
            selecteddocs,
          ),
        );
        setSpinner(true);
      } else {
        alert('Please Provide Valid Data');
      }
    } else {
      alert('Please attach neccesary documents');
    }
  }, [
    users_reducers?.prem_id,
    prefix,
    firstname,
    middlename,
    lastname,
    suffix,
    gender,
    civilstatusvalue,
    civilstatuslabel,
    nationality,
    religion,
    birthdate,
    email,
    mobile,
    fulladdress,
    fulladdress2,
    barangay,
    province,
    city,
    region,
    psgc,
    totalrequest,
    zipcode,
    remarks,
    complaint,
    symptomps,
    selecteddocs,
  ]);
  console.log(selecteddocs);
  useEffect(() => {
    let mounted = true;
    const settotal = async () => {
      await setsubtotal(0);
      itemState?.map(async (item) => {
        await setsubtotal((prev) => prev + item?.price);
      });
    };
    mounted && settotal();
    return () => {
      mounted = false;
    };
  }, [itemState]);
  const docPicker = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      setselecteddocs(results);
      console.log(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log(err);
      }
    }
    // DocumentPicker.pickMultiple({
    //   type: [DocumentPicker.types.allFiles],
    // })
    //   .then((response) => response.json())
    //   .then((res) => {
    //     setselecteddocs(res);
    //     console.log(res);
    //   });
  };

  const FlatlistHeader = () => (
    <View>
      <TextInput
        multiline
        numberOfLines={5}
        maxLength={100}
        theme={{
          colors: {
            primary: '#3eb2fa',
            background: 'white',
            underlineColor: 'transparent',
          },
        }}
        mode="flat"
        label="Chief Complaint*"
        onChangeText={(text) => setcomplaint(text)}
        value={complaint}
      />
      <TextInput
        multiline
        numberOfLines={5}
        maxLength={100}
        theme={{
          colors: {
            primary: '#3eb2fa',
            background: 'white',
            underlineColor: 'transparent',
          },
        }}
        mode="flat"
        label="Symptomps*"
        onChangeText={(text) => setsymptomps(text)}
        value={symptomps}
      />
      <TextInput
        multiline
        numberOfLines={5}
        maxLength={100}
        theme={{
          colors: {
            primary: '#3eb2fa',
            background: 'white',
            underlineColor: 'transparent',
          },
        }}
        mode="flat"
        label="Notes or Other Remarks"
        onChangeText={(text) => setremarks(text)}
        value={remarks}
      />
    </View>
  );
  const FlatlistFooter = () => (
    <View style={{marginBottom: 50}}>
      <View
        style={{
          width: '30%',
          top: moderateScale(8),
          alignSelf: 'center',
          borderRadius: moderateScale(10),
        }}>
        <TouchableOpacity
          style={{borderRadius: 10, alignSelf: 'center'}}
          onPress={() => docPicker()}>
          <Text style={{fontSize: 18}}>Upload Files</Text>
          <Icon
            style={{alignSelf: 'center'}}
            name="cloud-upload"
            size={50}
            color="#0084FF"
          />
        </TouchableOpacity>
      </View>
      {isEnabled ? (
        <View style={{margin: 10}}>
          <Button
            buttonStyle={{
              backgroundColor: '#0084FF',
              borderRadius: 25,
              bottom: 0,
              marginTop: 50,
              width: '70%',
              alignSelf: 'center',
            }}
            onPress={() => handleSubmitAppointment()}
            title="Submit Appointment"
          />
        </View>
      ) : null}
    </View>
  );
  return (
    <View style={styles.maincontainer}>
      <DoneOverlay
        visible={overlayvisible}
        message={`Your consultation request has been created. We will keep in touch for further details.`}
        UI={
          <Button
            onPress={() => handleDone()}
            buttonStyle={{
              backgroundColor: '#0084FF',
              borderRadius: 10,
              width: '70%',
              marginBottom: 80,
              alignSelf: 'center',
              height: 50,
            }}
            title="Done"
          />
        }
      />
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.Inputcontainer}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'stretch',
            height: '5%',
          }}>
          <View style={{width: '70%', height: 20}}>
            <Text>Use My Personal Information</Text>
          </View>
          <View style={{width: '5%', height: 20}}>
            <Switch
              trackColor={{false: '#767577', true: '#add8e6'}}
              thumbColor={isEnabled ? '#add8e6' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              accessibilityLabel={'Use My Information'}
            />
          </View>
        </View>
      </View>

      {isEnabled ? (
        <View
          style={styles.Inputcontainer}
          scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}>
          <SearchableDropdown
            onItemSelect={(itemValue) => {
              handleDepartment(itemValue);
            }}
            label="Department"
            placeholder="Department"
            itemTextStyle={{color: 'black'}}
            items={getdepartments}
            defaultIndex={pickdepartmentindex}
            resetValue={false}
            itemStyle={styles.PickerContainer}
            textInputProps={{
              placeholder: 'Department',
              underlineColorAndroid: 'transparent',
              style: {
                padding: 10,
                marginLeft: 12,
                marginRight: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              },

              // onTextChange: (text) => alert(text),
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
          <FlatList
            style={styles.Inputcontainer}
            data={selecteddocs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <Card key={index}>
                <Text>{item?.name}</Text>
              </Card>
            )}
            ListHeaderComponent={
              <View scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}>
                <TextInput
                  multiline
                  style={styles.text}
                  numberOfLines={5}
                  maxLength={100}
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="flat"
                  label="Chief Complaint*"
                  onChangeText={(text) => setcomplaint(text)}
                  value={complaint}
                />
                <TextInput
                  multiline
                  style={styles.text}
                  numberOfLines={5}
                  maxLength={100}
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="flat"
                  label="Symptomps*"
                  onChangeText={(text) => setsymptomps(text)}
                  value={symptomps}
                />
                <TextInput
                  multiline
                  style={styles.text}
                  numberOfLines={5}
                  maxLength={100}
                  theme={{
                    colors: {
                      primary: '#3eb2fa',
                      background: 'white',
                      underlineColor: 'transparent',
                    },
                  }}
                  mode="flat"
                  label="Notes or Other Remarks"
                  onChangeText={(text) => setremarks(text)}
                  value={remarks}
                />
              </View>
            }
            ListFooterComponent={<FlatlistFooter />}
          />
        </View>
      ) : (
        <ProgressSteps
          activeStepIconBorderColor="#0084FF"
          activeLabelColor="#0084FF"
          activeStepNumColor="black"
          labelColor="black"
          completedProgressBarColor="#0084FF"
          completedStepIconColor="#0084FF"
          completedLabelColor="#0084FF"
          disabledStepNumColor="black"
          labelFontSize={10}
          style={styles.plate}>
          <ProgressStep
            scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}
            label="Information"
            onNext={handleNextInfo}
            nextBtnTextStyle={{
              color: '#0084FF',

              fontSize: 14,
            }}
            errors={InfoError}>
            <View style={styles.Inputcontainer}>
              <TextInput
                style={styles.text}
                theme={{
                  colors: {
                    primary: '#3eb2fa',
                    background: 'white',
                    underlineColor: 'transparent',
                  },
                }}
                mode="flat"
                label="Prefix"
                onChangeText={(text) => setPrefix(text)}
                value={prefix}
              />
              <TextInput
                style={styles.text}
                theme={{
                  colors: {
                    primary: '#3eb2fa',
                    background: 'white',
                    underlineColor: 'transparent',
                  },
                }}
                mode="flat"
                label="First name"
                onChangeText={(text) => setfirstname(text)}
                value={firstname}
              />

              <TextInput
                style={styles.text}
                theme={{
                  colors: {
                    primary: '#3eb2fa',
                    background: 'white',
                    underlineColor: 'transparent',
                  },
                }}
                mode="flat"
                label="Middle name"
                onChangeText={(text) => setmiddlename(text)}
                value={middlename}
              />

              <TextInput
                style={styles.text}
                theme={{
                  colors: {
                    primary: '#3eb2fa',
                    background: 'white',
                    underlineColor: 'transparent',
                  },
                }}
                mode="flat"
                label="Last name"
                onChangeText={(text) => setlastname(text)}
                value={lastname}
              />

              <TextInput
                style={styles.text}
                theme={{
                  colors: {
                    primary: '#3eb2fa',
                    background: 'white',
                    underlineColor: 'transparent',
                  },
                }}
                mode="flat"
                label="Suffix"
                onChangeText={(text) => setSuffix(text)}
                value={suffix}
              />

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                  }}>
                  <TouchableHighlight
                    underlayColor="white"
                    onPress={showDatepicker}>
                    <TextInput
                      style={styles.text}
                      disabled={true}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      right={
                        <TextInput.Icon
                          name="calendar"
                          onPress={showDatepicker}
                        />
                      }
                      mode="flat"
                      label="Birthdate"
                      value={birthdate}
                    />
                  </TouchableHighlight>
                </View>
              </View>
              <View>
                <SearchableDropdown
                  onItemSelect={(itemValue, index) => {
                    handleCivilStatus(itemValue, index);
                  }}
                  value={{id: civilstatus, name: civilstatuslabel}}
                  label="Civil Status"
                  placeholder="Civil Status"
                  itemTextStyle={{color: 'black'}}
                  items={getpickercivilstatus}
                  defaultIndex={civilstatusindex}
                  resetValue={false}
                  itemStyle={styles.PickerContainer}
                  textInputProps={{
                    placeholder: 'Civil Status',

                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 10,
                      marginLeft: 12,
                      marginRight: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },

                    // onTextChange: (text) => alert(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>
              <View>
                <SearchableDropdown
                  onItemSelect={(itemValue) => {
                    handleNationality(itemValue);
                  }}
                  label="Select Nationality"
                  placeholder="Select Nationality"
                  itemTextStyle={{color: 'black'}}
                  style={styles.PickerContainer}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={getpickernationality}
                  defaultIndex={nationalityindex}
                  resetValue={false}
                  itemStyle={styles.PickerContainer}
                  textInputProps={{
                    placeholder: 'Select Nationality',
                    underlineColorAndroid: 'transparent',
                    style: {
                      marginLeft: 12,
                      marginRight: 12,
                      padding: 10,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                    // onTextChange: (text) => alert(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>
              <View>
                <SearchableDropdown
                  onItemSelect={(itemValue) => {
                    handleReligion(itemValue);
                  }}
                  label="Select Religion"
                  placeholder="Select Religion"
                  itemTextStyle={{color: 'black'}}
                  style={styles.PickerContainer}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={getpickerreligion}
                  defaultIndex={religionindex}
                  resetValue={false}
                  itemStyle={styles.PickerContainer}
                  textInputProps={{
                    placeholder: 'Select Religion',
                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 10,
                      marginLeft: 12,
                      marginRight: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                    // onTextChange: (text) => alert(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>
              <View>
                <Picker
                  selectedValue={gender}
                  style={styles.PickerContainer}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) =>
                    setgender(itemValue)
                  }>
                  <Picker.Item label="Gender" />
                  <Picker.Item label="Male" value="M" />
                  <Picker.Item label="Female" value="F" />
                </Picker>
              </View>
            </View>
          </ProgressStep>

          <ProgressStep
            scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}
            label="Contact Dsetails"
            previousBtnTextStyle={{color: '#0084FF', fontSize: 14}}
            nextBtnTextStyle={{
              color: '#0084FF',
              fontSize: 14,
            }}
            onNext={handleNextAddress}
            errors={AddressError}>
            <View style={styles.Inputcontainer}>
              <TextInput
                style={styles.text}
                theme={{
                  colors: {
                    primary: '#3eb2fa',
                    background: 'white',
                    underlineColor: 'transparent',
                  },
                }}
                mode="flat"
                error={emailErrorMessage}
                onChangeText={(text) => validate(text)}
                label="Email"
                value={email}
              />

              <TextInput
                style={styles.text}
                theme={{
                  colors: {
                    primary: '#3eb2fa',
                    background: 'white',
                    underlineColor: 'transparent',
                  },
                }}
                mode="flat"
                onChangeText={(text) => setmobile(text)}
                label="Mobile No."
                value={mobile}
              />
              <View>
                <SearchableDropdown
                  onItemSelect={(itemValue) => {
                    handleRegionChange(itemValue);
                  }}
                  label="Select Region"
                  placeholder="Select Region"
                  itemTextStyle={{color: 'black'}}
                  style={styles.PickerContainer}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={getpickerregions}
                  defaultIndex={regionindex}
                  resetValue={false}
                  itemStyle={styles.PickerContainer}
                  textInputProps={{
                    placeholder: 'Select Region',
                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 10,
                      marginLeft: 12,
                      marginRight: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                    // onTextChange: (text) => alert(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>
              <View>
                <SearchableDropdown
                  onItemSelect={(itemValue) => {
                    handleProvinceChange(itemValue);
                  }}
                  label="Select Province"
                  placeholder="Select Province"
                  itemTextStyle={{color: 'black'}}
                  style={styles.PickerContainer}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={getpickerprovince}
                  defaultIndex={provinceindex}
                  resetValue={false}
                  itemStyle={styles.PickerContainer}
                  textInputProps={{
                    placeholder: 'Select Province',
                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 10,
                      marginLeft: 12,
                      marginRight: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                    // onTextChange: (text) => alert(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>
              <View>
                <SearchableDropdown
                  onItemSelect={(itemValue) => {
                    handleCityChange(itemValue);
                  }}
                  label="Select City"
                  placeholder="Select City"
                  itemTextStyle={{color: 'black'}}
                  style={styles.PickerContainer}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={getpickercity}
                  defaultIndex={cityindex}
                  resetValue={false}
                  itemStyle={styles.PickerContainer}
                  textInputProps={{
                    placeholder: 'Select City',
                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 10,
                      marginLeft: 12,
                      marginRight: 12,
                      marginLeft: 12,
                      marginRight: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                    // onTextChange: (text) => alert(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>
              <View>
                <SearchableDropdown
                  onItemSelect={(itemValue) => {
                    handleBarangayChange(itemValue);
                  }}
                  label="Select Barangay"
                  placeholder="Select Barangay"
                  itemTextStyle={{color: 'black'}}
                  style={styles.PickerContainer}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={getpickerbarangay}
                  defaultIndex={barangayindex}
                  resetValue={false}
                  itemStyle={styles.PickerContainer}
                  textInputProps={{
                    placeholder: 'Select Barangay',
                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 10,
                      marginLeft: 12,
                      marginRight: 12,
                      marginLeft: 12,
                      marginRight: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                    // onTextChange: (text) => alert(text),
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>
              <TextInput
                style={styles.text}
                theme={{
                  colors: {
                    primary: '#3eb2fa',
                    background: 'white',
                    underlineColor: 'transparent',
                  },
                }}
                mode="flat"
                onChangeText={(text) => setfulladdress(text)}
                label="Line 1"
                value={fulladdress}
              />

              <TextInput
                style={styles.text}
                theme={{
                  colors: {
                    primary: '#3eb2fa',
                    background: 'white',
                    underlineColor: 'transparent',
                  },
                }}
                mode="flat"
                onChangeText={(text) => setfulladdress2(text)}
                label="Line 2"
                value={fulladdress2}
              />

              <TextInput
                style={styles.text}
                theme={{
                  colors: {
                    primary: '#3eb2fa',
                    background: 'white',
                    underlineColor: 'transparent',
                  },
                }}
                mode="flat"
                defaultValue="6000"
                onChangeText={(text) => setzipcode(text)}
                label="Postal Code"
                value={zipcode}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}
            label="Consultation Details"
            previousBtnTextStyle={{color: '#0084FF', fontSize: 14}}
            nextBtnTextStyle={{
              color: '#0084FF',
              fontSize: 14,
            }}
            onSubmit={() => handleSubmitCredentials()}>
            <View style={styles.Inputcontainer}>
              <SearchableDropdown
                onItemSelect={(itemValue) => {
                  handleDepartment(itemValue);
                }}
                label="Department"
                placeholder="Department"
                itemTextStyle={{color: 'black'}}
                items={getdepartments}
                defaultIndex={pickdepartmentindex}
                resetValue={false}
                itemStyle={styles.PickerContainer}
                textInputProps={{
                  placeholder: 'Department',
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 10,
                    marginLeft: 12,
                    marginRight: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },

                  // onTextChange: (text) => alert(text),
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
              <TextInput
                style={styles.text}
                multiline
                numberOfLines={5}
                maxLength={100}
                theme={{
                  colors: {
                    primary: '#3eb2fa',
                    background: 'white',
                    underlineColor: 'transparent',
                  },
                }}
                mode="flat"
                label="Chief Complaint*"
                onChangeText={(text) => setcomplaint(text)}
                value={complaint}
              />
              <TextInput
                style={styles.text}
                multiline
                numberOfLines={5}
                maxLength={100}
                theme={{
                  colors: {
                    primary: '#3eb2fa',
                    background: 'white',
                    underlineColor: 'transparent',
                  },
                }}
                mode="flat"
                label="Symptomps*"
                onChangeText={(text) => setsymptomps(text)}
                value={symptomps}
              />
              <TextInput
                style={styles.text}
                multiline
                numberOfLines={5}
                maxLength={100}
                theme={{
                  colors: {
                    primary: '#3eb2fa',
                    background: 'white',
                    underlineColor: 'transparent',
                  },
                }}
                mode="flat"
                label="Notes or Other Remarks"
                onChangeText={(text) => setremarks(text)}
                value={remarks}
              />

              <FlatList
                style={styles.Inputcontainer}
                data={selecteddocs}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <Card>
                    <Text>{item?.name}</Text>
                  </Card>
                )}
                ListFooterComponent={<FlatlistFooter />}
              />
            </View>
          </ProgressStep>
        </ProgressSteps>
      )}
    </View>
  );
};

export default FormClinic;
