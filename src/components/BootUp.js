import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import Spinner from './common/Spinner';
import * as actions from '../actions';
import fbAccess from './FirebaseConfig';
import DrawerModal from './common/DrawerModal';

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
    this.getMetaData();
  }
  getMetaData() {
    return new Promise((resolve) => {
      this.getStores();
      this.getFeedbackServices();
      this.getUserStatus();
      this.getGallery();
      resolve();
    })
    .then(() => {
      this.setState({ loading: 'done' });
    });
  }
 getStores() {
    fbAccess.database().ref('/rohiniShop').once('value', (snapshot) => {
      this.props.stores(snapshot.val());
    });
  }
  async getFeedbackServices() {
    await fbAccess.database().ref('/services').once('value', (snapshot) => {
      this.props.feedbackServices(snapshot.val());
    });
  }
  async getUserStatus() {
    if (fbAccess.auth().currentUser !== null) {
      this.props.loginStatus('email');
      this.props.userid(fbAccess.auth().currentUser.uid);
    }
    await AccessToken.getCurrentAccessToken().then(
  (data) => {
      if (data !== null) {
      this.props.loginStatus('facebook');
      this.props.userId(data.userID);
      }
    }
  );
  }
 getGallery() {
    let pics = [];
    let spics = [];
    let jpics = [];
    let userPics = [];
    let suserPics = [];
    let juserPics = [];
    //fetching gallery for shahadra
   fbAccess.database().ref('/sPosts')
    .limitToLast(3)
    .once('value', (snapshot) => {
      //reversing the like order and check for approved
      snapshot.forEach((child) => {
        if (child.val().approved === 'Y') {
          spics.unshift(child.val());
          this.props.sgallerydata(spics);
        }
        if (this.props.userid !== 0 && child.val().user === this.props.userid) {
          suserPics.unshift(child.val());
          this.props.suserPics(suserPics);
        }
      });
    });

    //fetching gallery for Janakpuri
   fbAccess.database().ref('/jPosts')
    .limitToLast(3)
    .once('value', (snapshot) => {
      //reversing the like order and check for approved
      snapshot.forEach((child) => {
        if (child.val().approved === 'Y') {
          jpics.unshift(child.val());
          this.props.jgallerydata(jpics);
        }
        if (this.props.userid !== 0 && child.val().user === this.props.userid) {
          juserPics.unshift(child.val());
          this.props.juserPics(juserPics);
        }
      });
    });
    //fetching gallery for Rohini
   fbAccess.database().ref('/posts')
    .limitToLast(3)
    .once('value', (snapshot) => {
      //reversing the like order and check for approved
      snapshot.forEach((child) => {
        if (child.val().approved === 'Y') {
          pics.unshift(child.val());
          this.props.rgallerydata(pics);
        }
        if (this.props.userid !== 0 && child.val().user === this.props.userid) {
          userPics.unshift(child.val());
          this.props.ruserPics(userPics);
        }
      });
    });
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 26 }}>
      Loading...
      </Text>
      <Text>{this.state.loading}</Text>
      <Button
      onPress={() => Actions.tabs({ type: 'replace' })}
      title='go'
      />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
      userid: state.userId
  };
};

export default connect(mapStateToProps, actions)(BootUp);
