import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Spinner from './common/Spinner';
import * as actions from '../actions';
import fbAccess from './FirebaseConfig';

const FBSDK = require('react-native-fbsdk');

const {
AccessToken
} = FBSDK;

class BootUp extends Component {
  constructor() {
    super();
    this.state = { loading: 'loading' };
  }
  componentDidMount() {
      this.getUserStatus();
      this.getGallery();
      this.setState({ loading: 'done' });
  }
  async getUserStatus() {
    if (fbAccess.auth().currentUser !== null) {
      this.props.loginStatus('email');
      this.props.userid(fbAccess.auth().currentUser.uid);
    }
    AccessToken.getCurrentAccessToken().then(
  (data) => {
      if (data !== null) {
      this.props.loginStatus('facebook');
      this.props.userId(data.userID);
      }
    }
  );
  }
  async getGallery() {
    const fbdb = fbAccess.database();
    let pics = [];
    let spics = [];
    let jpics = [];
    let userPics = [];
    //console.log('user form the lobby: ', this.props.userid);
    // dbref = '/posts' || '/jPosts' || 'sPosts
    //fetching gallery for shahadra
    await fbdb.ref('/sPosts')
    .limitToLast(3)
    .on('child_added', (snapshot) => {
      //reversing the like order and check for approved
    /*  if (snapshot.val().user === this.props.userid) {
        userPics.unshift(snapshot.val());
        this.props.userPics(userPics);
      } */
      if (snapshot.val().approved === 'Y') {
          spics.unshift(snapshot.val());
          this.props.sgallerydata(spics);
        }
    });
    //fetching gallery for Janakpuri
    await fbdb.ref('/jPosts')
    .limitToLast(3)
    .on('child_added', (snapshot) => {
      //reversing the like order and check for approved
    /*  if (snapshot.val().user === this.props.userid) {
        userPics.unshift(snapshot.val());
        this.props.userPics(userPics);
      } */
      if (snapshot.val().approved === 'Y') {
          jpics.unshift(snapshot.val());
          this.props.jgallerydata(jpics);
          //cache specific
        }
    });
    //fetching gallery for Rohini
    await fbdb.ref('/posts')
    .limitToLast(3)
    .on('child_added', (snapshot) => {
      //reversing the like order and check for approved
    /*  if (snapshot.val().user === this.props.userid) {
        userPics.unshift(snapshot.val());
        this.props.userPics(userPics);
      } */
      if (snapshot.val().approved === 'Y') {
          pics.unshift(snapshot.val());
          this.props.rgallerydata(pics);
          //cache specific
        }
    });
  }
  render() {
    return (
      <View>
      <Text>
      {this.state.loading}
      </Text>
      <Button
      onPress={() => Actions.tabs({ type: 'replace' })}
      title='go'
      />
      </View>
    );
  }
}

export default connect(null, actions)(BootUp);
