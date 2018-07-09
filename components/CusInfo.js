import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, Modal } from 'react-native';
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
    console.log(serviceId,packageId, 'i will update this service id!!!')

  }


  render() {
    return(
      <View style={styles.container}>
        <View sytle={styles.infoContainer}>
          <View>
            <Avatar
              small
              rounded
              icon={{name: 'camera-enhance'}}
              onPress={() => console.log(this.props.cusInfo)}
              activeOpacity={0.7}
              // containerStyle={{flex: 2, marginLeft: 20, marginTop: 115}}
            />
          </View>
          <View styles={styles.customInfo}>
            <Text>
              Name: {this.props.cusInfo.name}
            </Text>
            <Text>
              Email: {this.props.cusInfo.email}
            </Text>
            <Text>
              Phone Number: {this.props.cusInfo.phone_number}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View>
          <Button
          buttonStyle={styles.buttonStyle}
          raised
          onPress={() => this.changeService(1)}
          icon={{name: 'cached'}}
          title='BLOW DRY'/>
          </View>
          <View>
          <Button
          raised
          buttonStyle={styles.buttonStyle}
          onPress={() => this.changeService(2)}
          icon={{name: 'cached'}}
          title='COLORING'/>
          </View>
          <View>
          <Button
          raised
          buttonStyle={styles.buttonStyle}
          onPress={() => this.changeService(3)}
          icon={{name: 'cached'}}
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
    // backgroundColor: 'red',
    // alignItems: 'center',
    marginTop: 100
    // justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '10%',
    marginBottom: '10%',
    justifyContent: 'center'
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
