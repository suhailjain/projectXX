import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import * as actions from '../../actions';

class CameraComponent extends Component {
  onBarCodeRead(e) {
    Actions.pop();
    Alert.alert('we have saved your parking for you');
    this.props.parking(e.data);
    console.log(
        "Barcode Found!",
        "Type: " + e.type + "\nData: " + e.data
    );

  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.props.cache(data.uri);
      Actions.confirmUpload();
    }
   }

  render() {
    console.log(this.props.type);
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(cam) => {
            this.camera = cam;
          }}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          autofocus={RNCamera.Constants.AutoFocus.on}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
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
        </RNCamera>
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
