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
import DoneOverlay from '../../Plugins/CustomOverlay/DoneOverlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput} from 'react-native-paper';
import {Input, Button} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {Actions} from 'react-native-router-flux';
import DocumentPicker from 'react-native-document-picker';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
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
  const [procedure, setprocedure] = useState('');
  const [InfoError, setInfoError] = useState(false);
  const [overlayvisible, setoverlayvisible] = useState(false);
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
  const [getpickerregions, setpickerregions] = useState([]);
  const [getpickerbarangay, setpickerbarangay] = useState([]);
  const [getpickerprovince, setpickerprovince] = useState([]);
  const [getpickercity, setpickercity] = useState([]);
  const [getpickernationality, setpickernationality] = useState([]);
  const [getpickercivilstatus, setpickercivilstatus] = useState([]);
  const [getpickerreligion, setpickerreligion] = useState([]);
  const [selecteddocs, setselecteddocs] = useState([]);

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
          if (item.proccode === pickprocedure?.proccode.toString()) {
            found = true;
          }
        });
      }
      if (!found) {
        setselectedprocedure((prev) => [
          ...prev,
          {desc: pickprocedure.procdesc, price: pickprocedure.regprice},
        ]);
        settotalrequest((prev) => prev + parseInt(pickprocedure.regprice));
        setitemState((prev) => [
          ...prev,
          {desc: pickprocedure.procdesc, price: pickprocedure.regprice},
        ]);
        setselectedprocedurecode((prev) => [
          ...prev,
          {
            proccode: pickprocedure?.proccode,
            procdesc: pickprocedure?.procdesc,
            proccost: pickprocedure?.regprice,
          },
        ]);
        setselectedprocedurecost([{price: pickprocedure.regprice}]);
        dispatch(action_GET_procedure(''));
        setprocedure('');
      } else {
        alert('Item Already in List');
      }
    },
    [selectedprocedurecode, dispatch],
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
          selecteddocs,
        ),
      );

      setSpinner(false);
      {
        setoverlayvisible(true);
      }
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, premid, selectedprocedurecode, selecteddocs]);

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
  const handleDone = async () => {
    await setoverlayvisible(false);
    await Actions.diagnostics();
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
          selecteddocs,
        ),
      );
      setoverlayvisible(true);

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
    selecteddocs,
  ]);
  useEffect(() => {
    let mounted = true;
    const getdefaults = () => {
      dispatch(action_GET_region());
      dispatch(action_GET_nationality());
      dispatch(action_GET_civilstatus());
      dispatch(action_GET_religion());
    };

    mounted && getdefaults();
    return () => (mounted = false);
  }, [dispatch]);
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}></Text>
    </View>
  );
  const docPicker = useCallback(async () => {
    // Pick a multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });

      await setselecteddocs(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('error -----', err);
      } else {
        console.log('error -----', err);
        throw err;
      }
      console.log('error -----', err);
    }
  }, []);
  console.log(selecteddocs);
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
  const handleSearchProcedure = useCallback(
    async (text) => {
      dispatch(action_GET_procedure(text));
      await setprocedure(text);
    },
    [dispatch],
  );

  const CustomFlatlists = () => {
    return (
      <SafeAreaView>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
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
          label="Search Procedure"
          onChangeText={(text) => handleSearchProcedure(text)}
          value={procedure}
        />
        <FlatList
          style={{height: 200, maxHeight: 400}}
          data={itemState}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              onLongPress={() => {
                handleDeletedItems(index);
                // Note that here you can use any function to remove the element at index from the itemState list
              }}>
              <CustomList price={item?.price} desc={item?.desc} />
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <View keyboardShouldPersistTaps="Always">
              <FlatList
                style={{height: 200, maxHeight: 200}}
                data={procedure_reducers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleProcedureChange(item)}>
                    <Card>
                      <Text style={{fontSize: 10}}>{item?.procdesc}</Text>
                    </Card>
                  </TouchableOpacity>
                )}
              />
              {/* <SearchableDropdown
                onItemSelect={(itemValue) => handleProcedureChange(itemValue)}
                label="Search Procedure"
                placeholder="Search Procedure"
                itemTextStyle={{color: 'black'}}
                style={styles.PickerContainer}
                itemsContainerStyle={{maxHeight: 140}}
                items={items}
                defaultIndex={0}
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
              /> */}
            </View>
          }
        />
        <CustomListFooter customsubtotal={subtotal} />
      </SafeAreaView>
    );
  };
  // const flatlistHeader = () => (

  // );
  const flatlistFooter = () => (
    <View style={{width: '100%', marginBottom: 100}}>
      <View
        scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}
        style={{
          width: '50%',
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
        <View style={styles.Inputcontainer}>
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
            containerStyle={{borderRadius: 15}}
            style={{padding: 10, marginBottom: 30, marginTop: 10}}
            mode="flat"
            label="Reason for Requisition"
            onChangeText={(text) => setreasons(text)}
            value={reasons}
          />
          <Button
            buttonStyle={{
              backgroundColor: '#0084FF',
              borderRadius: 25,
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
    <SafeAreaView style={styles.maincontainer}>
      <DoneOverlay
        visible={overlayvisible}
        message={`The diagnostic appointment requested sucessfully.`}
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
              trackColor={{false: '#767577', true: '#0084FF'}}
              thumbColor={isEnabled ? '#0084FF' : '#f4f3f4'}
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
          <FlatList
            style={styles.Inputcontainer}
            data={selecteddocs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <Card key={index}>
                <Text key={index}>{item?.name}</Text>
              </Card>
            )}
            ListHeaderComponent={
              <View keyboardShouldPersistTaps="handled">
                <SafeAreaView>
                  <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
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
                    label="Search Procedure"
                    onChangeText={(text) => handleSearchProcedure(text)}
                    value={procedure}
                  />
                  <View keyboardShouldPersistTaps="Always">
                    <FlatList
                      style={{flex: 1}}
                      data={procedure_reducers}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleProcedureChange(item)}>
                          <Card key={index}>
                            <Text style={{fontSize: 10}}>{item?.procdesc}</Text>
                          </Card>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                  <FlatList
                    style={{flex: 1}}
                    data={itemState}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        key={index}
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
              </View>
            }
            ListFooterComponent={
              <View style={{width: '100%', marginBottom: 100}}>
                <View
                  style={{
                    width: '50%',
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
                  <View style={styles.Inputcontainer}>
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
                      containerStyle={{borderRadius: 15}}
                      style={{padding: 10, marginBottom: 30, marginTop: 10}}
                      mode="flat"
                      label="Reason for Requisition"
                      onChangeText={(text) => setreasons(text)}
                      value={reasons}
                    />
                    <Button
                      buttonStyle={{
                        backgroundColor: '#0084FF',
                        borderRadius: 25,
                        width: '70%',
                        alignSelf: 'center',
                      }}
                      onPress={() => handleSubmitAppointment()}
                      title="Submit Appointment"
                    />
                  </View>
                ) : null}
              </View>
            }
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
          labelFontSize={10}
          disabledStepNumColor="black"
          style={styles.plate}>
          <ProgressStep
            scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}
            label="Information"
            nextBtnTextStyle={{
              color: '#0084FF',
              fontSize: 14,
            }}
            onNext={handleNextInfo}
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
                <SearchableDropdown
                  onItemSelect={(itemValue) => {
                    handleCivilStatus(itemValue);
                  }}
                  label="Civil Status"
                  placeholder="Civil Status"
                  itemTextStyle={{color: 'black'}}
                  style={styles.PickerContainer}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={getpickercivilstatus}
                  defaultIndex={2}
                  resetValue={false}
                  itemStyle={styles.PickerContainerSearchable}
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
                  defaultIndex={2}
                  resetValue={false}
                  itemStyle={styles.PickerContainerSearchable}
                  textInputProps={{
                    placeholder: 'Select Nationality',
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
                    handleReligion(itemValue);
                  }}
                  label="Select Religion"
                  placeholder="Select Religion"
                  itemTextStyle={{color: 'black'}}
                  style={styles.PickerContainer}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={getpickerreligion}
                  defaultIndex={2}
                  resetValue={false}
                  itemStyle={styles.PickerContainerSearchable}
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
                  style={styles.PickerContainerSearchable}
                  onValueChange={(itemValue, itemIndex) =>
                    setgender(itemValue)
                  }>
                  <Picker.Item label="Gender" />
                  <Picker.Item label="Male" value="M" />
                  <Picker.Item label="Female" value="F" />
                </Picker>
              </View>
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
                label="Reason for Requisition"
                onChangeText={(text) => setreasons(text)}
                value={reasons}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}
            label="Contact Details"
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
                  defaultIndex={2}
                  resetValue={false}
                  itemStyle={styles.PickerContainerSearchable}
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
                  defaultIndex={2}
                  resetValue={false}
                  itemStyle={styles.PickerContainerSearchable}
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
                  defaultIndex={2}
                  resetValue={false}
                  itemStyle={styles.PickerContainerSearchable}
                  textInputProps={{
                    placeholder: 'Select City',
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
                    handleBarangayChange(itemValue);
                  }}
                  label="Select Barangay"
                  placeholder="Select Barangay"
                  itemTextStyle={{color: 'black'}}
                  style={styles.PickerContainer}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={getpickerbarangay}
                  defaultIndex={2}
                  resetValue={false}
                  itemStyle={styles.PickerContainerSearchable}
                  textInputProps={{
                    placeholder: 'Select Barangay',
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
                label="Address 1"
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
                label="Address 2"
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
                onChangeText={(text) => setzipcode(text)}
                label="Zipcode"
                value={zipcode}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}
            label="Laboratory Request"
            previousBtnTextStyle={{color: '#0084FF', fontSize: 14}}
            nextBtnTextStyle={{
              color: '#0084FF',
              fontSize: 14,
            }}
            onSubmit={() => handleSubmitCredentials()}>
            <View style={styles.Inputcontainer}>
              {/* <SearchableDropdown
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
              /> */}
              <SafeAreaView>
                <Spinner
                  visible={spinner}
                  textContent={'Loading...'}
                  textStyle={styles.spinnerTextStyle}
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
                  label="Search Procedure"
                  onChangeText={(text) => handleSearchProcedure(text)}
                  value={procedure}
                />
                <View keyboardShouldPersistTaps="Always">
                  <FlatList
                    style={{flex: 1}}
                    data={procedure_reducers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleProcedureChange(item)}>
                        <Card key={index}>
                          <Text style={{fontSize: 10}}>{item?.procdesc}</Text>
                        </Card>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <FlatList
                  style={{flex: 1}}
                  data={itemState}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={index}
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

              <FlatList
                style={styles.Inputcontainer}
                data={selecteddocs}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <Card key={index}>
                    <Text key={index}>{item?.name}</Text>
                  </Card>
                )}
                ListHeaderComponent={flatlistFooter}
              />
            </View>
          </ProgressStep>
        </ProgressSteps>
      )}
    </SafeAreaView>
  );
};

export default Diagnostics;
