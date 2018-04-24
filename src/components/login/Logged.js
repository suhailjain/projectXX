import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Button, Icon, Header } from 'react-native-elements';
import UserProfile from '../common/UserProfile';
import fbAccess from '../FirebaseConfig';
import * as actions from './../../actions';


const FBSDK = require('react-native-fbsdk');

const {
LoginButton,
AccessToken
} = FBSDK;

const styles = StyleSheet.create({
  submit: {
    paddingTop: 20
  },
  email: {
    marginLeft: 7,
    marginRight: 7,
    marginTop: 20
  },
  pass: {
    marginTop: 10,
    marginLeft: 7,
    marginRight: 7,
  },
  loginContainer: {
    flex: 1,
    marginRight: 7,
    marginLeft: 7,
    marginTop: 7,
    borderColor: '#d0d0d0',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  logout: {
    backgroundColor: '#ffffff',
    paddingBottom: 5,
    paddingTop: 5,
    marginRight: 7,
    marginLeft: 7,
    marginTop: 7,
    borderColor: '#d0d0d0',
    borderWidth: 1
  },
  activityIndicator: {
    flex: 1
  }
});

class Logged extends Component {

  constructor() {
    super();
    this.state = { loading: false, loggedIn: true };
  }

  logout = () => {
    console.log('logging out of user: ', fbAccess.auth().currentUser.uid);
    this.setState({ loading: !this.state.loading });
    fbAccess.auth().signOut().then(() => {
      this.setState({ loading: !this.state.loading, loggedIn: !this.state.loggedIn });
      Actions.notlogged();
    });
  }

  menuIcon() {
    return (
      <Icon
      name='navigate-before'
      color='#ededed'
      underlayColor='#ededed'
      onPress={() => Actions.lobby()}
      />
    );
  }

  rightIcon() {
    return (
      <Icon
      name='local-parking' color='#ededed' underlayColor='#ededed' onPress={() => {
        Actions.camera();
      }}
      />
    );
  }

  fbUserLogout() {
    if (this.props.usertype === 'facebook') {
      return (
        <LoginButton
        publishPermissions={['publish_actions']}
        onLoginFinished={
          (error, result) => {
            if (error) {
              Alert.alert('login has error: ' + result.error);
            } else if (result.isCancelled) {
              Alert.alert("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(
            (data) => {
                this.props.loginStatus('facebook');
                this.props.userId(data.userID);
                }
            )
      .then(() => Actions.logged());
            }
          }
        }
          onLogoutFinished={() => {
            this.props.userId(0);
            Actions.notlogged();
            Alert.alert('logout.');
        }}
        />
      );
    } else {
      return;
    }
  }

  googleUserLogout() {
    if (this.props.usertype === 'email') {
      return (
        <Button
            title='Log out'
            textStyle={{ color: '#003366' }}
            backgroundColor='#ffffff'
            onPress={() => this.logout()}
        />
    );
  } else {
    return;
  }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ededed' }}>
          <View style={styles.logout}>
          {this.fbUserLogout()}
          {this.googleUserLogout()}
          </View>
          <UserProfile />
          <ActivityIndicator
                   animating={this.state.loading}
                   color='#bc2b78'
                   size='large'
                   style={styles.activityIndicator}
          />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      userid: state.userId,
      usertype: state.loginStatus
  };
};

export default connect(mapStateToProps, actions)(Logged);
