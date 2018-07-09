import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem, SearchBar, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import CusInfo from './CusInfo';


export default class Search extends Component { 
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchName: '',
      customers: [],
    }
    this.onChange = this.onChange.bind(this);
    this._onForward = this._onForward.bind(this);
  }

  onChange = (searchName) => {
    console.log(searchName);
    this.setState({
      searchName: searchName,
    })
  }

  onSubmit = () => {
    // console.log(this.textInputRef, this.textRef)
    // this.textRef.clear();
    // console.log(this.textRef, 'please work!!!');
    fetch(`http://localhost:3000/shop/${this.props.shopId}/${this.state.searchName}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data, 'this one!!!');
        if(!data.length) {
          alert('no data');
        }
        this.setState({
          customers: data,
          searchName: ''
        })
      })
      .catch(err => console.log(err));
  }

  _onForward(shopId, customerId) {
    console.log(shopId, customerId);

    fetch(`http://localhost:3000/customer/${shopId}/${customerId}`)
      .then(res => res.json())
      .then(data => {
        this.props.navigator.push({
          component: CusInfo,
          title: 'Customer information',
          passProps: {cusInfo: data, shopId: shopId}
        })
      })
      .catch(err => console.log(err));
  }

  render() { 
    return (
      <View>
        <View style={styles.container}>
          <FormLabel>Name</FormLabel>
          <FormInput 
            value={this.state.searchName}
            autoCapitalize="none"
            placeholder='Search customer'
            onChangeText={this.onChange}/>
          <FormValidationMessage></FormValidationMessage>
          <Button 
            small
            icon={{name: 'person-outline'}}
            title='FIND'
            onPress={this.onSubmit} />
        </View>
        <View>
          <List>
            {
              this.state.customers.map((l,i) => (
                <ListItem 
                  title={l.name} 
                  key={l.customer_id}
                  onPress={() => this._onForward(this.props.shopId, l.customer_id)}/>
              ))
            }
          </List>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 100
    // justifyContent: 'center',
  },
});