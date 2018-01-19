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
  render() {
      this.props.cameraFace('back');
    return (
      <View>
      <Text>{this.props.park}</Text>
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
