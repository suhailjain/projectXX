import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../actions';
import UserPicture from '../secondary/UserPicture';
import fbAccess from './../FirebaseConfig';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    marginLeft: 7,
    marginRight: 7,
    alignItems: 'center',
    marginBottom: 7,
    borderColor: '#d0d0d0',
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  heading: {
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 10,
  },
  request: {

  }
});

const FBSDK = require('react-native-fbsdk');

const {
  ShareDialog,
} = FBSDK;

const shareLinkContenty = {
  contentType: 'link',
  contentUrl: 'https://facebook.com',
  contentDescription: 'Wow, check out this great site!',
};

class UserProfile extends Component {
  constructor() {
    super();
    this.state = { shareLinkContent: shareLinkContenty, isFetching: false };
  }
  onRefresh() {
    console.log('refreshing');
    const fbdb = fbAccess.database();
    let userPics = [];
    fbdb.ref(this.props.dbref).orderByChild('likes')
    .on('child_added', (snapshot) => {
      //reversing the like order and check for approved
     if (fbAccess.auth().currentUser != null) {
      if (snapshot.val().user === fbAccess.auth().currentUser.uid) {
        userPics.unshift(snapshot.val());
        this.props.userPics(userPics);
      }
    }
  });
  this.setState({ isFetching: false });
  console.log(userPics);
  return userPics;
  }

  shareLinkWithShareDialog() {
  const tmp = this;
  ShareDialog.canShow(this.state.shareLinkContent).then((canShow) => {
      if (canShow) {
        return ShareDialog.show(tmp.state.shareLinkContent);
      }
    }
  ).then((result) => {
      if (result.isCancelled) {
        Alert.alert('Share cancelled');
      } else {
        Alert.alert('Share success with postId: '
          + result.postId);
      }
    },
    (error) => {
      Alert.alert('Share fail with error: ' + error);
    }
  );
 }

  resolveApproval() {
    if (this.props.approvalStat === 'Y') {
      return 'congratulations, its approved with likes :';
    } else if (this.props.approvalStat === 'N') {
      return 'pending...';
    } else if (this.props.approvalStat === '') {
      return 'select an image to get its approval status';
    }
  }
    userHasPictures() {
      console.log(this.props.userpics);
      if (this.props.userpics === '' || this.props.userpics.size === 0) {
        return (
          <View style={styles.container}>
            <Text>we would love to see you here!</Text>
            <Text>add you first unity selfie here</Text>
            <Button
            title='Cool'
            transparent
            textStyle={{ color: '#003366' }}
            onPress={() => Actions.camera()}
            />
          </View>
        );
      } else {
      return (
        <View>
          <View style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: 7 }}>
                <Text style={{ fontSize: 16 }}>Images uploaded by you</Text>
                  <View
                    style={{
                    height: 1,
                    width: '70%',
                    backgroundColor: '#000000',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  />
            </View>

            <ScrollView
            contentContainerStyle={{ marginLeft: 15, marginRight: 15, marginBottom: 10, marginTop: 70 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            >
            <FlatList
            refreshing={this.state.isFetching}
            onRefresh={() => {
              this.onRefresh.bind();
            }}
            data={this.props.userpics}
            horizontal={true}
            renderItem={({ item }) => <UserPicture pic={item} />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.renderSeparator}
            contentContainerStyle={{ alignItems: 'center'
            }}
            />
            </ScrollView>

        </View>
        <View style={styles.container}>
        <Text>{this.resolveApproval()}</Text>
        <Text>{this.props.likesCount}</Text>
        <Button
        transparent
        textStyle={{ color: '#003366' }}
        title='request a faster approval process'
        onPress={() => console.log('submit')}
        style={styles.request}
        />
        <Button
        title='share'
        transparent
        textStyle={{ color: '#003366' }}
        onPress={() => this.shareLinkWithShareDialog()}
        />
        </View>
        </View>
      );
    }
    }
    renderSeparator() {
        return (
          <View
            style={{
              height: 120,
              width: 4,
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
        );
      }
  render() {
    return (
      <View>
      {this.userHasPictures()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userpics: state.userposts,
    curruser: state.user,
    dbref: state.dbRef,
    selected: state.carousel,
    approvalStat: state.approvalstatus,
    likesCount: state.likecount
  };
};

export default connect(mapStateToProps, actions)(UserProfile);
