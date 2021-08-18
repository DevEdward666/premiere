import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import React, {useCallback, useEffect, useState} from 'react';
import {
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
  ImageBackground,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput} from 'react-native-paper';
import {Input, Button} from 'react-native-elements';
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
} from '../../Services/Actions/Default_Actions';
import {
  action_POST_appointment,
  action_POST_appointment_others,
} from '../../Services/Actions/Diagnostic_Actions';
import styles from './styles';
import {Card} from 'react-native-elements';
import CustomList from '../../Plugins/CustomProcedureList/CustomList';
import CustomListFooter from '../../Plugins/CustomProcedureFooter/CustomListFooter';
const Diagnostics = () => {
  const [firstname, setfirstname] = useState('');
  const [middlename, setmiddlename] = useState('');
  const [lastname, setlastname] = useState('');
  const [gender, setgender] = useState('');
  const [civilstatus, setCivilStatus] = useState('');
  const [civilstatuslabel, setCivilStatuslabel] = useState('');
  const [civilstatusvalue, setCivilStatusvalue] = useState('');
  const [subtotal, setsubtotal] = useState(0);
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
  const [citylabel, setcitylabel] = useState('');
  const [cityvalue, setcityvalue] = useState('');

  const [region, setregion] = useState('');
  const [province, setprovince] = useState('');
  const [provincelabel, setprovincelabel] = useState('');
  const [provincevalue, setprovincevalue] = useState('');

  const [barangay, setbarangay] = useState('');
  const [barangaylabel, setbarangaylabel] = useState('');
  const [barangayvalue, setbarangayvalue] = useState('');

  const [psgc, setpsgc] = useState('');
  const [totalrequest, settotalrequest] = useState(0);

  const [fulladdress, setfulladdress] = useState('');
  const [fulladdress2, setfulladdress2] = useState('');
  const [selectedprocedure, setselectedprocedure] = useState([]);
  const [selectedprocedurecode, setselectedprocedurecode] = useState([]);
  const [selectedprocedurecost, setselectedprocedurecost] = useState([]);
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
  // const isEnabled = useSelector(
  //   (state) => state.Diagnostic_Reducers.isEnabled,
  // );
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

  const [items, setItems] = useState([]);
  const diagnostics_message = useSelector((state) => state.Diagnostic_Reducers);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorUsernameMessage, setErrorMessageUsername] = useState('');
  const [emailErrorMessage, setemailErrorMessage] = useState(false);
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
  const [open_dropdown, setopen_dropdown] = useState(false);
  const [itemState, setitemState] = useState([]);
  // const [found, setFound] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const toggleSwitch = () => {
    let mounted = true;
    if (mounted) {
      setIsEnabled((previousState) => !previousState);
    }
    return () => {
      mounted = false;
    };
  };
  const handleRegionChange = (pickregion) => {
    let mounted = true;
    if (mounted) {
      setregion(pickregion);
      setprovince('');
      setcity('');
      setbarangay('');
      dispatch(action_GET_province(pickregion));
    }
    return () => {
      mounted = false;
    };
  };
  const handleDeletedItems = useCallback(
    async (index) => {
      const _itemState = itemState.filter((_item, _index) => _index !== index);
      const _selectedprocedure = selectedprocedure.filter(
        (_item, _index) => _index !== index,
      );
      const _selectedprocedurecode = selectedprocedurecode.filter(
        (_item, _index) => _index !== index,
      );
      await setselectedprocedurecode(_selectedprocedurecode);
      await setselectedprocedure(_selectedprocedure);
      await setitemState(_itemState);
    },

    [itemState, selectedprocedure, selectedprocedurecode],
  );
  const handleProcedureChange = useCallback(
    (pickprocedure) => {
      let found = false;
      {
        selectedprocedurecode.map((item) => {
          if (item.proccode === pickprocedure?.code.toString()) {
            found = true;
          }
        });
      }
      if (!found) {
        setselectedprocedure((prev) => [
          ...prev,
          {desc: pickprocedure.desc, price: pickprocedure.price},
        ]);
        settotalrequest((prev) => prev + parseInt(pickprocedure.price));
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
            procdesc: pickprocedure?.desc.toString(),
            proccost: pickprocedure?.price.toString(),
          },
        ]);
        setselectedprocedurecost([{price: pickprocedure.price}]);
      } else {
        alert('Item Already in List');
      }
    },
    [selectedprocedurecode],
  );
  const handleSubmitAppointment = useCallback(async () => {
    let mounted = true;
    if (mounted) {
      setSpinner(true);
      dispatch(
        action_POST_appointment(
          premid,
          reasons,
          totalrequest.toFixed(2),
          selectedprocedurecode,
        ),
      );

      setSpinner(false);
      {
        await alert('The Diagnostic Appointment Added sucessfully.');
      }
      await Actions.diagnostics();
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, premid, selectedprocedurecode]);

  const handleProvinceChange = (pickprovince) => {
    let mounted = true;
    let value = pickprovince.split('|');
    if (mounted) {
      setprovince(pickprovince);
      setprovincelabel(value[0]);
      setprovincevalue(value[1]);
      dispatch(action_GET_city(region, value[1]));
    }
    return () => {
      mounted = false;
    };
  };
  const handleCityChange = (pickcity) => {
    let mounted = true;
    let value = pickcity.split('|');
    if (mounted) {
      setcity(pickcity);
      setcitylabel(value[0]);
      setcityvalue(value[1]);
      dispatch(action_GET_barangay(region, provincevalue, value[1]));
    }
    return () => {
      mounted = false;
    };
  };
  const handleCivilStatus = (pickstatus) => {
    let mounted = true;
    let value = pickstatus.split('|');
    if (mounted) {
      setCivilStatus(pickstatus);
      setCivilStatuslabel(value[0]);
      setCivilStatusvalue(value[1]);
    }
    return () => {
      mounted = false;
    };
  };
  const handleReligion = (pickreligion) => {
    let mounted = true;
    if (mounted) {
      setreligion(pickreligion);
    }
    return () => {
      mounted = false;
    };
  };
  const handleBarangayChange = (pickBarangay) => {
    let mounted = true;
    let value = pickBarangay.split('|');
    if (mounted) {
      setbarangay(pickBarangay);
      setbarangaylabel(value[0]);
      setbarangayvalue(value[1]);
      setpsgc(value[0] + ',' + citylabel + ',' + provincelabel);
    }
    return () => {
      mounted = false;
    };
  };
  const handleNationality = (pickNationality) => {
    let mounted = true;
    if (mounted) {
      setnationality(pickNationality);
    }
    return () => {
      mounted = false;
    };
  };

  useEffect(() => {
    let mounted = true;
    const dropdownitems = () => {
      if (mounted) {
        const procedureNames = procedure_reducers.map((item) => ({
          code: item.proccode,
          desc: item.procdesc,
          id: item.proccode,
          name: item.procdesc,
          price: item.regprice,
        }));
        setItems(procedureNames);
      }
    };

    mounted && dropdownitems();
    return () => {
      mounted = false;
    };
  }, [procedure_reducers]);
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
  const handleNextInfo = () => {
    let mounted = true;
    if (mounted) {
      if (
        firstname == '' ||
        lastname == '' ||
        gender == '' ||
        birthdate == ''
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
  };

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
          psgc,
          totalrequest.toFixed(2),
          zipcode,
          reasons,
          selectedprocedurecode,
        ),
      );
      await alert('The Diagnostic Appointment Added sucessfully.');
      await Actions.diagnostics();
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
    reasons,
    selectedprocedurecode,
  ]);
  useEffect(() => {
    let mounted = true;
    const getdefaults = () => {
      dispatch(action_GET_region());
      dispatch(action_GET_nationality());
      dispatch(action_GET_civilstatus());
      dispatch(action_GET_religion());
      dispatch(action_GET_procedure());
    };

    mounted && getdefaults();
    return () => (mounted = false);
  }, [dispatch]);
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}></Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.desc} />;
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
  const CustomFlatlists = () => {
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onLongPress={() => {
                handleDeletedItems(index);
                // Note that here you can use any function to remove the element at index from the itemState list
              }}>
              <CustomList price={item?.price} desc={item?.desc} />
            </TouchableOpacity>
          )}
        />
        <CustomListFooter customsubtotal={subtotal} />
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView style={styles.maincontainer}>
      <View style={styles.Inputcontainer}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'stretch',
            height: '5%',
          }}>
          <View style={{width: 70 + '%', height: 20}}>
            <Text>Use My Personal Information</Text>
          </View>
          <View style={{width: 5 + '%', height: 20}}>
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
        <Card containerStyle={styles.plate}>
          <SearchableDropdown
            onItemSelect={(itemValue) => {
              handleProcedureChange(itemValue);
            }}
            label="Search Procedure"
            placeholder="Search Procedure"
            itemTextStyle={{color: 'black'}}
            style={styles.PickerContainer}
            itemsContainerStyle={{maxHeight: 140}}
            items={items}
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
              placeholder: 'Search Procedure',
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
          <CustomFlatlists />

          {isEnabled ? (
            <View style={{width: '100%'}}>
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
                containerStyle={{borderRadius: 15}}
                style={{padding: 10, marginBottom: 30, marginTop: 10}}
                mode="flat"
                label="Reason for Requisition"
                onChangeText={(text) => setreasons(text)}
                value={reasons}
              />
              <Button
                containerStyle={{borderRadius: 10}}
                onPress={() => handleSubmitAppointment()}
                title="Submit Appointment"
              />
            </View>
          ) : null}
        </Card>
      ) : (
        <ProgressSteps style={styles.plate}>
          <ProgressStep
            label="Information"
            onNext={handleNextInfo}
            errors={InfoError}>
            <Card containerStyle={styles.plate}>
              <View style={styles.Inputcontainer}>
                <TextInput
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

                <TextInput
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
                        value={cs?.csdesc + '|' + cs?.cskey}
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
                  label="Reason for Requisition"
                  onChangeText={(text) => setreasons(text)}
                  value={reasons}
                />
              </View>
            </Card>
          </ProgressStep>

          <ProgressStep
            label="Contact Details"
            onNext={handleNextAddress}
            errors={AddressError}>
            <Card containerStyle={styles.plate}>
              <View style={styles.Inputcontainer}>
                <TextInput
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
                      value={card.provincedesc + '|' + card.provincecode}
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
                      value={card.citymundesc + '|' + card.citymuncode}
                    />
                  ))}
                </Picker>
                <Picker
                  selectedValue={barangay}
                  style={styles.PickerContainer}
                  onValueChange={(itemValue, itemIndex) =>
                    handleBarangayChange(itemValue, itemIndex)
                  }>
                  <Picker.Item label="Select Barangay" value="barangay" />
                  {barangay_reducers.map((card) => (
                    <Picker.Item
                      key={card.barangaycode}
                      label={card.barangaydesc}
                      value={card.barangaydesc + '|' + card.barangaycode}
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
                  onChangeText={(text) => setfulladdress(text)}
                  label="Address 1"
                  value={fulladdress}
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
                  onChangeText={(text) => setfulladdress2(text)}
                  label="Address 2"
                  value={fulladdress2}
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
                  onChangeText={(text) => setzipcode(text)}
                  label="Zipcode"
                  value={zipcode}
                />
              </View>
            </Card>
          </ProgressStep>
          <ProgressStep
            scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}
            label="Laboratory Request"
            onSubmit={() => handleSubmitCredentials()}>
            <Card containerStyle={styles.plate}>
              <SearchableDropdown
                onItemSelect={(itemValue) => {
                  handleProcedureChange(itemValue);
                }}
                label="Search Procedure"
                placeholder="Search Procedure"
                itemTextStyle={{color: 'black'}}
                style={styles.PickerContainer}
                itemsContainerStyle={{maxHeight: 140}}
                items={items}
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
                  placeholder: 'Search Procedure',
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
              <CustomFlatlists />
            </Card>
          </ProgressStep>
        </ProgressSteps>
      )}
    </SafeAreaView>
  );
};

export default Diagnostics;
