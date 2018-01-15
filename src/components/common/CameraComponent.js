import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';

class CameraComponent extends Component {
  onBarCodeRead(e) {
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
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          style={styles.preview}
          type={this.props.type}
          aspect={Camera.constants.Aspect.fill}
        >
        <Icon
        raised
        name='camera'
        type='font-awesome'
        color='#f50'
        onPress={() => this.takePicture()}
        />
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

const mapStateToProps = state => {
  return {
    type: state.cameraFace
  };
};

export default connect(mapStateToProps)(CameraComponent);
