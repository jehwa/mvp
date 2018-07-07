import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, ScrollView } from 'react-native';
import Search from './Search';

export default class Login extends Component { 
  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    this.props.navigator.push({
      component: Search,
      title: 'Search Customer'
    })

  }
  render() {
    return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text onPress={this._onForward}> first page </Text>
    </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
});