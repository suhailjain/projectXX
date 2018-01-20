import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import fbAccess from '../FirebaseConfig';
import * as actions from '../../actions';
import UserPicture from '../secondary/UserPicture';

class UserProfile extends Component {
  componentWillMount() {
    //get user specific images
    const fbdb = fbAccess.database();
    console.log(this.props.curruser);
    let userPics = [];
    fbdb.ref(this.props.dbref).orderByChild('likes')
    .on('child_added', (snapshot) => {
      if (this.props.curruser !== 'none') {
      if (snapshot.val().user === this.props.curruser) {
        console.log('equal');
        userPics.unshift(snapshot.val());
        this.props.userPics(userPics);
      }
    }
  });
  }
  render() {
    console.log(this.props.userpics);
    return (
      <View>
      <Text>Images uploaded by you</Text>
      <ScrollView
      contentContainerStyle={{ flex: 1, marginBottom: 20 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      >
      <FlatList
        data={this.props.userpics}
        horizontal={true}
        contentContainerStyle={{ flexDirection: 'row' }}
        renderItem={({ item }) => <UserPicture pic={item} />}
        contentContainerStyle={{ marginBottom: 20 }}
        keyExtractor={item => item.id}
      />
      </ScrollView>
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
