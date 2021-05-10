import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
import React, {useEffect, useState, useCallback,useRef} from 'react';
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
  
} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import CardView from 'react-native-rn-cardview';
import {Icon} from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import {Input} from 'react-native-elements';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {useDispatch, useSelector} from 'react-redux';
// import TextInputMask from 'react-native-text-input-mask';
import { TextInputMask } from 'react-native-masked-text'
import {
  action_GET_barangay,
  action_GET_city,
  action_GET_nationality,
  action_GET_province,
  action_GET_region,
} from '../Services/Actions/Default_Actions';
import {
  action_SignUp_user,
  action_GET_usernameExist,
  action_POST_FileImage,
  action_POST_FileImageProfile,
} from '../Services/Actions/SignUp_Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements';
const SignUp = () => {
  // const DropDown = require('react-native-material-dropdown-v2');
  // const {Select, Option, OptionList, updatePosition} = DropDown;
  const [firstname, setfirstname] = useState('');
  const [middlename, setmiddlename] = useState('');
  const [lastname, setlastname] = useState('');
  const [gender, setgender] = useState('');
  const [suffix, setSuffix] = useState('');
  const [mobile, setmobile] = useState('63');
  const [email, setemail] = useState('');
  const [birthdate, setbirthdate] = useState('');
  const [nationality, setnationality] = useState('');
  const [city, setcity] = useState('');
  const [region, setregion] = useState('');
  const [province, setprovince] = useState('');
  const [barangay, setbarangay] = useState('');
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
  const city_reducers = useSelector((state) => state.Default_Reducers.city);
  const nationality_reducers = useSelector(
    (state) => state.Default_Reducers.nationality,
  );
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

  const handleRegionChange = (pickregion) => {
    setregion(pickregion);
    setprovince('');
    setcity('');
    setbarangay('');
    dispatch(action_GET_province(pickregion));
  };
  const handleProvinceChange = (pickprovince) => {
    setprovince(pickprovince);
    dispatch(action_GET_city(region, pickprovince));
  };
  const handleCityChange = (pickcity) => {
    setcity(pickcity);
    dispatch(action_GET_barangay(region, province, pickcity));
  };
  const handleBarangayChange = (pickBarangay) => {
    setbarangay(pickBarangay);
  };
  const handleNationality = (pickNationality) => {
    setnationality(pickNationality);
  };
  const handleUsernameExist = async (usernames) => {
    await setUsername(usernames);
    await dispatch(action_GET_usernameExist(usernames));

    //setErrorMessage('Password mismatch');
  };
  const tomarFoto = useCallback(() => {
    ImagePicker.launchCamera({maxWidth: 1280, maxHeight: 720}, (response) => {
      console.log('Request =', response);
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
  const profileImage = useCallback(() => {
    ImagePicker.launchCamera({maxWidth: 1280, maxHeight: 720}, (response) => {
      console.log('Request =', response);
      setresourcePathProfile(response.uri); // update the local state, this will rerender your TomarFoto component with the photo uri path.
      if (response.didCancel) {
        alert('Action cancelled ');
      } else if (response.error) {
        alert('Error : ', error);
      } else {
        const source = {uri: response.uri};
        console.log(response.uri);
        setprofileimageresponse(response);
        //  dispatch(action_POST_FileImageProfile(response, username));
      }
    });
  }, [setresourcePathProfile]);
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
    return () => (mounted = false);
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
    if (
      firstname == '' ||
      lastname == '' ||
      gender == '' ||
      birthdate == ''
    ) {
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
          nationality,
          fulladdress,
          imageresponse,
          profileimageresponse,
        ),
      );
      // await dispatch(action_POST_FileImage(imageresponse, username));
      // await dispatch(
      //   action_POST_FileImageProfile(profileimageresponse, username),
      // );
    } else {
      alert('Please Provide Valid Data');
    }
  };
  useEffect(() => {
    let mounted = true;
    const getnationalityandregion = () => {
      dispatch(action_GET_region());
      dispatch(action_GET_nationality());
    };
    mounted && getnationalityandregion();
    return () => (mounted = false);
  }, [dispatch]);
  return (
    <ImageBackground
    style={{flex: 1}}
    source={require('../../assets/background/background.jpeg')}
    resizeMode="cover"
    blurRadius={2}>
    <ScrollView style={{backgroundScrollViewColor: 'white'}}>
    
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <ProgressSteps>
            <ProgressStep
              label="Information"
              onNext={handleNextInfo}
              errors={InfoError}>
                <Card  containerStyle={styles.cardContainer}>
              {resourcePathProfile ? (
                <TouchableHighlight
                  onPress={profileImage}
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
                  onPress={profileImage}
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
                      uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
                    }}>
                    <Text style={styles.text}>Take a Photo</Text>
                  </ImageBackground>
                </TouchableHighlight>
              )}

              <View style={styles.Inputcontainer}>
                <TextInput
                style={{marginTop:10}}
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
                  style={{marginTop:10}}
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
                  style={{marginTop:10}}
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
                  style={{marginTop:10}}
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
                      style={{marginTop:10}}
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
                <View>
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
                          backgroundColor:"rgba(255,255,355,0.1)",
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
                          backgroundColor:"rgba(255,255,355,0.1)",
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
              </Card>
            </ProgressStep>
            <ProgressStep
              label="Address"
              onNext={handleNextAddress}
              errors={AddressError}>
                  <Card  containerStyle={styles.cardContainer}>
                <Picker
                  selectedValue={nationality}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleNationality(itemValue)
                  }>
                  <Picker.Item label="Select Nationality" />
                  {nationality_reducers.map((card) => (
                    <Picker.Item
                      key={card.nationality}
                      label={card.country}
                      value={card.nationality}
                    />
                  ))}
                </Picker>
                <Picker
                  selectedValue={region}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleRegionChange(itemValue)
                  }>
                  <Picker.Item label="Select Region" value="region" />
                  {region_reducers.map((card) => (
                    <Picker.Item
                      key={card.regioncode}
                      label={card.regiondesc}
                      value={card.regioncode}
                    />
                  ))}
                </Picker>
                <Picker
                  selectedValue={province}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleProvinceChange(itemValue)
                  }>
                  <Picker.Item label="Select Province" value="province" />
                  {province_reducers?.map((card) => (
                    <Picker.Item
                      key={card.provincecode}
                      label={card.provincedesc}
                      value={card.provincecode}
                    />
                  ))}
                </Picker>
                <Picker
                  selectedValue={city}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleCityChange(itemValue)
                  }>
                  <Picker.Item label="Select City" value="city" />
                  {city_reducers.map((card) => (
                    <Picker.Item
                      key={card.citymuncode}
                      label={card.citymundesc}
                      value={card.citymuncode}
                    />
                  ))}
                </Picker>
                <Picker
                  selectedValue={barangay}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleBarangayChange(itemValue)
                  }>
                  <Picker.Item label="Select Barangay" value="barangay" />
                  {barangay_reducers.map((card) => (
                    <Picker.Item
                      key={card.barangaycode}
                      label={card.barangaydesc}
                      value={card.barangaycode}
                    />
                  ))}
                </Picker>
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
            </Card>
            </ProgressStep>
            <ProgressStep
              label="Credentials"
              onSubmit={handleSubmitCredentials}>
            <Card  containerStyle={styles.cardContainer}>
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
            
                <TextInput
              
                  render={props =>
                    <TextInputMask
                    {...props}
  type={'cel-phone'}
  options={{
    maskType: 'INTERNATIONAL',
    dddMask: '(63) '
  }}
  value={mobile}
  onChangeText={text => 
    setmobile(text)
  }
  ref={unmaskedmobile}
/>
                    }
                    mode="flat"
                  
                />
            
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
                {/* <Input
                  style={styles.textInput}
                  placeholder="Username"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  errorMessage={errorUsernameMessage}
                  onChangeText={(text) => handleUsernameExist(text)}
                  defaultValue={username}
                /> */}
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
                    {/* <Input
                      style={styles.textInput}
                      placeholder="Password"
                      inputContainerStyle={styles.inputContainer}
                      inputStyle={styles.inputText}
                      secureTextEntry={showpass}
                      errorMessage={errorMessage}
                      onChangeText={(text) => handlePassword(text)}
                      defaultValue={password}
                    /> */}
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
                    {/* <Input
                      style={styles.textInput}
                      placeholder="Confirm Password"
                      inputContainerStyle={styles.inputContainer}
                      inputStyle={styles.inputText}
                      errorMessage={errorMessage}
                      secureTextEntry={showconfirmpass}
                      onChangeText={(text) => handleConfirmPassword(text)}
                      defaultValue={confirmpassword}
                    /> */}
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
                {/* <Input
                  style={styles.textInput}
                  placeholder="PIN"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  errorMessage={PINErrorMessage}
                  onChangeText={(text) => handlePIN(text)}
                  defaultValue={pin}
                /> */}
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
        
                </Card>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </View>
    
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    width: '100%',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fafafaa0',
  },
  cardContainer:{
    flex:1,
    backgroundColor:"rgba(255,255,355,0.4)",
    width:"93%",
    height:"100%",
    borderColor:"rgba(255,255,355,0.4)",
    borderWidth:0.1,
    borderRadius:30
  },
  avatar: {
    width: 180,
    height: 180,
    borderColor: 'white',
    alignSelf: 'center',
    resizeMode: 'cover',
    flex: 1,
  },
  PickerContainer: {
    flex: 1,
    width: '100%',
    padding: 30,
    height: 70,
  },
  Inputcontainer: {
    flex: 1,
    width: '100%',
  },
  imagecontainer: {
    flex: 1,
    padding: 30,
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUp;
