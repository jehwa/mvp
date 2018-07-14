import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigatorIOS, Text, TouchableHighlight, View } from 'react-native';
import Login from './src/components/Login';
import { Provider } from 'react-redux';
import store from './src/store/store';


export default class NavigatorIOSApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigatorIOS
          initialRoute={{
            component: Login,
            title: 'Login Page'
          }}
          style={{flex: 1}}
        />
      </Provider>
    );
  }
}

