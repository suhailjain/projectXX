import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon, Button } from 'react-native-elements';
import ImageList from './ImageList';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';

const clickMe = () => {
  const user = fbAccess.auth().currentUser;
  if (user === null) {
    Alert.alert('you must log in to upload yours');
  } else {
    Actions.camera();
  }
};

class Gallery extends Component {
  menuIcon() {
    return (
    <Icon name='menu' color='#663300' onPress={() => this.props.drawerState(false)} />
  );
}
  render() {
    return (
      <View>
      <Header
      backgroundColor='#003366'
      leftComponent={this.menuIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={{ icon: 'dots-three-vertical', color: '#fff' }}
      />
      <Button
      title='click'
      onPress={() => {
        this.props.cameraFace('front');
        clickMe();
      }}
      />
      <ImageList />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locate: state.currentLocation
  };
};

export default connect(mapStateToProps, actions)(Gallery);
