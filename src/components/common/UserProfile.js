import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
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
  GraphRequest,
 GraphRequestManager
} = FBSDK;

const sharePhoto = {
  imageUrl: 'file:///Users/suhailjain/Library/Developer/CoreSimulator/Devices/DB8029F7-CD06-4792-A938-724F6B4367F7/data/Containers/Data/Application/1076F8D6-4EC1-4686-B435-FDBF02ECA45C/Library/Caches/crazyAF.jpg',
  userGenerated: true,
  caption: 'hi'
};

const sharePhotoContent = {
  contentType: 'photo',
  photos: [sharePhoto]
};

const shareLinkContenty = {
  userGenerated: true,
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/Janakpuri%2F1516448888325?alt=media&token=2fcc8e97-2d3a-4163-807d-6757db64f1c7',
  caption: 'Wow, check out this great site!',
};

const dirs = RNFetchBlob.fs.dirs;
let path = '';
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { shareLinkContent: sharePhotoContent, isFetching: false, data: this.props.userpics };
  }

  onRefresh = () => {
    console.log('refreshing');
      this.setState({ isFetching: true });
    const fbdb = fbAccess.database();
    let userPics = [];
    fbdb.ref(this.props.dbref).orderByChild('likes')
    .on('child_added', (snapshot) => {
      //reversing the like order and check for approved
     if (fbAccess.auth().currentUser != null) {
      if (snapshot.val().user === fbAccess.auth().currentUser.uid) {
        userPics.unshift(snapshot.val());
      }
    }
  });
  this.setState({ isFetching: false, data: userPics });
  console.log(userPics);
};

responseInfoCallback(error: ?Object, result: ?Object) {
if (error) {
  Alert.alert('Error fetching data: ' + error.toString());
} else {
  Alert.alert('Success fetching data: ' + result.toString());
}
}

showApprovedOnes = () => {
  console.log('refreshing');
    this.setState({ isFetching: true });
  const fbdb = fbAccess.database();
  let userPics = [];
  fbdb.ref(this.props.dbref).orderByChild('likes')
  .on('child_added', (snapshot) => {
    //reversing the like order and check for approved
   if (fbAccess.auth().currentUser != null) {
    if (snapshot.val().user === fbAccess.auth().currentUser.uid && snapshot.val().approved === 'Y') {
      userPics.unshift(snapshot.val());
    }
  }
});
this.setState({ isFetching: false, data: userPics });
console.log(userPics);
};

shareLinkWithShareDialog() {
  console.log({ string: this.props.shareImage.url });
  const infoRequest = new GraphRequest(
    '/me/photos',
    {
      httpMethod: 'POST',
      parameters: {
        'url': { string: this.props.shareImage.url },
        'caption': { string: 'article' }
      }
    },
    this.responseInfoCallback,
  );
  new GraphRequestManager().addRequest(infoRequest).start();
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
      if (this.props.userpics === '' || this.props.userpics === [] || this.props.userpics.size === 0) {
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
            <FlatList
            refreshing={this.state.isFetching}
            onRefresh={this.onRefresh}
            data={this.state.data}
            horizontal
            renderItem={({ item }) => <UserPicture pic={item} />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.renderSeparator}
            contentContainerStyle={{ alignItems: 'center'
            }}
            ListFooterComponent={this.renderFooter}
            />
        </View>
        <View style={styles.container}>
        <Button
        title='my approved ones'
        onPress={this.showApprovedOnes}
        />
        <Button
        title='all my uploades'
        onPress={this.onRefresh}
        />
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

renderFooter() {
      console.log('rendering footer');

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
      <Text>end</Text>
      </View>
    );
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
    likesCount: state.likecount,
    shareImage: state.carousel
  };
};

export default connect(mapStateToProps, actions)(UserProfile);
