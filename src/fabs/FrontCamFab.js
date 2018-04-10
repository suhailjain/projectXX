import React, { Component } from 'react';
import { Fab, Button, Icon } from 'native-base';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class FrontCamFab extends Component {

  clickMe() {
    console.log('going to launch camera from fab, for user: ', this.props.userid);
    if (this.props.userid === 0) {
      Alert.alert('you must log in to upload yours');
    } else {
      Actions.frontCam();
    }
  }

  render() {
    return (
      <Fab
        active={false}
        direction="down"
        containerStyle={{ marginTop: 15 }}
        style={{ backgroundColor: 'transparent' }}
        position="topRight"
        onPress={() => this.clickMe()}>
        <Icon name="camera" style={{ fontSize: 35, fontWeight: 20, color: '#5067FF' }}/>
      </Fab>
    );
  }
}

const mapStateToProps = state => {
  return {
    userid: state.userId
  };
};

export default connect(mapStateToProps, null)(FrontCamFab);
