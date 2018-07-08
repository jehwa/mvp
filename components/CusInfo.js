import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Button, TextInput } from 'react-native';
import Search from './Search';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export default class CusInfo extends Component { 
  constructor(props, context) {
    super(props, context);
    // this.state = {

    // }
  }
  render() {
    return(
      <View style={styles.container}>
        <Text>
          hi
          {this.props.shopId}, {this.props.customerId}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // marginTop: 100
    justifyContent: 'center',
  },
});
