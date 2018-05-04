import { View, StyleSheet, Alert, ActivityIndicator, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Button, Icon, Header } from 'react-native-elements';
import UserProfile from '../common/UserProfile';
import fbAccess from '../FirebaseConfig';
import * as actions from './../../actions';


const { width, height } = Dimensions.get('window');

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
  },
  back: {
    position: 'absolute',
    marginTop: height - 50,
    marginLeft: 20
  }
});
class Logged extends Component {

  constructor(props) {
    super(props);
    this.googleUserLogout.bind(this);
    this.logout.bind(this);
    console.log(this.props.rpics);
    console.log(this.props.jpics);
    console.log(this.props.spics);
    if (this.props.location === 'Rohini') {
      this.state = { pics: this.props.rpics };
    } else if (this.props.location === 'Janakpuri') {
      this.state = { pics: this.props.jpics };
    } else if (this.props.location === 'Shahadra') {
      this.state = { pics: this.props.spics };
    }
    this.state = { loading: false, loggedIn: true };
  }

  logout() {
    console.log('logging out of user: ', fbAccess.auth().currentUser.uid);
    this.setState({ loading: !this.state.loading });
    fbAccess.auth().signOut().then(() => {
    //  this.setState({ loading: !this.state.loading, loggedIn: !this.state.loggedIn });
          this.props.userId(0);
    });
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
            );
            }
          }
        }
          onLogoutFinished={() => {
            this.props.userId(0);
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
      <View style={{ flex: 1, backgroundColor: '#DBDBDB' }}>
      <View style={{ flex: 0.3, backgroundColor: '#034A9C' }}>
      <Text style={{ alignSelf: 'center', color: '#ffffff' }}>{this.props.userid}</Text>
      </View>
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
      location: state.currentLocation,
      usertype: state.loginStatus,
      rpics: state.ruserposts,
      spics: state.suserposts,
      jpics: state.juserposts
  };
};

export default connect(mapStateToProps, actions)(Logged);
