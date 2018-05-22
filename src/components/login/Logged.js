import { View, StyleSheet, Alert, ActivityIndicator, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Icon, Header } from 'react-native-elements';
import UserProfile from '../common/UserProfile';
import fbAccess from '../FirebaseConfig';
import * as actions from './../../actions';
import DrawerModal from '../common/DrawerModal';
import UserImageList from './UserImageList';
import UserFeedbacks from './UserFeedbacks';
import UserStats from './UserStats';


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
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginLeft: 200
  }
});
class Logged extends Component {

  constructor(props) {
    super(props);
    this.googleUserLogout.bind(this);
    this.logout.bind(this);
    this.state = { loading: false, loggedIn: true };
    console.log('constructor of logged');
  }
  componentWillMount() {

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
      return;
  } else {
    return;
  }
  }
  renderMainComponent() {
    let data = [];
    if (this.props.dbref === '/posts') {
      data = this.props.rpics;
    } else if (this.props.dbref === '/jPosts') {
      data = this.props.jpics;
    } else if (this.props.dbref === '/sPosts') {
      data = this.props.spics;
    }
    if (this.props.menuType === 'gallery') {
      return (
        <UserImageList data={data} />
      );
    } else if (this.props.menuType === 'feedback') {
      return (
        <UserFeedbacks />
      );
    } else if (this.props.menuType === 'stats') {
      return (
        <UserStats />
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#DBDBDB' }}>
      <View style={{ height: '20%', backgroundColor: '#034A9C', flexDirection: 'row' }}>
      <Text style={{ alignSelf: 'flex-end', fontSize: 20, color: '#ffffff', marginBottom: 10, marginLeft: 20 }}>{this.props.username}</Text>
      <TouchableOpacity
      onPress={() => this.props.drawerState(false)}
      style={styles.back}
      >
      <Icon
      large
      color='#ffffff'
      name='menu'
      />
      </TouchableOpacity>
      </View>
          {this.fbUserLogout()}
          {this.renderMainComponent()}
          <ActivityIndicator
                   animating={this.state.loading}
                   color='#bc2b78'
                   size='large'
                   style={styles.activityIndicator}
          />
        <DrawerModal visible={this.props.toggle} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      userid: state.userId,
      location: state.currentLocation,
      usertype: state.loginStatus,
      dbref: state.dbRef,
      rpics: state.ruserposts,
      spics: state.suserposts,
      jpics: state.juserposts,
      username: state.username,
      toggle: state.drawerState,
      menuType: state.loggedmenuselected
  };
};

export default connect(mapStateToProps, actions)(Logged);
