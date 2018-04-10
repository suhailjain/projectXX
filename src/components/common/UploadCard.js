import React, { Component } from 'react';
import { View, Platform, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
import { Header, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import fbAccess from '../FirebaseConfig';
import * as actions from '../../actions';
import Spinner from './Spinner';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class UploadCard extends Component {

  constructor() {
    super();
    this.state = { loading: false, loggedIn: true };
  }
  uploadImage(uri, location, dbref, title, user, type, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      this.props.progress(0.1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const sessionId = new Date().getTime();
      let uploadBlob = null;
        this.props.progress(0.3);
      const imageRef = fbAccess.storage().ref(location).child(`${sessionId}.jpg`);
      console.log('start of upload');
        this.props.progress(0.6);
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
        })
        .catch((error) => console.log('could not upload: ', error));
          this.props.progress(0.8);
      });
  }
  leftIcon() {
    return (
    <Icon
    name='delete'
    color='#663300' underlayColor='#ededed'
    onPress={() => Actions.popTo('gallery')}
    />
  );
  }
  rightIcon() {
    return (
    <Icon
    name='done'
    color='#663300' underlayColor='#ededed'
    onPress={() => {
      this.uploadImage(this.props.uri, this.props.locate, this.props.dbref, this.props.captiontext, this.props.userid, this.props.usertype)
      .then(() => {
        console.log('updated');
        this.props.progress(1);
        Actions.popTo('gallery')
        Alert.alert('your selfie is uploaded and is awaiting authority approval.');
      });
    }}
    />
  );
  }

  render() {
    return (
      <View>
      <Header
      backgroundColor='#003366'
      leftComponent={this.leftIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={this.rightIcon()}
      />
      <Spinner loading={this.state.loading} />
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
    userid: state.userId,
    usertype: state.loginStatus,
    captiontext: state.caption
  };
};

export default connect(mapStateToProps, actions)(UploadCard);
