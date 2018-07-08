import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput } from 'react-native';
import Search from './Search';
import { FormLabel, Button, FormInput, FormValidationMessage } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';

export default class Login extends Component { 
  constructor(props, context) {
    super(props, context);
    this.state = {
      userName: '',
      passWord: '',
      emptyUserName: null,
      emptyPassWord: null,
      shopId: null
    }
    this._onForward = this._onForward.bind(this);
  }

  _onForward(shopId) {
    this.props.navigator.push({
      component: Search,
      title: 'Search Customer',
      passProps: {shopId: shopId}
    })

  }

  handleSubmit = () => {
    if(!this.state.userName.length) {
      this.setState({
        emptyUserName: 'Please put valid username'
      })
    } else {
      this.setState({
        emptyUserName: null
      })
    }
    if(!this.state.passWord.length) {
      this.setState({
        emptyPassWord: 'Please put valid password'
      })
    } else {
      this.setState({
        emptyPassWord: null
      })
    }
    if(this.state.userName === 'Admin' && this.state.passWord === 'Admin') {
      // axios.get(`/shop/${this.state.userName}`)
      //   .then(res => console.log(res))
      //   .catch(err => console.log(err));
      console.log('hey')
      fetch(`http://localhost:3000/shop/${this.state.userName}`)
        .then(res => res.json())
        .then(json => this._onForward(json.id))
        .catch(err => console.log(err, 'cannot set get request'));
      // this._onForward();
    }
    // console.log(this.state.emptyUserName);
  }

  render() {

    return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.svgContainer}>
        <SvgUri width="300" height="300" source={require('../image/hair.svg')} />
        <View style={styles.svgHair}>
          <SvgUri width="100" height="100" source={require('../image/style1.svg')} />
          <SvgUri width="100" height="100" source={require('../image/style2.svg')} />
          <SvgUri width="100" height="100" source={require('../image/style3.svg')} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <FormInput 
          // containerViewStyle={styles.input}
          placeholder="Username"
          inputStyle={styles.input}
          onChangeText={(input) => this.setState({userName: input})}/>
        <FormValidationMessage>{this.state.emptyUserName}</FormValidationMessage>
        <FormInput 
          secureTextEntry={true}
          inputStyle={styles.input}
          // keyboardAppearance={'default'}
          // keyboardType={'default'}
          placeholder="Password"
          onChangeText={(input) => this.setState({passWord: input})}
          />
        <FormValidationMessage>{this.state.emptyPassWord}</FormValidationMessage>
        <Button
          raised
          title="SIGN IN"
          rounded={true}
          fontWeight='bold'
          backgroundColor='#0f3057'
          containerViewStyle={styles.button}
          onPress={this.handleSubmit}
        />
      </View>
    </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#f6f6f6',
    // backgroundColor: 'red',
    opacity: 5,
    height: '100%'
    // alignItems: 'center',
    // paddingTop: 50,
  },
  svgContainer: {
    // flex:1,
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'red',
  },
  inputContainer: {
    flex: 1,
    marginTop: '20%',
    alignItems: 'center',

    // justifyContent: 'center',

    // backgroundColor: 'red',
  },
  input: {
    width: 400,
    // backgroundColor: 'yellow',
    fontSize: 20,
    // color: 'red'
    // rounded: true
    // marginTop: 100,
    // backgroundColor: 'red',
    // color: 100,
    // borderWidth: 20
  },
  button: {
    width: 200,
    // underlayColor: 'red'
  },
  svgHair: {
    flex: 1,
    flexDirection: 'row'
  },
});