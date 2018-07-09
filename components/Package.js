import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem, SearchBar, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
// import Package from './Package';


const Package = (props) => {
  return(
        <Text style={styles.container}>
        {props.used ? new Date(props.used.used_date).toLocaleDateString('en-US', {month: 'numeric', day: 'numeric'}) : 'O'}
        </Text>
  )

}

const styles = StyleSheet.create({
  container: {
    width: 40,
  },
});

export default Package;