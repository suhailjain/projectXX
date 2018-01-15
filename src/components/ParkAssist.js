import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Button from './common/Button';

class ParkAssist extends Component {
  render() {
    return (
      <View>
      <Button onPress={() => {
        this.props.cameraFace('back');
        Actions.camera();
      }}>
      save your parking
      </Button>
      </View>
    );
  }
}

export default connect(null, actions)(ParkAssist);
