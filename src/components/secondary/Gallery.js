import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon, Button } from 'react-native-elements';
import ImageList from './ImageList';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed'
  },
});

const clickMe = (fbUserId) => {
  if (fbAccess.auth().currentUser === 'null' && fbUserId === 0) {
    Alert.alert('you must log in to upload yours');
  } else {
    Actions.frontCam();
  }
};

class Gallery extends Component {
  menuIcon() {
    return (
    <Icon name='navigate-before' color='#ededed' underlayColor='#003366' onPress={() => Actions.pop()} />
  );
}
  rightIcon() {
    return (
      <Icon
      name='add-a-photo' color='#ededed' underlayColor='#003366'
      onPress={() => clickMe(this.props.userid)}
      />
    );
}
  render() {
    this.props.cameraFace('RNCamera.Constants.Type.front');
    return (
      <View style={styles.container}>
      <Header
      backgroundColor='#003366'
      leftComponent={this.menuIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={this.rightIcon()}
      />
      <ImageList gallery={this.props.gallery} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locate: state.currentLocation,
    gallery: state.gallery,
    loginStatus: state.loginStatus,
    userid: state.fbUserID
  };
};

export default connect(mapStateToProps, actions)(Gallery);
