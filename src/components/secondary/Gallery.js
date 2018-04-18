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
  static navigationOptions = {
    tabBarLabel: 'Gallery'
  }
  componentWillMount() {

  }
  resolveGallery() {
  //  console.log(this.props.locate);
    if (this.props.locate === 'Rohini') {
      return (
        <ImageList gallery={this.props.rgallery} />
      );
    } else if (this.props.locate === 'Janakpuri') {
      return (
        <ImageList gallery={this.props.jgallery} />
      );
    } else if (this.props.locate === 'Shahadra') {
    //  console.log(this.props.sgallery);
      return (
        <ImageList gallery={this.props.sgallery} />
      );
    }
  }
  render() {
    this.props.cameraFace('RNCamera.Constants.Type.front');
    return (
      <View style={styles.container}>
      {this.resolveGallery()}
      <FrontCamFab />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locate: state.currentLocation,
    rgallery: state.rgallery,
    sgallery: state.sgallery,
    jgallery: state.jgallery,
    loginStatus: state.loginStatus,
    userid: state.fbUserID
  };
};

export default connect(mapStateToProps, actions)(Gallery);
