import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import Service from './Service';
import Signature from './Signature';

export default class CusInfo extends Component { 
  constructor(props, context) {
    super(props, context);
    this.state = {
      service: this.props.cusInfo["1"] || {},
      showSignature: false,
      currentService: null,
      currentPackage: null,
    }
    this.changeService = this.changeService.bind(this);
    this.update = this.update.bind(this);
    this.updatePackage = this.updatePackage.bind(this);
  }

  changeService = (num) => {
    this.setState({
      service: this.props.cusInfo[num] ? this.props.cusInfo[num] : {},
    })
  }

  update = (serviceId, packageId) => {
    this.setState({
      showSignature: !this.state.showSignature,
      currentService: serviceId,
      currentPackage: packageId
    })
  }

  updatePackage = (signature) => {
    let date = new Date().toLocaleString('en-US', {timeZone: 'America/Los_Angeles'})
    console.log(date, 'date for db')
    this.props.cusInfo[this.state.currentService][this.state.currentPackage].used.push({signature: 'test', used_date: date});
    this.props.cusInfo[this.state.currentService][this.state.currentPackage].remaining_count--;
    this.setState({
      showSignature: false,
      service: this.props.cusInfo[this.state.currentService]
    })
    fetch(`http://localhost:3003/customer/update`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        packageId: this.state.currentPackage,
        signature: signature,
        date: date
      }),
    })
  }


  render() {
    return(
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Avatar
            height={100}
            width={100} 
            rounded
            source={{uri:this.props.cusInfo.photo ? this.props.cusInfo.photo : 'https://s3-us-west-1.amazonaws.com/picture-nerdstrom/noun_Face_342135.png'}}
            // icon={{name: 'camera-enhance'}}
            overlayContainerStyle={{backgroundColor: 'white'}}
            onPress={() => console.log(this.props.cusInfo)}
            activeOpacity={0.7}
          />
          <View style={styles.customInfo}>
            <Text style={styles.eachInfo}>
              NAME: {this.props.cusInfo.name}
            </Text>
            <Text style={styles.eachInfo}>
              E-MAIL: {this.props.cusInfo.email}
            </Text>
            <Text style={styles.eachInfo}>
              PHONE: {this.props.cusInfo.phone_number}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View>
          <Button
          // buttonStyle={styles.buttonStyle}
          raised
          rounded={true}
          fontWeight='bold'
          backgroundColor='#00587a'
          containerViewStyle={styles.buttonStyle}
          onPress={() => this.changeService(1)}
          // icon={{name: 'cached'}}
          title='BLOW DRY'/>
          </View>
          <View>
          <Button
          raised
          rounded={true}
          fontWeight='bold'
          backgroundColor='#20366b'
          containerViewStyle={styles.buttonStyle}
          onPress={() => this.changeService(2)}
          // icon={{name: 'cached'}}
          title='COLORING'/>
          </View>
          <View>
          <Button
          raised
          title='COLORING'
          rounded={true}
          fontWeight='bold'
          backgroundColor='#008891'
          containerViewStyle={styles.buttonStyle}
          onPress={() => this.changeService(3)}
          // icon={{name: 'cached'}}
          title='SCALP CARE'/>
          </View>
        </View>
        <View>
          {
            Object.keys(this.state.service).map((key, i) => (
              <Service key={i} info={this.state.service[key]} update={this.update}/>
            ))
          }
        </View>
        <View>
          {this.state.showSignature 
            ? <Signature 
                packageInfo={this.props.cusInfo[this.state.currentService][this.state.currentPackage]}
                updatePackage={this.updatePackage}
              /> 
            : null}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#f6f6f6',
    // alignItems: 'center',
    marginTop: 100
    // justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '5%',
    marginBottom: '5%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  eachInfo: {
    fontSize: 16,
    color: '#283149',
    fontWeight: 'bold'
    // fontFamily: 'ArialMT',
    // marginBottom: 10
  },
  customInfo: {
    width: '60%'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '10%',
    marginBottom: '10%',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    width: 150,
  },
  serviceContainer: {

  }
});
