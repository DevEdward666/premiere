import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons';

const Inputs = (props) => {
  const [isFocused, setisFocused] = useState(false);
  const onFocusChange = () => {
    setisFocused(true);
  };
  return (
    <View
      style={[styles.container, {borderColor: isFocused ? '#0779ef' : '#eee'}]}>
      <Input
        placeholder={props.name}
        //onFocus={onFocusChange}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        secureTextEntry={props.pass}
        // leftIcon={
        //   <Icon
        //     name={props.icon}
        //     size={22}
        //     color={isFocused ? '#0779ef' : 'grey'}
        //   />
        // }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    borderRadius: 100,
    marginVertical: 10,
    borderWidth: 3.5,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: '#0779e4',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Inputs;
