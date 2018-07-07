import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';


export default class Search extends Component { 
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
    <View style={styles.container}>
      <Text> second page </Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});