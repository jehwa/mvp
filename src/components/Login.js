import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput } from 'react-native';
import Search from './Search';
import { FormLabel, Button, FormInput, FormValidationMessage } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import { changeEmptyUserName, changeEmptyPassword, searchShopId} from '../actions/login';
import { connect } from 'react-redux';


class Login extends Component { 
  constructor(props, context) {
    super(props, context);
    this.state = {
      userName: '',
      password: '',
    }
    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    this.props.navigator.push({
      component: Search,
      title: 'Search Customer',
    })
  }

  handleSubmit = () => {
    this.state.userName.length ? this.props.changeEmptyUserName(null) : this.props.changeEmptyUserName('Please put valid username');

    this.state.password.length ? this.props.changeEmptyPassword(null) : this.props.changeEmptyPassword('Please put valid password');

    if(this.state.userName === 'Admin' && this.state.password === 'Admin') {
      this.props.searchShopId(this.state.userName);
      this._onForward();
      console.log(this.props)
    }
  }

  render() {
    return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.svgContainer}>
        <SvgUri width="300" height="300" source={require('../../image/hair.svg')} />
        <View style={styles.svgHair}>
          <SvgUri width="100" height="100" source={require('../../image/style1.svg')} />
          <SvgUri width="100" height="100" source={require('../../image/style2.svg')} />
          <SvgUri width="100" height="100" source={require('../../image/style3.svg')} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <FormInput 
          placeholder="Username"
          inputStyle={styles.input}
          onChangeText={(input) => this.setState({userName: input})}/>
        <FormValidationMessage>{this.props.emptyUserName}</FormValidationMessage>
        <FormInput 
          secureTextEntry={true}
          inputStyle={styles.input}
          // keyboardAppearance={'default'}
          // keyboardType={'default'}
          placeholder="Password"
          onChangeText={(input) => this.setState({password: input})}
          />
        <FormValidationMessage>{this.props.emptyPassword}</FormValidationMessage>
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
    opacity: 5,
    height: '100%'
  },
  svgContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    marginTop: '20%',
    alignItems: 'center',
  },
  input: {
    width: 400,
    fontSize: 20,
  },
  button: {
    width: 200,
  },
  svgHair: {
    flex: 1,
    flexDirection: 'row'
  },
});

const mpaStateToProps = state => ({
  emptyUserName: state.changeEmptyUserReducer,
  emptyPassword: state.changeEmptyPasswordReducer,
});

const mapDispatchToProps = dispatch => ({
  changeEmptyUserName: message => dispatch(changeEmptyUserName(message)),
  changeEmptyPassword: message => dispatch(changeEmptyPassword(message)),
  searchShopId: shopName => dispatch(searchShopId(shopName))
})


export default connect(mpaStateToProps, mapDispatchToProps)(Login);
