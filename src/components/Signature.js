import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { List, ListItem, SearchBar, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'

export default class Signature extends Component { 
  constructor(props, context) {
    super(props, context);
    this.state = {
      signature: null
    }
  }


  // <FormInput 
  // // containerViewStyle={styles.input}
  // placeholder="Username"
  // inputStyle={styles.input}
  // onChangeText={(input) => this.setState({userName: input})}/>

  render() {
    return (
      <View>
        <View>
          <TextInput
            multiline = {true}
            numberOfLines = {10}
            width={'50%'}
            height={100}
            borderColor={'red'}
            borderWidth={1}
            onChangeText={(input) => this.setState({signature: input})}
            placeholder='SIGNATURE'
          />
          <Text>
            {this.props.packageInfo.service}
            {this.props.packageInfo.purchase_date}
            {this.props.packageInfo.total_count}
            {this.props.packageInfo.remaining_count}
          </Text>
        </View>
        <View>
        <Button
            raised
            // buttonStyle={styles.buttonStyle}
            onPress={() => this.props.updatePackage(this.state.signature)}
            icon={{name: 'cached'}}
            title='CONFIRM'/>
        </View>
        
      </View>
    )
  };
};
