import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem, SearchBar, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
// import Package from './Package';
import SvgUri from 'react-native-svg-uri';


const Package = (props) => {
  return(
        <Text style={styles.container}>
        {props.used ? new Date(props.used.used_date).toLocaleDateString('en-US', {month: 'numeric', day: 'numeric'}) : <SvgUri width="48" height="48" alignItems="center" source={require('../../image/available.svg')} />}
        </Text>
  )

}

const styles = StyleSheet.create({
  container: {
    width: 40,
    fontSize: 18
  },
});

export default Package;