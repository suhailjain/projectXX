import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';
import * as actions from '../../actions';

class CameraComponent extends Component {
  onBarCodeRead(e) {
    Alert.alert(e.data);
    this.props.parking(e.data);
    console.log(
        "Barcode Found!",
        "Type: " + e.type + "\nData: " + e.data
    );
  }

  takePicture() {
    console.log('hi');
    //options.location = ...
    this.camera.capture()
      .then(() => Actions.display())
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          captureMode={Camera.constants.CaptureMode.still}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          style={styles.preview}
          type={this.props.type}
          aspect={Camera.constants.Aspect.fill}
          captureAudio={false}
        >
        <View style={styles.innerContainer}>

        <Icon
        raised
        iconStyle={{ backgroundColor: 'transparent' }}
        name='chevron-left'
        color='#003366'
        onPress={() => Actions.pop()}
        />

        <Icon
        raised
        name='camera'
        color='#003366'
        onPress={() => this.takePicture()}
        />
        <Icon
        raised
        name='close'
        color='#003366'
        onPress={() => Actions.pop()}
        />

        </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  click: {

  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
});

const mapStateToProps = state => {
  return {
    type: state.cameraFace
  };
};

export default connect(mapStateToProps, actions)(CameraComponent);
