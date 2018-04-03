import React, { Component } from 'react';
import { View, Platform, Alert, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
import { Header, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import fbAccess from '../FirebaseConfig';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, location, dbref, title, user, type, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = fbAccess.storage().ref(location).child(`${sessionId}`);
    console.log('start of upload');
    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
          fbAccess.database().ref(dbref).child(sessionId).set({
            url: url,
            likes: 0,
            id: `${sessionId}`,
            approved: 'N',
            title: title,
            user: `${user}`,
            userType: `${type}`,
            approvedAt: 0
        });
      });
    });
};

class UploadCard extends Component {

  constructor() {
    super();
    this.state = { loading: false, loggedIn: true };
  }

  leftIcon() {
    return (
    <Icon
    name='delete'
    color='#663300' underlayColor='#ededed'
    onPress={() => Actions.gallery()}
    />
  );
  }
  rightIcon() {
    return (
    <Icon
    name='done'
    color='#663300' underlayColor='#ededed'
    onPress={() => {
      let user;
      let type;
      this.setState({ loading: !this.state.loading });
      if (fbAccess.auth().currentUser != null) {
         user = fbAccess.auth().currentUser.uid;
         type = 'email';
      } else if (this.props.userid !== 0) {
        user = this.props.userid;
        type = 'facebook';
      }
      uploadImage(this.props.uri, this.props.locate, this.props.dbref, this.props.title, user, type)
      .then(() => {
        console.log('updated');
        this.setState({ loading: !this.state.loading });
        Alert.alert('your selfie is uploaded and is awaiting authority approval.');
        Actions.popTo('gallery');
      });
    }}
    />
  );
  }

  loader() {
    if (this.state.loading) {
    return (
      <ActivityIndicator
             animating={this.state.loading}
             color='#bc2b78'
             size='large'
             style={styles.activityIndicator}
      />
    );
  } else {
    return;
  }
  }

  render() {
    const { container, upload, retry } = styles;
    return (
      <View>
      <Header
      backgroundColor='#003366'
      leftComponent={this.leftIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={this.rightIcon()}
      />
      {this.loader()}
      </View>
    );
  }
}

const styles = {
  container: {
    height: 40,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  upload: {
    flexDirection: 'row'
  },
  retry: {
    flexDirection: 'row'
  },
  activityIndicator: {
      flex: 1
   }
};

const mapStateToProps = state => {
  return {
    locate: state.currentLocation,
    dbref: state.dbRef,
    userid: state.fbUserID
  };
};

export default connect(mapStateToProps)(UploadCard);
