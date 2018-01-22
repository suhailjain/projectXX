import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import fbAccess from '../FirebaseConfig';
import * as actions from '../../actions';
import UserPicture from '../secondary/UserPicture';

const styles = StyleSheet.create({
  heading: {
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

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
  renderSeparator() {
      return (
        <View
          style={{
            height: 50,
            width: 4,
            backgroundColor: "#ededed",
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
      );
    }
  render() {
    console.log(this.props.userpics);
    return (
      <View>
      <Text>Images uploaded by you</Text>
      <ScrollView
      contentContainerStyle={{ marginBottom: 20 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      >
      <FlatList
        data={this.props.userpics}
        horizontal={true}
        renderItem={({ item }) => <UserPicture pic={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={this.renderSeparator}
        contentContainerStyle={{
      }}
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
