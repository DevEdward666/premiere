import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Text,
  PermissionsAndroid,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {TextInput, HelperText} from 'react-native-paper';
import CardView from 'react-native-rn-cardview';
import {Icon} from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import {Input} from 'react-native-elements';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {useDispatch, useSelector} from 'react-redux';
// import TextInputMask from 'react-native-text-input-mask';
import {TextInputMask} from 'react-native-masked-text';
import {
  action_GET_barangay,
  action_GET_city,
  action_GET_nationality,
  action_GET_civilstatus,
  action_GET_religion,
  action_GET_province,
  action_GET_region,
  action_alerted,
  action_imagepickeroptions,
} from '../../Services/Actions/Default_Actions';
import {
  action_SignUp_user,
  action_GET_usernameExist,
  action_POST_FileImage,
  action_POST_FileImageProfile,
} from '../../Services/Actions/SignUp_Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-elements';
import styles from './style';
import CustomAlert from '../../Plugins/CustomAlert/CustomAlert';
const SignUp = () => {
  // const DropDown = require('react-native-material-dropdown-v2');
  // const {Select, Option, OptionList, updatePosition} = DropDown;
  const [firstname, setfirstname] = useState('');
  const [imagepickeroptions, setimagepickeroptions] = useState(setcamera);
  const [middlename, setmiddlename] = useState('');
  const [lastname, setlastname] = useState('');
  const [gender, setgender] = useState('');
  const [suffix, setSuffix] = useState('');
  const [mobile, setmobile] = useState('63');
  const [email, setemail] = useState('');
  const [birthdate, setbirthdate] = useState('');
  const [nationality, setnationality] = useState('');
  const [city, setcity] = useState('');
  const [citylabel, setcitylabel] = useState('');
  const [cityvalue, setcityvalue] = useState('');
  const [psgc, setpsgc] = useState('');
  const [region, setregion] = useState('');
  const [province, setprovince] = useState('');
  const [provincelabel, setprovincelabel] = useState('');
  const [provincevalue, setprovincevalue] = useState('');
  const [barangay, setbarangay] = useState('');
  const [barangaylabel, setbarangaylabel] = useState('');
  const [barangayvalue, setbarangayvalue] = useState('');
  const [fulladdress, setfulladdress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    var today = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    var age_now = today.getFullYear() - currentDate.getFullYear();
    console.log(age_now);
    if (age_now < '13') {
      alert('Age below 13 are not allowed to use this application');
    } else {
      if (month <= 9 && day <= 9) {
        setbirthdate(year + '-0' + month + '-0' + day);
      } else if (month <= 9) {
        setbirthdate(year + '-0' + month + '-' + day);
      } else if (day <= 9) {
        setbirthdate(year + '-' + month + '-0' + day);
      } else {
        setbirthdate(year + '-' + month + '-' + day);
      }
    }

    //console.log(year + '-' + month + '-' + day);
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
  const religion_reducers = useSelector(
    (state) => state.Default_Reducers.religion,
  );
  const civil_status_reducers = useSelector(
    (state) => state.Default_Reducers.civil_status,
  );
  const city_reducers = useSelector((state) => state.Default_Reducers.city);
  const nationality_reducers = useSelector(
    (state) => state.Default_Reducers.nationality,
  );
  const setcamera = useSelector((state) => state.Default_Reducers.setcamera);
  const SignUp_Reducers = useSelector((state) => state.SignUp_Reducers);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorUsernameMessage, setErrorMessageUsername] = useState('');
  const [emailErrorMessage, setemailErrorMessage] = useState(false);
  const [mobileErrorMessage, setmobileErrorMessage] = useState('');
  const [PINErrorMessage, setPINErrorMessage] = useState(false);
  const [InfoError, setInfoError] = useState(false);
  const [AddressError, setAddressError] = useState(false);
  const [resourcePath, setresourcePath] = useState(null);
  const [resourcePathProfile, setresourcePathProfile] = useState(null);
  const [imageresponse, setimageresponse] = useState(null);
  const [profileimageresponse, setprofileimageresponse] = useState(null);
  const [showpass, setshowpass] = useState(true);
  const [iconpass, seticonpass] = useState(false);
  const [showconfirmpass, setshowconfirmpass] = useState(true);
  const [iconconfirmpass, seticonconfirmpass] = useState(false);
  const [passworderrormessage, setpassworderrormessage] = useState('');
  const [stepError, setstepError] = useState(false);
  const [pin, setpin] = useState('');
  const [confirmationpin, setconfirmationpin] = useState('');
  const unmaskedmobile = useRef(null);
  const [getpickerregions, setpickerregions] = useState([]);
  const [getpickerbarangay, setpickerbarangay] = useState([]);
  const [getpickerprovince, setpickerprovince] = useState([]);
  const [getpickercity, setpickercity] = useState([]);
  const [getpickernationality, setpickernationality] = useState([]);
  const [getpickercivilstatus, setpickercivilstatus] = useState([]);
  const [getpickerreligion, setpickerreligion] = useState([]);
  const [civilstatus, setCivilStatus] = useState('');
  const [civilstatuslabel, setCivilStatuslabel] = useState('');
  const [civilstatusvalue, setCivilStatusvalue] = useState('');
  const [religion, setreligion] = useState('');
  const [alerted, setalerted] = useState(false);
  useEffect(() => {
    let mounted = true;
    const dropdownitems = () => {
      if (mounted) {
        const regions = region_reducers.map((item) => ({
          code: item.regioncode,
          desc: item.regiondesc,
          id: item.regioncode,
          name: item.regiondesc,
        }));
        const barangay = barangay_reducers.map((item) => ({
          code: item.barangaycode,
          desc: item.barangaydesc,
          id: item.barangaycode,
          name: item.barangaydesc,
        }));
        const province = province_reducers.map((item) => ({
          code: item.provincecode,
          desc: item.provincedesc,
          id: item.provincecode,
          name: item.provincedesc,
        }));
        const city = city_reducers.map((item) => ({
          code: item.citymuncode,
          desc: item.citymundesc,
          id: item.citymuncode,
          name: item.citymundesc,
        }));
        const nationalitypick = nationality_reducers.map((item) => ({
          code: item.nationality,
          desc: item.nationality,
          id: item.nationality,
          name: item.nationality + '(' + item.country + ')',
        }));
        const civilstatus = civil_status_reducers.map((item) => ({
          code: item.cskey,
          desc: item.csdesc,
          id: item.cskey,
          name: item.csdesc,
        }));
        const religion = religion_reducers.map((item) => ({
          code: item.religion,
          desc: item.description,
          id: item.religion,
          name: item.description + '(' + item.religion + ')',
        }));
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
    civil_status_reducers,
    nationality_reducers,
    city_reducers,
    province_reducers,
    barangay_reducers,
    region_reducers,
  ]);
  console.log(civil_status_reducers);
  const handleRegionChange = (pickregion) => {
    let mounted = true;
    if (mounted) {
      console.log(pickregion);
      setregion(pickregion?.code);
      setprovince('');
      setcity('');
      setbarangay('');
      dispatch(action_GET_province(pickregion?.code));
    }
    return () => {
      mounted = false;
    };
  };

  const handleProvinceChange = (pickprovince) => {
    let mounted = true;
    if (mounted) {
      setprovince(pickprovince?.code);
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
      setcity(pickcity?.code);
      setcitylabel(pickcity?.desc);
      setcityvalue(pickcity?.code);
      dispatch(action_GET_barangay(region, provincevalue, pickcity?.code));
    }
    return () => {
      mounted = false;
    };
  };
  const handleCivilStatus = (pickstatus) => {
    let mounted = true;
    if (mounted) {
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
      setreligion(pickreligion?.code);
    }
    return () => {
      mounted = false;
    };
  };
  const handleBarangayChange = (pickBarangay) => {
    let mounted = true;
    if (mounted) {
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
    }
    return () => {
      mounted = false;
    };
  };
  const handleUsernameExist = async (usernames) => {
    await setUsername(usernames);
    await dispatch(action_GET_usernameExist(usernames));

    //setErrorMessage('Password mismatch');
  };
  const tomarFoto = useCallback(() => {
    ImagePicker.launchCamera({maxWidth: 1280, maxHeight: 720}, (response) => {
      requestCameraPermission();
      setresourcePath(response.uri); // update the local state, this will rerender your TomarFoto component with the photo uri path.
      if (response.didCancel) {
        alert('Action cancelled ');
      } else if (response.error) {
        alert('Error : ', error);
      } else {
        const source = {uri: response.uri};
        console.log(response.uri);
        setimageresponse(response);
        //    dispatch(action_POST_FileImage(response));
      }
    });
  }, [setresourcePath]);
  const requestCameraPermission = async () => {
    try {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
        async (response) => {
          if (response === false) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMEARA,
              {
                title: 'Permission to use camera',
                message: 'Premiere needs access to your camera ',
                buttonNegative: 'Decline',
                buttonPositive: 'Approve',
              },
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the camera');
            } else {
              console.log('Camera permission denied');
            }
          }
        },
      );
    } catch (err) {
      console.warn(err);
    }
  };

  const profileImage = useCallback(() => {
    dispatch(action_alerted(true));

    // ImagePicker.launchCamera({maxWidth: 1280, maxHeight: 720}, (response) => {
    //   requestCameraPermission();
    //   setresourcePathProfile(response.uri); // update the local state, this will rerender your TomarFoto component with the photo uri path.
    //   if (response.didCancel) {
    //     alert('Action cancelled ');
    //   } else if (response.error) {
    //     alert('Error : ', error);
    //   } else {
    //     const source = {uri: response.uri};
    //     console.log(response.uri);
    //     setprofileimageresponse(response);
    //     //  dispatch(action_POST_FileImageProfile(response, username));
    //   }
    // });
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const getimagepicker = () => {
      requestCameraPermission();
      if (setcamera === 'launchCamera') {
        ImagePicker.launchCamera(
          {maxWidth: 1280, maxHeight: 720},
          (response) => {
            setresourcePathProfile(response.uri); // update the local state, this will rerender your TomarFoto component with the photo uri path.
            if (response.didCancel) {
              console.log('Action cancelled ');
            } else if (response.error) {
              console.log('Error : ', error);
            } else {
              const source = {uri: response.uri};
              console.log(response.uri);
              setprofileimageresponse(response);
              //  dispatch(action_POST_FileImageProfile(response, username));
            }
          },
        );
        dispatch(action_alerted(false));
      } else if (setcamera === 'launchImageLibrary') {
        ImagePicker.launchImageLibrary(
          {maxWidth: 1280, maxHeight: 720, mediaType: 'photo'},
          (response) => {
            setresourcePathProfile(response.uri); // update the local state, this will rerender your TomarFoto component with the photo uri path.
            if (response.didCancel) {
              console.log('Action cancelled ');
            } else if (response.error) {
              console.log('Error : ', error);
            } else {
              const source = {uri: response.uri};
              console.log(response.uri);
              setprofileimageresponse(response);
              //  dispatch(action_POST_FileImageProfile(response, username));
            }
          },
        );
        dispatch(action_alerted(false));
      }
    };
    mounted && getimagepicker();
    return () => {
      mounted = false;
    };
  }, [setcamera, dispatch]);
  useEffect(() => {
    let mounted = true;
    const geterrors = () => {
      if (SignUp_Reducers.username?.username == username) {
        setErrorMessageUsername(true);
        setstepError(true);
      } else {
        setErrorMessageUsername(false);
        setstepError(false);
      }
    };
    mounted && geterrors();
    return () => {
      mounted = false;
    };
  }, [username, SignUp_Reducers]);
  const handlePassword = (password) => {
    setPassword(password);
    if (password != confirmpassword) {
      setErrorMessage(true);
      setpassworderrormessage('Password Mismatch');
      setstepError(true);
    } else {
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (reg.test(password) === false) {
        setErrorMessage(true);
        setpassworderrormessage(
          'Must be 8 characters long 1 UPPERCASE 1 Numeric',
        );
      } else {
        setmobileErrorMessage();
        setstepError(false);
        setErrorMessage(false);
      }
    }
  };
  const showpassword = useCallback(() => {
    if (showpass == true) {
      setshowpass(false);
      seticonpass(true);
    } else {
      setshowpass(true);
      seticonpass(false);
    }
  }, [showpass, iconpass]);
  const showconfirmpassword = useCallback(() => {
    if (showconfirmpass == true) {
      setshowconfirmpass(false);
      seticonconfirmpass(true);
    } else {
      setshowconfirmpass(true);
      seticonconfirmpass(false);
    }
  }, [showconfirmpass, iconconfirmpass]);
  const handleConfirmPassword = (confirmpassword) => {
    setconfirmpassword(confirmpassword);
    if (password != confirmpassword) {
      setErrorMessage(true);
      setpassworderrormessage('Password Mismatch');
      setstepError(true);
    } else {
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (reg.test(password) === false) {
        setErrorMessage(true);
        setpassworderrormessage(
          'Must be 8 characters long 1 UPPERCASE 1 Numeric',
        );
      } else {
        setmobileErrorMessage();
        setstepError(false);
        setErrorMessage(false);
      }
    }
  };

  const handleConfirmPIN = useCallback(
    (confirmPin) => {
      setconfirmationpin(confirmPin);
      const numericRegex = /^([0-9]{0,9})+$/;
      if (pin !== confirmPin) {
        setPINErrorMessage('PIN Mismatch');
        setstepError(true);
        console.log(pin, confirmPin);
      } else {
        if (numericRegex.test(confirmPin)) {
          setconfirmationpin(confirmPin);
        }

        setPINErrorMessage('');
        setstepError(false);
      }
    },
    [confirmationpin, pin],
  );
  const handlePIN = useCallback(
    (Pin) => {
      const numericRegex = /^([0-9]{0,9})+$/;
      if (numericRegex.test(Pin)) {
        setpin(Pin);
      }
    },
    [pin, confirmationpin],
  );
  const handleNextInfo = () => {
    if (firstname == '' || lastname == '' || gender == '' || birthdate == '') {
      setInfoError(true);
      alert('Please Fill All Fields');
    }
    if (resourcePathProfile == null) {
      alert('Please Take Profile Image');
      setInfoError(true);
    } else if (resourcePath == null) {
      alert('Please Insert a photo of a valid document Ex: Drivers License');
      setInfoError(true);
    } else {
      setInfoError(false);
    }
    console.log(resourcePathProfile);
  };

  const handleNextAddress = () => {
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
  };

  const validate = (email) => {
    setemail(email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setemailErrorMessage(true);
    } else {
      setemailErrorMessage(false);
      setemail(email);
    }
  };

  const handleSubmitCredentials = async () => {
    if (stepError == false) {
      await dispatch(
        action_SignUp_user(
          firstname,
          middlename,
          lastname,
          gender,
          civilstatusvalue,
          birthdate,
          mobile.split(' ').join(''),
          email,
          username,
          password,
          pin,
          region,
          city,
          province,
          barangay,
          '8000',
          religion,
          nationality,
          fulladdress,
          imageresponse,
          profileimageresponse,
        ),
      );
    } else {
      alert('Please Provide Valid Data');
    }
  };
  useEffect(() => {
    let mounted = true;
    const getnationalityandregion = () => {
      if (mounted) {
        dispatch(action_GET_region());
        dispatch(action_GET_nationality());
        dispatch(action_GET_civilstatus());
        dispatch(action_GET_religion());
      }
    };
    mounted && getnationalityandregion();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  return (
    // <ImageBackground
    //   style={{flex: 1}}
    //   source={require('../../assets/background/background.jpeg')}
    //   resizeMode="cover"
    //   blurRadius={2}>
    <View
      style={{backgroundScrollViewColor: 'white', flex: 1}}
      scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <CustomAlert
            showalert={alerted}
            messageTitle={'Choose your option'}
          />
          <ProgressSteps
            activeStepIconBorderColor="#034c81"
            activeLabelColor="#034c81"
            activeStepNumColor="black"
            labelColor="black"
            completedProgressBarColor="#034c81"
            completedStepIconColor="#034c81"
            completedLabelColor="#034c81"
            disabledStepNumColor="black">
            <ProgressStep
              scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}
              nextBtnTextStyle={{
                color: '#034c81',
                fontSize: 20,
              }}
              label="Information"
              onNext={handleNextInfo}
              errors={InfoError}>
              <View style={styles.cardContainer}>
                {resourcePathProfile ? (
                  <TouchableHighlight
                    onPress={() => profileImage()}
                    style={{
                      width: '100%',
                      height: 180,
                      resizeMode: 'contain',
                      alignContent: 'flex-start',
                    }}
                    underlayColor="white">
                    <ImageBackground
                      style={styles.avatar}
                      source={{
                        uri: resourcePathProfile,
                      }}>
                      <Text style={styles.text}>Choose Image</Text>
                    </ImageBackground>
                  </TouchableHighlight>
                ) : (
                  <TouchableHighlight
                    onPress={() => profileImage()}
                    style={{
                      width: '100%',
                      height: 180,
                      resizeMode: 'contain',
                      alignContent: 'flex-start',
                    }}
                    underlayColor="white">
                    <ImageBackground
                      style={styles.avatar}
                      source={{
                        uri:
                          'https://bootdey.com/img/Content/avatar/avatar6.png',
                      }}>
                      <Text style={styles.text}>Take a Photo</Text>
                    </ImageBackground>
                  </TouchableHighlight>
                )}

                <View style={styles.Inputcontainer}>
                  <TextInput
                    style={{marginTop: 10}}
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
                    style={{marginTop: 10}}
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
                    style={{marginTop: 10}}
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
                    style={{marginTop: 10}}
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

                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableHighlight
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      onPress={showDatepicker}>
                      <TextInput
                        style={{marginTop: 10}}
                        disabled={true}
                        theme={{
                          colors: {
                            primary: '#3eb2fa',
                            background: 'white',
                            underlineColor: 'transparent',
                          },
                        }}
                        mode="flat"
                        label="Birthdate"
                        value={birthdate}
                      />
                    </TouchableHighlight>
                  </View>
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
                  <View style={styles.cardContainer}>
                    <SearchableDropdown
                      onItemSelect={(itemValue) => {
                        handleCivilStatus(itemValue);
                      }}
                      label="Civil Status"
                      placeholder="Civil Status"
                      itemTextStyle={{color: 'black'}}
                      containerStyle={styles.PickerContainer}
                      itemsContainerStyle={{maxHeight: 140}}
                      items={getpickercivilstatus}
                      defaultIndex={2}
                      resetValue={false}
                      itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: 'white',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                      textInputProps={{
                        placeholder: 'Civil Status',
                        underlineColorAndroid: 'transparent',
                        style: {
                          padding: 12,
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
                  <View style={styles.card}>
                    <Picker
                      selectedValue={gender}
                      style={styles.PickerContainer}
                      onValueChange={(itemValue, itemIndex) =>
                        setgender(itemValue)
                      }>
                      <Picker.Item label="Gender" />
                      <Picker.Item label="Male" value="M" />
                      <Picker.Item label="Female" value="F" />
                    </Picker>
                  </View>
                </View>
                <CardView radius={1} backgroundColor={'#fafafafa'}>
                  <View style={styles.imagecontainer}>
                    {resourcePath ? (
                      <TouchableHighlight
                        onPress={tomarFoto}
                        style={{
                          width: '100%',
                          height: 220,
                          resizeMode: 'contain',
                          alignContent: 'flex-start',
                        }}
                        underlayColor="rgba(255,255,355,0.1)">
                        <ImageBackground
                          style={{
                            width: '100%',
                            height: 220,
                            resizeMode: 'contain',
                            backgroundColor: 'rgba(255,255,355,0.1)',
                            alignContent: 'flex-start',
                          }}
                          source={{uri: resourcePath}}>
                          <Text style={styles.text}>Capture Valid ID</Text>
                        </ImageBackground>
                      </TouchableHighlight>
                    ) : (
                      <TouchableHighlight
                        onPress={tomarFoto}
                        style={{
                          width: '100%',
                          height: 220,
                          resizeMode: 'contain',
                          alignContent: 'flex-start',
                        }}
                        underlayColor="rgba(255,255,355,0.1)">
                        <ImageBackground
                          style={{
                            width: '100%',
                            height: 220,
                            backgroundColor: 'rgba(255,255,355,0.1)',
                            resizeMode: 'contain',
                            alignContent: 'flex-start',
                          }}
                          source={require('../assets/icons/valid_id.jpg')}>
                          <Text style={styles.text}>Capture Valid ID</Text>
                        </ImageBackground>
                      </TouchableHighlight>
                    )}
                  </View>
                </CardView>
              </View>
            </ProgressStep>
            <ProgressStep
              scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}
              previousBtnTextStyle={{color: '#034c81', fontSize: 20}}
              nextBtnTextStyle={{
                color: '#034c81',
                fontSize: 20,
              }}
              label="Address"
              onNext={handleNextAddress}
              errors={AddressError}>
              <View style={styles.Inputcontainer}>
                <View style={styles.cardContainer}>
                  <SearchableDropdown
                    onItemSelect={(itemValue) => {
                      handleNationality(itemValue);
                    }}
                    label="Select Nationality"
                    placeholder="Select Nationality"
                    itemTextStyle={{color: 'black'}}
                    containerStyle={styles.PickerContainer}
                    itemsContainerStyle={{maxHeight: 140}}
                    items={getpickernationality}
                    defaultIndex={2}
                    resetValue={false}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: 'white',
                      borderColor: '#bbb',
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                    textInputProps={{
                      placeholder: 'Select Nationality',
                      underlineColorAndroid: 'transparent',
                      style: {
                        padding: 12,
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
                <View style={styles.cardContainer}>
                  <SearchableDropdown
                    onItemSelect={(itemValue) => {
                      handleReligion(itemValue);
                    }}
                    label="Select Religion"
                    placeholder="Select Religion"
                    itemTextStyle={{color: 'black'}}
                    containerStyle={styles.PickerContainer}
                    itemsContainerStyle={{maxHeight: 140}}
                    items={getpickerreligion}
                    defaultIndex={2}
                    resetValue={false}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: 'white',
                      borderColor: '#bbb',
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                    textInputProps={{
                      placeholder: 'Select Religion',
                      underlineColorAndroid: 'transparent',
                      style: {
                        padding: 12,
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
                <View style={styles.cardContainer}>
                  <SearchableDropdown
                    onItemSelect={(itemValue) => {
                      handleRegionChange(itemValue);
                    }}
                    label="Select Region"
                    placeholder="Select Region"
                    itemTextStyle={{color: 'black'}}
                    containerStyle={styles.PickerContainer}
                    itemsContainerStyle={{maxHeight: 140}}
                    items={getpickerregions}
                    defaultIndex={2}
                    resetValue={false}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: 'white',
                      borderColor: '#bbb',
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                    textInputProps={{
                      placeholder: 'Select Region',
                      underlineColorAndroid: 'transparent',
                      style: {
                        padding: 12,
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
                <View style={styles.cardContainer}>
                  <SearchableDropdown
                    onItemSelect={(itemValue) => {
                      handleProvinceChange(itemValue);
                    }}
                    label="Select Province"
                    placeholder="Select Province"
                    itemTextStyle={{color: 'black'}}
                    containerStyle={styles.PickerContainer}
                    itemsContainerStyle={{maxHeight: 140}}
                    items={getpickerprovince}
                    defaultIndex={2}
                    resetValue={false}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: 'white',
                      borderColor: '#bbb',
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                    textInputProps={{
                      placeholder: 'Select Province',
                      underlineColorAndroid: 'transparent',
                      style: {
                        padding: 12,
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
                <View style={styles.cardContainer}>
                  <SearchableDropdown
                    onItemSelect={(itemValue) => {
                      handleCityChange(itemValue);
                    }}
                    label="Select City"
                    placeholder="Select City"
                    itemTextStyle={{color: 'black'}}
                    containerStyle={styles.PickerContainer}
                    itemsContainerStyle={{maxHeight: 140}}
                    items={getpickercity}
                    defaultIndex={2}
                    resetValue={false}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: 'white',
                      borderColor: '#bbb',
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                    textInputProps={{
                      placeholder: 'Select City',
                      underlineColorAndroid: 'transparent',
                      style: {
                        padding: 12,
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
                <View style={styles.cardContainer}>
                  <SearchableDropdown
                    onItemSelect={(itemValue) => {
                      handleBarangayChange(itemValue);
                    }}
                    label="Select Barangay"
                    placeholder="Select Barangay"
                    itemTextStyle={{color: 'black'}}
                    containerStyle={styles.PickerContainer}
                    itemsContainerStyle={{maxHeight: 140}}
                    items={getpickerbarangay}
                    defaultIndex={2}
                    resetValue={false}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: 'white',
                      borderColor: '#bbb',
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                    textInputProps={{
                      placeholder: 'Select Barangay',
                      underlineColorAndroid: 'transparent',
                      style: {
                        padding: 12,
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
                <View style={styles.cardContainer}>
                  <TextInput
                    theme={{
                      colors: {
                        primary: '#3eb2fa',
                        background: 'white',
                        underlineColor: 'transparent',
                      },
                    }}
                    mode="flat"
                    label="Street/Lot No./Blk/"
                    onChangeText={(text) => setfulladdress(text)}
                    value={fulladdress}
                  />
                </View>
              </View>
            </ProgressStep>
            <ProgressStep
              previousBtnTextStyle={{color: '#034c81', fontSize: 20}}
              nextBtnTextStyle={{
                color: '#034c81',
                fontSize: 20,
              }}
              label="Credentials"
              onSubmit={handleSubmitCredentials}>
              <View style={styles.Inputcontainer}>
                <View style={styles.cardContainer}>
                  <TextInput
                    theme={{
                      colors: {
                        primary: '#3eb2fa',
                        background: 'white',
                        underlineColor: 'transparent',
                      },
                    }}
                    mode="flat"
                    label="Email"
                    error={emailErrorMessage}
                    onChangeText={(text) => validate(text)}
                    value={email}
                  />
                  <HelperText type="error" visible={emailErrorMessage}>
                    Email not valid
                  </HelperText>
                </View>
                <View style={styles.cardContainer}>
                  <TextInput
                    render={(props) => (
                      <TextInputMask
                        {...props}
                        type={'cel-phone'}
                        options={{
                          maskType: 'INTERNATIONAL',
                          dddMask: '(63) ',
                        }}
                        value={mobile}
                        onChangeText={(text) => setmobile(text)}
                        ref={unmaskedmobile}
                      />
                    )}
                    mode="flat"
                  />
                </View>
                <View style={styles.cardContainer}>
                  <TextInput
                    theme={{
                      colors: {
                        primary: '#3eb2fa',
                        background: 'white',
                        underlineColor: 'transparent',
                      },
                    }}
                    mode="flat"
                    label="Username"
                    error={errorUsernameMessage}
                    onChangeText={(text) => handleUsernameExist(text)}
                    value={username}
                  />
                  <HelperText type="error" visible={errorUsernameMessage}>
                    Username already exist
                  </HelperText>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      width: '85%',
                    }}>
                    <TextInput
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      label="Password"
                      secureTextEntry={showpass}
                      error={errorMessage}
                      onChangeText={(text) => handlePassword(text)}
                      value={password}
                    />
                    <HelperText type="error" visible={errorMessage}>
                      {passworderrormessage}
                    </HelperText>
                  </View>

                  <View
                    style={{
                      width: '25%',
                    }}>
                    <TouchableHighlight
                      underlayColor="white"
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 55,
                        height: 55,
                        backgroundColor: '#fff',
                        borderRadius: 50,
                      }}
                      onPress={showpassword}>
                      {iconpass ? (
                        <Icon name="visibility" />
                      ) : (
                        <Icon name="visibility-off" />
                      )}
                    </TouchableHighlight>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      width: '85%',
                    }}>
                    <TextInput
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      label="Confirm Password"
                      secureTextEntry={showpass}
                      error={errorMessage}
                      secureTextEntry={showconfirmpass}
                      onChangeText={(text) => handleConfirmPassword(text)}
                      value={confirmpassword}
                    />
                    <HelperText type="error" visible={errorMessage}>
                      {passworderrormessage}
                    </HelperText>
                  </View>
                  <View
                    style={{
                      width: '25%',
                    }}>
                    <TouchableHighlight
                      underlayColor="white"
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 55,
                        height: 55,
                        backgroundColor: '#fff',
                        borderRadius: 50,
                      }}
                      onPress={showconfirmpassword}>
                      {iconconfirmpass ? (
                        <Icon name="visibility" />
                      ) : (
                        <Icon name="visibility-off" />
                      )}
                    </TouchableHighlight>
                  </View>
                </View>
                <View style={styles.cardContainer}>
                  <TextInput
                    theme={{
                      colors: {
                        primary: '#3eb2fa',
                        background: 'white',
                        underlineColor: 'transparent',
                      },
                    }}
                    mode="flat"
                    label="PIN"
                    keyboardType="number-pad"
                    error={PINErrorMessage}
                    onChangeText={(text) => handlePIN(text)}
                    value={pin}
                  />
                </View>
                <View style={styles.cardContainer}>
                  <TextInput
                    theme={{
                      colors: {
                        primary: '#3eb2fa',
                        background: 'white',
                        underlineColor: 'transparent',
                      },
                    }}
                    mode="flat"
                    label="Confirm PIN"
                    keyboardType="number-pad"
                    error={PINErrorMessage}
                    onChangeText={(text) => handleConfirmPIN(text)}
                    value={confirmationpin}
                  />
                </View>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </View>
    </View>
    // </ImageBackground>
  );
};

export default SignUp;
