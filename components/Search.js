import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem, SearchBar, FormLabel, FormInput, FormValidationMessage, Button, Avatar } from 'react-native-elements'
import CusInfo from './CusInfo';
import SvgUri from 'react-native-svg-uri';


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
    fetch(`http://localhost:3003/shop/${this.props.shopId}/${this.state.searchName}`)
      .then(res => res.json())
      .then(data => {
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

    fetch(`http://localhost:3003/customer/${shopId}/${customerId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
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
          <View style={styles.svgHair}>
            <SvgUri width="100" height="100" source={require('../image/style1.svg')} />
            <SvgUri width="100" height="100" source={require('../image/style2.svg')} />
            <SvgUri width="100" height="100" source={require('../image/style3.svg')} />
          </View>
          <FormInput 
            inputStyle={styles.input}
            value={this.state.searchName}
            autoCapitalize="none"
            placeholder='Search customer'
            onChangeText={this.onChange}/>
          <FormValidationMessage></FormValidationMessage>
          <Button 
            raised
            icon={{name: 'person-outline'}}
            title='FIND'
            rounded={true}
            fontWeight='bold'
            backgroundColor='#0f3057'
            containerViewStyle={styles.button}
            onPress={this.onSubmit} 
            />
        </View>
        <View>
          <List containerStyle={styles.listContainer}>
            {
              this.state.customers.map((l,i) => (
                <ListItem 
                  avatar={<Avatar
                            overlayContainerStyle={{backgroundColor: 'white'}}
                            rounded
                            source={{uri:l.photo ? l.photo : 'https://s3-us-west-1.amazonaws.com/picture-nerdstrom/noun_Face_342135.png'}}
                          />}
                  hideChevron={true}
                  containerStyle={styles.list}
                  title={l.name} 
                  subtitle={l.email}
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
    // backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 100
    // justifyContent: 'center',
  },
  button: {
    width: 200,
  },
  input: {
    marginTop: '20%',
    width: 350,
  },
  svgHair: {
    flex: 1,
    flexDirection: 'row'
  },
  listContainer: {
    // border: 'none',
    borderColor: 'transparent',
    alignItems: 'center'
  },
  list: {
    width: 350,
  },
});