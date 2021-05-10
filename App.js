/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect,useState} from 'react';
import store from './Services/Store';
import Routes from './components/Routes';
import {Provider} from 'react-redux';

const App = () => {
  
  return (

    <Provider store={store}>
      <Routes />
    </Provider>

  );
};

export default App;
