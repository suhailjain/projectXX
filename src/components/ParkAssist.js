import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ParkAssist extends Component {
  static navigationOptions = {
    tabBarLabel: 'Parking'
  }
  isParked() {
    if (this.props.park === 'not_found') {
      console.log('park');
        Actions.camera();
    } else {
      return (
      <View>
      <Text>you will find your car at</Text>
      <Text>{this.props.park}</Text>
      </View>
    );
    }
  }
  render() {
    return (
      <View>
      {this.isParked()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    park: state.park
  };
};

export default connect(mapStateToProps, actions)(ParkAssist);
