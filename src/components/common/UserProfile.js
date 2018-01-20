import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import fbAccess from '../FirebaseConfig';
import * as actions from '../../actions';

class UserProfile extends Component {
  componentWillMount() {
    //get user specific images
    const fbdb = fbAccess.database();
    console.log(this.props.curruser);
    let userPics = [];
    // dbref = '/posts' || '/jPosts' || 'sPosts'
    fbdb.ref(this.props.dbref).orderByChild('likes')
    .on('child_added', (snapshot) => {
      //reversing the like order and check for approved
      if (this.props.curruser !== 'none') {
      if (snapshot.val().user === this.props.curruser) {
        console.log('equal');
        userPics.unshift(snapshot.val());
        this.props.userPics(userPics);
      }
    }
    console.log(userPics);
  });
  }
  render() {
    return (
      <View>
      <Text>Images uploaded by you</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userpics: state.userposts,
    curruser: state.user,
    dbref: state.dbRef
  };
};

export default connect(mapStateToProps, actions)(UserProfile);
