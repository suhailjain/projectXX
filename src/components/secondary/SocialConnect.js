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
      color='#663300'
      underlayColor='#003366'
      onPress={() => Actions.pop()}
      />
    );
  }

  rightIcon() {
    return (
      <Icon
      name='local-parking' color='#663300' underlayColor='#003366' onPress={() => {
        this.props.cameraFace('back');
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

export default connect(null, actions)(SocialConnect);
