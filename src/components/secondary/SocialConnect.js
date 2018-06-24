import { View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Logged from '../login/Logged';
import NotLogged from '../login/NotLogged';
import fbAccess from '../FirebaseConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDBDB'
  },
});

class SocialConnect extends Component {
  static navigationOptions = {
    tabBarLabel: 'Connect'
  }
async getUserName() {
  await fbAccess.database().ref('users').child(`${this.props.userid}`).child('name')
  .once('value', snapshot => {
    this.props.SetUserName(snapshot.val());
  });
}

refreshUserPicList(user) {
  return new Promise((resolve) => {
    let ruserPics = [];
    let suserPics = [];
    let juserPics = [];
    //fetching gallery for shahadra
    fbAccess.database().ref('/sPosts')
    .once('value', (snapshot) => {
      //reversing the like order and check for approved
      snapshot.forEach((child) => {
        if (child.val().user === user) {
          suserPics.unshift(child.val());
        }
      });
      this.props.suserPics(suserPics);
    });
    //fetching gallery for Janakpuri
    fbAccess.database().ref('/jPosts')
    .once('value', (snapshot) => {
      //reversing the like order and check for approved
      snapshot.forEach((child) => {
        if (child.val().user === user) {
          juserPics.unshift(child.val());
        }
      });
      this.props.juserPics(juserPics);
    });
    //fetching gallery for Rohini
   fbAccess.database().ref('/posts')
   .once('value', (snapshot) => {
     //reversing the like order and check for approved
     snapshot.forEach((child) => {
       if (child.val().user === user) {
         ruserPics.unshift(child.val());
       }
     });
     this.props.ruserPics(ruserPics);
   });
       resolve();
     });
}
  isUserSignedIn = () => {
    if (Number.parseInt(this.props.userid, 10) === 0) {
      return (
        <NotLogged navigation={this.props.navigation} />
      );
    } else {
      this.refreshUserPicList(this.props.userid)
      .then(() => {
      });
      return (
        <Logged navigation={this.props.navigation} />
      );
    }
  }

  render() {
    console.log('render');
    return (
      <View style={styles.container}>
      {this.isUserSignedIn()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.userId
  };
};

export default connect(mapStateToProps, actions)(SocialConnect);
