import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon } from 'react-native-elements';
import ImageList from './ImageList';
import * as actions from '../../actions';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  back: {
      position: 'absolute',
      marginTop: 50,
      marginLeft: width - 30
    }
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
      console.log(this.props.sgallery);
      return (
        <ImageList gallery={this.props.sgallery} />
      );
    }
  }
  render() {
    console.log('render');
    this.props.cameraFace('RNCamera.Constants.Type.front');
    return (
      <View style={styles.container}>
      {this.resolveGallery()}
      <TouchableOpacity
      onPress={() => Actions.frontCam()}
      style={styles.back}
      >
      <Icon
      name='clear'
      />
      </TouchableOpacity>
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
