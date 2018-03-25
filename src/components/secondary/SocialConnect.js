  import { View, StyleSheet } from 'react-native';
  import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';
import Logged from '../login/Logged';
import NotLogged from '../login/NotLogged';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed'
  },
});
let user = '';
class SocialConnect extends Component {

  componentWillMount() {
    user = fbAccess.auth().currentUser;
  }

  isUserSignedIn = () => {
    console.log(this.props.userId);
    //this part of state needs to be cached.
    if (this.props.userId !== 0) {
      return (
        <Logged />
      );
    }
    if (!((user !== null) && (user.uid !== '') && (user.uid !== 'none'))) {
        return (
          <NotLogged />
        );
      } else {
        return (
          <Logged />
        );
      }
    }
  menuIcon() {
    return (
      <Icon
      name='navigate-before'
      color='#ededed'
      underlayColor='#ededed'
      onPress={() => Actions.pop()}
      />
    );
  }

  rightIcon() {
    return (
      <Icon
      name='local-parking' color='#ededed' underlayColor='#003366' onPress={() => {
        this.props.cameraFace('RNCamera.Constants.Type.back');
        Actions.camera();
      }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
      {this.isUserSignedIn()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.fbUserID
  };
};

export default connect(mapStateToProps, actions)(SocialConnect);
