import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import DoneOverlay from '../../../Plugins/CustomOverlay/DoneOverlay';
import CustomSnackbar from '../../../Plugins/CustomSnackBar/CustomSnackbar';
import {Button} from 'react-native-elements';
import {
  action_GET_barangay,
  action_GET_city,
  action_GET_province,
} from '../../../Services/Actions/Default_Actions';
import {action_passbase_get_single_info} from '../../../Services/Actions/PassbaseActions';
import Spinner from 'react-native-loading-spinner-overlay';
import {action_update_info} from '../../../Services/Actions/SignUp_Actions';
import {Actions} from 'react-native-router-flux';
import styles from './style';
const UpdateAddressUI = () => {
  const dispatch = useDispatch();
  const region_reducers = useSelector((state) => state.Default_Reducers.region);

  const passbase_id = useSelector(
    (state) => state.PassbaseReducers.passbase_id,
  );
  const passbase_data = useSelector(
    (state) => state.PassbaseReducers.passbase_data,
  );
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
  const updateimageinfo = useSelector(
    (state) => state.SignUp_Reducers.updateimageinfo,
  );
  const updateinfo = useSelector((state) => state.SignUp_Reducers.updateinfo);
  const users_reducers = useSelector((state) => state.User_Reducers.userinfo);
  const [spinner, setSpinner] = useState(false);
  const [imageresponse, setimageresponse] = useState(null);
  const [profileimageresponse, setprofileimageresponse] = useState(null);
  const [promptopen, setpromptopen] = useState(false);
  const [prmoptmessage, setprmoptmessage] = useState('');
  const [barangay, setbarangay] = useState('');
  const [barangaylabel, setbarangaylabel] = useState('');
  const [barangayvalue, setbarangayvalue] = useState('');
  const [nationality, setnationality] = useState('');
  const [city, setcity] = useState('');
  const [citylabel, setcitylabel] = useState('');
  const [cityvalue, setcityvalue] = useState('');
  const [psgc, setpsgc] = useState('');
  const [region, setregion] = useState('');
  const [province, setprovince] = useState('');
  const [provincelabel, setprovincelabel] = useState('');
  const [provincevalue, setprovincevalue] = useState('');
  const [fulladdress, setfulladdress] = useState('');
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
  const [overlayvisible, setoverlayvisible] = useState(false);
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
    dispatch,
    religion_reducers,
    civil_status_reducers,
    nationality_reducers,
    city_reducers,
    province_reducers,
    barangay_reducers,
    region_reducers,
  ]);
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
      console.log(pickstatus?.code);
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
    const getsinglepassbaseinfo = () => {
      if (mounted) {
        dispatch(action_passbase_get_single_info(passbase_id));
      }
    };
    mounted && getsinglepassbaseinfo();
    return () => {
      mounted = false;
    };
  }, [dispatch, passbase_id]);
  const NextStep = useCallback(() => {
    if (
      nationality == '' ||
      region == '' ||
      province == '' ||
      city == '' ||
      barangay == '' ||
      civilstatusvalue == ''
    ) {
      setprmoptmessage('Please fill all fields');
      setpromptopen(true);
    } else {
      setpromptopen(false);
      setSpinner(true);

      dispatch(
        action_update_info(
          users_reducers?.username,
          civilstatusvalue,
          region,
          religion,
          nationality,
          city,
          province,
          barangay,
          fulladdress,
          'true',
          passbase_id,
          passbase_data?.status,
        ),
      );
    }
  }, [
    dispatch,
    civilstatusvalue,
    region,
    city,
    province,
    barangay,
    religion,
    nationality,
    fulladdress,
    passbase_id,
    users_reducers?.username,
  ]);
  useEffect(() => {
    let mounted = true;
    const successfullyupdated = () => {
      if (mounted) {
        if (updateinfo?.success) {
          setSpinner(false);
          setoverlayvisible(true);
        } else {
          setSpinner(false);
        }
      }
    };
    mounted && successfullyupdated();
    return () => {
      mounted = false;
    };
  }, [updateinfo?.success, updateinfo?.message]);
  const handleDone = () => {
    Actions.index();
  };
  return (
    <View style={{flex: 1}}>
      <DoneOverlay
        visible={overlayvisible}
        message={`Account updated successfully!. Please be patience while our team validating your details sent to us. Thank You!`}
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
      <ScrollView
        style={styles.Inputcontainer}
        keyboardShouldPersistTaps="always">
        <CustomSnackbar message={prmoptmessage} open={promptopen} />
        <Text style={styles.TextAddressSubtitle}>
          Update your contact address
        </Text>
        <View style={styles.cardContainer}>
          <SearchableDropdown
            onItemSelect={(itemValue) => {
              handleCivilStatus(itemValue);
            }}
            label="Civil Status"
            placeholder="Civil Status"
            itemTextStyle={{color: 'black'}}
            containerStyle={styles.PickerContainer}
            itemsContainerStyle={{maxHeight: 500}}
            items={getpickercivilstatus}
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
        <View style={styles.cardContainer}>
          <SearchableDropdown
            onItemSelect={(itemValue) => {
              handleNationality(itemValue);
            }}
            label="Select Nationality"
            placeholder="Select Nationality"
            itemTextStyle={{color: 'black'}}
            containerStyle={styles.PickerContainer}
            itemsContainerStyle={{maxHeight: 500}}
            items={getpickernationality}
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
            itemsContainerStyle={{maxHeight: 500}}
            items={getpickerreligion}
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
            itemsContainerStyle={{maxHeight: 500}}
            items={getpickerregions}
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
            itemsContainerStyle={{maxHeight: 500}}
            items={getpickerprovince}
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
            itemsContainerStyle={{maxHeight: 500}}
            items={getpickercity}
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
            itemsContainerStyle={{maxHeight: 500}}
            items={getpickerbarangay}
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
            multiline={true}
            numberOfLines={5}
            maxLength={100}
            mode="flat"
            label="Street/Lot No./Blk/"
            onChangeText={(text) => setfulladdress(text)}
            value={fulladdress}
          />
        </View>
        <TouchableHighlight
          style={styles.login}
          underlayColor="rgba(62, 178, 250, 0.5)"
          onPress={() => NextStep()}>
          <Text style={styles.submitText}>Next</Text>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
};
export default UpdateAddressUI;
