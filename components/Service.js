import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem, SearchBar, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import Package from './Package';

export default class Service extends Component {
  constructor(props, context) {
    super(props, context);
    // this.state = {
    //   searchName: '',
    //   customers: [],
    // }
    // this.test = this.test.bind(this);

  }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>
            Service: {this.props.info.service}
          </Text>
          <Text>
            Total Count: {this.props.info.total_count}
          </Text>
          <Text>
            Remaining Count: {this.props.info.remaining_count}
          </Text>
        </View>
        <Button
          onPress={() => this.props.update(this.props.info.serviceId, this.props.info.packageId)}
          title='CLAIM'
        />
        { 
          this.props.info.used.concat(Array(this.props.info.remaining_count).fill(0, 0, this.props.info.remaining_count)).map((el, i) => (
            <Package used={el} key={i}/>
          ))
        }
      </View>
    );
  }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    // alignItems: 'center',
    marginBottom: '20%'
    // justifyContent: 'center',
  },
});
