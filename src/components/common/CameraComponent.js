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
import fbAccess from '../FirebaseConfig';

class CameraComponent extends Component {
  onBarCodeRead(e) {
    this.props.parking(e.data);
    if (e.data === 'a1') {
      fbAccess.database().ref('/parking').set({ a1: this.props.userid })
      .then(() => {
        Alert.alert(
          'Park Assist',
          'We wont let you forget your parking slot',
      [
        { text: 'Thanks', onPress: () => Actions.pop() },
        { text: 'Again', onPress: () => this.props.parking('not_found') }
      ],
      { cancelable: false }
      );
      });
    }
  }

  render() { console.log('render');
    console.log('render camComp');
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
        />
        <View style={{ flex: 0.4, justifyContent: 'flex-end', marginBottom: 20 }}>
        <Icon
        name='close'
        color='#003366'
        onPress={() => Actions.pop()}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 0.6
  },
});

const mapStateToProps = state => {
  return {
    type: state.cameraFace,
    userid: state.userId
  };
};

export default connect(mapStateToProps, actions)(CameraComponent);
