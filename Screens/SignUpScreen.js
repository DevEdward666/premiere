import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
import React, {useEffect, useState, useCallback} from 'react';
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
import CardView from 'react-native-rn-cardview';
import {Icon} from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import {Input} from 'react-native-elements';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {useDispatch, useSelector} from 'react-redux';
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

  const [errorMessage, setErrorMessage] = useState('');
  const [errorUsernameMessage, setErrorMessageUsername] = useState('');
  const [emailErrorMessage, setemailErrorMessage] = useState('');
  const [mobileErrorMessage, setmobileErrorMessage] = useState('');
  const [InfoError, setInfoError] = useState(false);
  const [AddressError, setAddressError] = useState(false);
  const [resourcePath, setresourcePath] = useState(null);
  const [resourcePathProfile, setresourcePathProfile] = useState(null);
  const [imageresponse, setimageresponse] = useState(null);
  const [profileimageresponse, setprofileimageresponse] = useState(null);
  const [showpass, setshowpass] = useState(false);
  const [iconpass, seticonpass] = useState(false);
  const [showconfirmpass, setshowconfirmpass] = useState(false);
  const [iconconfirmpass, seticonconfirmpass] = useState(false);
  const [stepError, setstepError] = useState(false);
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
    if (SignUp_Reducers.username?.username == username) {
      setErrorMessageUsername('Username Already Exists');
      setstepError(true);
    } else {
      setErrorMessageUsername('');
      setstepError(false);
    }
  }, [username, SignUp_Reducers]);
  const handlePassword = (password) => {
    setPassword(password);
    if (password != confirmpassword) {
      setErrorMessage('Password mismatch');
      setstepError(true);
    } else {
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (reg.test(password) === false) {
        setErrorMessage(
          'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:',
        );
      } else {
        setmobileErrorMessage();
        setstepError(false);
        setErrorMessage('');
      }
    }
  };
  const showpassword = () => {
    if (showpass == true) {
      setshowpass(false);
      seticonpass(true);
    } else {
      setshowpass(false);
      seticonpass(true);
    }
  };
  const showconfirmpassword = () => {
    if (showconfirmpass == true) {
      setshowconfirmpass(false);
      seticonconfirmpass(true);
    } else {
      setshowconfirmpass(false);
      seticonconfirmpass(true);
    }
  };
  const handleConfirmPassword = (confirmpassword) => {
    setPassword(password);
    if (password != confirmpassword) {
      setErrorMessage('Password mismatch');
      setstepError(true);
    } else {
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (reg.test(password) === false) {
        setErrorMessage(
          'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:',
        );
      } else {
        setmobileErrorMessage();
        setstepError(false);
        setErrorMessage('');
      }
    }
  };
  const handleNextInfo = () => {
    if (
      firstname == '' ||
      middlename == '' ||
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
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setemailErrorMessage('Email is Not valid');
    } else {
      setemailErrorMessage();
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
          mobile,
          email,
          username,
          password,
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
    dispatch(action_GET_region());
    dispatch(action_GET_nationality());
  }, [dispatch]);

  return (
    <ScrollView style={{backgroundScrollViewColor: 'white'}}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <ProgressSteps>
            <ProgressStep
              label="Information"
              onNext={handleNextInfo}
              errors={InfoError}>
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
                <Input
                  style={styles.textInput}
                  placeholder="First name"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => setfirstname(text)}
                  defaultValue={firstname}
                />
                <Input
                  style={styles.textInput}
                  placeholder="Middle name"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => setmiddlename(text)}
                  defaultValue={middlename}
                />
                <Input
                  style={styles.textInput}
                  placeholder="Last name"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => setlastname(text)}
                  defaultValue={lastname}
                />
                <Input
                  style={styles.textInput}
                  placeholder="Suffix"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => setSuffix(text)}
                  defaultValue={suffix}
                />

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      width: '85%',
                      height: '100%',
                    }}>
                    <Input
                      style={styles.textInput}
                      placeholder="Birthdate"
                      inputContainerStyle={styles.inputContainer}
                      inputStyle={styles.inputText}
                      defaultValue={birthdate}
                    />
                  </View>
                  <View
                    style={{
                      width: '15%',
                      height: '100%',
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
                      onPress={showDatepicker}>
                      <Image
                        style={{
                          height: 40,
                          width: '100%',
                          resizeMode: 'center',
                          alignContent: 'flex-start',
                        }}
                        source={require('../assets/icons/ic_calendar_prem-playstore.png')}
                      />
                    </TouchableHighlight>
                    {/* <Button
                      onPress={showDatepicker}
                      title="Birthdate"
                      style={{borderRadius: 30}}
                    /> */}
                  </View>
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
                      underlayColor="white">
                      <ImageBackground
                        style={{
                          width: '100%',
                          height: 220,
                          resizeMode: 'contain',
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
                      underlayColor="white">
                      <ImageBackground
                        style={{
                          width: '100%',
                          height: 220,
                          resizeMode: 'contain',
                          alignContent: 'flex-start',
                        }}
                        source={require('../assets/icons/valid_id.jpg')}>
                        <Text style={styles.text}>Capture Valid ID</Text>
                      </ImageBackground>
                    </TouchableHighlight>
                  )}
                  {/* <Button
                  title="Capture Identification Card"
                 
                /> */}
                </View>
              </CardView>
            </ProgressStep>
            <ProgressStep
              label="Address"
              onNext={handleNextAddress}
              errors={AddressError}>
              <View style={styles.Inputcontainer}>
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
                <Input
                  style={styles.textInput}
                  placeholder="Street/Lot No./Blk/"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  onChangeText={(text) => setfulladdress(text)}
                  defaultValue={fulladdress}
                />
              </View>
            </ProgressStep>
            <ProgressStep
              label="Credentials"
              onSubmit={handleSubmitCredentials}>
              <View style={styles.Inputcontainer}>
                <Input
                  style={styles.textInput}
                  placeholder="Email"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  errorMessage={emailErrorMessage}
                  onChangeText={(text) => validate(text)}
                  defaultValue={email}
                />
                <Input
                  style={styles.textInput}
                  placeholder="Mobile No."
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  //errorMessage={mobileErrorMessage}
                  onChangeText={(text) => setmobile(text)}
                  defaultValue={mobile}
                />
                <Input
                  style={styles.textInput}
                  placeholder="Username"
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  errorMessage={errorUsernameMessage}
                  onChangeText={(text) => handleUsernameExist(text)}
                  defaultValue={username}
                />
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      width: '85%',
                    }}>
                    <Input
                      style={styles.textInput}
                      placeholder="Password"
                      inputContainerStyle={styles.inputContainer}
                      inputStyle={styles.inputText}
                      secureTextEntry={showpass}
                      errorMessage={errorMessage}
                      onChangeText={(text) => handlePassword(text)}
                      defaultValue={password}
                    />
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
                    <Input
                      style={styles.textInput}
                      placeholder="Confirm Password"
                      inputContainerStyle={styles.inputContainer}
                      inputStyle={styles.inputText}
                      errorMessage={errorMessage}
                      secureTextEntry={showconfirmpass}
                      onChangeText={(text) => handleConfirmPassword(text)}
                      defaultValue={confirmpassword}
                    />
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
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </View>
    </ScrollView>
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
    padding: 30,
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