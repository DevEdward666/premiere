import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {
  action_GET_barangay,
  action_GET_city,
  action_GET_civilstatus,
  action_GET_nationality,
  action_GET_procedure,
  action_GET_province,
  action_GET_region,
  action_GET_religion,
} from '../Services/Actions/Default_Actions';
import {
  action_POST_appointment,
  action_POST_appointment_others,
} from '../Services/Actions/Diagnostic_Actions';
const Diagnostics = () => {
  const [firstname, setfirstname] = useState('');
  const [middlename, setmiddlename] = useState('');
  const [lastname, setlastname] = useState('');
  const [gender, setgender] = useState('');
  const [civilstatus, setCivilStatus] = useState('');
  const [religion, setreligion] = useState('');
  const [suffix, setSuffix] = useState('');
  const [prefix, setPrefix] = useState('');
  const [mobile, setmobile] = useState('63');
  const [email, setemail] = useState('');
  const [birthdate, setbirthdate] = useState('');
  const [reasons, setreasons] = useState('');
  const [zipcode, setzipcode] = useState('');
  const [nationality, setnationality] = useState('');
  const [city, setcity] = useState('');
  const [region, setregion] = useState('');
  const [province, setprovince] = useState('');
  const [barangay, setbarangay] = useState('');
  const [fulladdress, setfulladdress] = useState('');
  const [fulladdress2, setfulladdress2] = useState('');
  const [selectedprocedure, setselectedprocedure] = useState(['']);
  const [selectedprocedurecode, setselectedprocedurecode] = useState([]);
  const [selectedprocedurecost, setselectedprocedurecost] = useState(['']);
  const [appointment, setappointment] = useState();
  const [appointmentprocedure, setappointmentprocedure] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
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

    //console.log(year + '-' + month + '-' + day);
  };
  const getprem_id = async () => {
    try {
      const prem_id = await AsyncStorage.getItem('prem_id');

      if (prem_id !== null) {
        setpremid(prem_id);
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
  const procedure_reducers = useSelector(
    (state) => state.Default_Reducers.procedures,
  );
  const SignUp_Reducers = useSelector((state) => state.SignUp_Reducers);
  const diagnostics_loader = useSelector(
    (state) => state.Diagnostic_Reducers.loading,
  );
  const diagnostics_message = useSelector((state) => state.Diagnostic_Reducers);
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
  const [isEnabled, setIsEnabled] = useState(false);
  const [itemState, setitemState] = useState(selectedprocedure);
  const [found, setFound] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const handleRegionChange = (pickregion) => {
    setregion(pickregion);
    setprovince('');
    setcity('');
    setbarangay('');
    dispatch(action_GET_province(pickregion));
  };
  const handleProcedureChange = (pickprocedure) => {
    if (found === false) {
      setselectedprocedure((prev) => [
        ...prev,
        {desc: pickprocedure.desc, price: pickprocedure.price},
      ]);
      setitemState((prev) => [
        ...prev,
        {desc: pickprocedure.desc, price: pickprocedure.price},
      ]);
      setselectedprocedurecode((prev) => [
        ...prev,
        {
          premid: premid.toString(),
          reason: reasons.toString(),
          proccode: pickprocedure?.code.toString(),
          proccost: pickprocedure?.price.toString(),
        },
      ]);
      setselectedprocedurecost([{price: pickprocedure.price}]);
    } else {
      alert('Item Already in List');
    }
  };
  const handleSubmitAppointment = useCallback(() => {
    setSpinner(true);
    dispatch(action_POST_appointment(premid, 'test', selectedprocedurecode));

    setSpinner(false);
    {
      diagnostics_loader ? Actions.prompt() : alert('Something Went Wrong');
    }
  }, [dispatch, , premid, selectedprocedurecode]);

  const handleProvinceChange = (pickprovince) => {
    setprovince(pickprovince);
    dispatch(action_GET_city(region, pickprovince));
  };
  const handleCityChange = (pickcity) => {
    setcity(pickcity);
    dispatch(action_GET_barangay(region, province, pickcity));
  };
  const handleCivilStatus = (pickstatus) => {
    setCivilStatus(pickstatus);
  };
  const handleReligion = (pickreligion) => {
    setreligion(pickreligion);
  };
  const handleBarangayChange = (pickBarangay) => {
    setbarangay(pickBarangay);
  };
  const handleNationality = (pickNationality) => {
    setnationality(pickNationality);
  };

  useEffect(() => {
    getprem_id();
    if (SignUp_Reducers.username?.username == username) {
      setErrorMessageUsername('Username Already Exists');
      setstepError(true);
    } else {
      setErrorMessageUsername('');
      setstepError(false);
    }
  }, [username, SignUp_Reducers]);
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
    } else {
      setInfoError(false);
    }
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

  const handleSubmitCredentials = useCallback(() => {
    console.log(diagnostics_message);
    if (stepError == false) {
      dispatch(
        action_POST_appointment_others(
          premid,
          prefix,
          firstname,
          middlename,
          lastname,
          suffix,
          gender,
          civilstatus,
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
          zipcode,
          reasons,
          selectedprocedurecode,
        ),
      );
      alert('The Diagnostic Appointment Added sucessfully.');

      // setTimeout(() => {
      //   Actions.diagnostics();
      // }, 1000);
    } else {
      alert('Please Provide Valid Data');
    }
  }, [
    premid,
    prefix,
    firstname,
    middlename,
    lastname,
    suffix,
    gender,
    civilstatus,
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
    zipcode,
    reasons,
    selectedprocedurecode,
  ]);
  useEffect(() => {
    dispatch(action_GET_region());
    dispatch(action_GET_nationality());
    dispatch(action_GET_civilstatus());
    dispatch(action_GET_religion());
    dispatch(action_GET_procedure());
  }, [dispatch]);
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}></Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.desc} />;

  const Flatlists = () => {
    return (
      <SafeAreaView>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <FlatList
          style={{height: 200, maxHeight: 400}}
          data={itemState}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onLongPress={() => {
                // Note that here you can use any function to remove the element at index from the itemState list
                const _itemState = itemState.filter(
                  (_item, _index) => _index !== index,
                );
                setitemState(_itemState);
                setselectedprocedure(_itemState);
              }}>
              <Text style={styles.flatlistitem}>
                {item.desc} : Php {item.price}.00
              </Text>
            </TouchableOpacity>
          )}
        />
        {isEnabled ? (
          <View style={{width: '100%', padding: 20}}>
            <Button
              style={{borderRadius: 30}}
              onPress={() => handleSubmitAppointment()}
              title="Submit Appointment"
            />
          </View>
        ) : null}
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.Inputcontainer}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'stretch',
            height: 30 + '%',
          }}>
          <View style={{width: 80 + '%', height: 40}}>
            <Text>Use My Personal Information</Text>
          </View>
          <View style={{width: 5 + '%', height: 40}}>
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
        <View style={styles.Inputcontainer}>
          <Picker
            selectedValue={city}
            style={styles.PickerContainer}
            onValueChange={(itemValue, itemIndex) =>
              handleProcedureChange(itemValue)
            }>
            <Picker.Item label="Select Procedure" value="null" />
            {procedure_reducers.map((card) => (
              <Picker.Item
                key={card.proccode}
                label={card.procdesc}
                value={{
                  code: card.proccode,
                  desc: card.procdesc,
                  price: card.regprice,
                }}
              />
            ))}
          </Picker>
          <Flatlists />
        </View>
      ) : (
        <ProgressSteps>
          <ProgressStep
            label="Information"
            onNext={handleNextInfo}
            errors={InfoError}>
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
              <Input
                style={styles.textInput}
                placeholder="Prefix"
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
                onChangeText={(text) => setPrefix(text)}
                defaultValue={prefix}
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
                  selectedValue={civilstatus}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleCivilStatus(itemValue)
                  }>
                  <Picker.Item label="Civil Status" value="Civil Status" />
                  {civil_status_reducers.map((cs) => (
                    <Picker.Item
                      key={cs?.cskey}
                      label={cs?.csdesc}
                      value={cs?.cskey}
                    />
                  ))}
                </Picker>
              </View>
              <View>
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
                      label={card.nationality}
                      value={card.nationality}
                    />
                  ))}
                </Picker>
              </View>
              <View>
                <Picker
                  selectedValue={religion}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleReligion(itemValue)
                  }>
                  <Picker.Item label="Religion" value="Religion" />
                  {religion_reducers.map((cs) => (
                    <Picker.Item
                      key={cs?.religion}
                      label={cs?.description}
                      value={cs?.religion}
                    />
                  ))}
                </Picker>
              </View>
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
              <Input
                style={styles.textInput}
                multiline
                numberOfLines={5}
                maxLength={100}
                placeholder="Reason for Requisition"
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
                onChangeText={(text) => setreasons(text)}
                defaultValue={reasons}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            label="Contact Details"
            onNext={handleNextAddress}
            errors={AddressError}>
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
                placeholder="Address 1"
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
                onChangeText={(text) => setfulladdress(text)}
                defaultValue={fulladdress}
              />
              <Input
                style={styles.textInput}
                placeholder="Address 2"
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
                onChangeText={(text) => setfulladdress2(text)}
                defaultValue={fulladdress2}
              />
              <Input
                style={styles.textInput}
                placeholder="Zipcode"
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
                onChangeText={(text) => setzipcode(text)}
                defaultValue={zipcode}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Laboratory Request"
            onSubmit={() => handleSubmitCredentials()}>
            <View style={styles.Inputcontainer}>
              <Picker
                style={styles.PickerContainer}
                onValueChange={(itemValue, itemIndex) =>
                  handleProcedureChange(itemValue)
                }>
                <Picker.Item label="Select Procedure" value="null" />
                {procedure_reducers.map((card) => (
                  <Picker.Item
                    key={card.proccode}
                    label={card.procdesc}
                    value={{
                      code: card.proccode,
                      desc: card.procdesc,
                      price: card.regprice,
                    }}
                  />
                ))}
              </Picker>
              <Flatlists />
            </View>
          </ProgressStep>
        </ProgressSteps>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 30 + '%',
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
  //   textInput: {
  //     borderWidth: 1, // size/width of the border
  //     borderColor: 'lightgrey', // color of the border
  //     paddingLeft: 10,
  //     height: 75,
  //   },
  avatar: {
    width: 180,
    height: 180,
    borderColor: 'white',
    alignSelf: 'center',
    resizeMode: 'cover',
    flex: 1,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  PickerContainer: {
    flex: 1,
    width: '100%',
    padding: 30,
    height: 70,
  },
  Inputcontainer: {
    flex: 0.1,
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
  flatlistcontainer: {
    paddingTop: 22,
  },
  flatlistitem: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 14,
    height: 80,
  },
});

export default Diagnostics;
