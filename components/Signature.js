import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem, SearchBar, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
// import SignaturePad from 'react-native-signature-pad';

const Signature = (props) => {
  return (
    <View>

      <Text>
        {props.packageInfo.service}
        {props.packageInfo.purchase_date}
        {props.packageInfo.total_count}
        {props.packageInfo.remaining_count}

      </Text>
      {/* <SignaturePad 
        style={{backgroundColor: 'red'}}
      /> */}
    </View>
  )
}

export default Signature;