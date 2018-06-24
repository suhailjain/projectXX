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
      this.getUserStatus()
      .then(() => this.getStores()
    .then(() => this.getGallery()
  .then(() => this.getFeedbackServices()
.then(() => {
  this.setState({ loading: 'done' });
  Actions.tabs({ type: 'replace' });
}))));
  }
 async getStores() {
   return new Promise((resolve) => {
    console.log('fetching stores start');
     fbAccess.database().ref('/rohinishops').once('value', (snapshot) => {
      this.props.Rstores(snapshot.val());
    });
     fbAccess.database().ref('/rohiniFood').once('value', (snapshot) => {
      this.props.Rfood(snapshot.val());
    });
     fbAccess.database().ref('/janakpuriShop').once('value', (snapshot) => {
      this.props.Jstores(snapshot.val());
    });
     fbAccess.database().ref('/janakpuriFood').once('value', (snapshot) => {
      this.props.Jfood(snapshot.val());
    });
     fbAccess.database().ref('/shahdraShop').once('value', (snapshot) => {
      this.props.Sstores(snapshot.val());
    });
     fbAccess.database().ref('/shahdraFood').once('value', (snapshot) => {
      this.props.Sfood(snapshot.val());
    });
     console.log('fetching stores end');
     resolve();
   });
  }
  async getFeedbackServices() {
    return new Promise((resolve) => {
     console.log('fetching services start');
     fbAccess.database().ref('/services').once('value', (snapshot) => {
      this.props.feedbackServices(snapshot.val());
    });
     console.log('fetching services end');
     resolve();
  });
  }
  async getUserStatus() {
    return new Promise((resolve) => {
     console.log('fetching user start');
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
   console.log('fetching user end');
   resolve();
 });
  }
 async getGallery() {
   return new Promise((resolve) => {
  console.log('fetching gallery start');
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
  console.log('fetching gallery end');
  resolve();
});
  }
  render() {
    console.log('render');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{this.state.loading}</Text>
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
