import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {SafeAreaView, View, Text} from 'react-native';
import {Card} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
const CardHeader = () => {
  const [cardNumber, setcardNumber] = useState();
  const [showMode, setshowMode] = useState(false);
  const [mode, setMode] = useState(false);
  const [cardmonth, setcardmonth] = useState('');
  const [cardyear, setcardyear] = useState('');
  const [cardtype, setcardtype] = useState('');
  const [date, setDate] = useState(new Date());
  const [cardmonthyear, setcardmonthyear] = useState('');
  const _handlingCardNumber = (number) => {
    // if (number.charAt(0) === '5') {
    //   setcardtype('MasterCard');
    // } else if (number.charAt(0) === '4') {
    //   setcardtype('Visa');
    // }
    setcardNumber(
      number
        .replace(/\s?/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim(),
    );
  };
  const ChooseMonthYear = (currentMode) => {
    setshowMode(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    ChooseMonthYear('date');
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setshowMode(Platform.OS === 'ios');
    setDate(currentDate);
    var today = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    setcardmonth(month);
    setcardyear(year);
    if (month <= 9)
      setcardmonthyear('0' + month + '/' + year.toString().substr(-2));
  };
  console.log(cardmonthyear);
  return (
    <Card
      containerStyle={{
        borderRadius: 25,
        height: 250,
        backgroundColor: '#034c81',
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3}}></View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Image
            style={{
              height: 100,
              width: '100%',
              resizeMode: 'center',
              alignContent: 'flex-start',
            }}
            source={require('../assets/icons/mastercard.png')}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 5}}>
          <Text style={{color: 'white'}}>Account Number</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 5}}>
          <TextInput
            style={{color: 'white'}}
            placeholderTextColor="white"
            onChangeText={(text) => _handlingCardNumber(text)}
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
          />
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => showDatepicker()}>
            <TextInput
              style={{color: 'white'}}
              editable={false}
              placeholderTextColor="white"
              placeholder="MM/YY"
              value={cardmonthyear}
            />
          </TouchableOpacity>
          {showMode && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </View>
    </Card>
  );
};
export default CardHeader;
