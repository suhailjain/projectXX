import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ImageList from './ImageList';
import * as actions from '../../actions';
import BackFab from '../../fabs/BackFab';
import FrontCamFab from '../../fabs/FrontCamFab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed'
  },
});

class Gallery extends Component {
  render() {
    this.props.cameraFace('RNCamera.Constants.Type.front');
    return (
      <View style={styles.container}>
      <ImageList />
      <BackFab />
      <FrontCamFab />
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
