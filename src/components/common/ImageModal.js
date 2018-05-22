import React, { Component } from 'react';
import { View, Text, Button, Image, Dimensions, TextInput, Platform } from 'react-native';
import Modal from 'react-native-modal';
import RNFetchBlob from 'react-native-fetch-blob';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';
import Caption from '../secondary/Caption';
import ProgressBar from './ProgressBar';

const { width, height } = Dimensions.get('window');

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const styles = {
  image: {
    flex: 0.7,
    paddingBottom: 0,
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff',
    borderRadius: 8
  }
};

class ImageModal extends Component {
  uploadImage(uri, location, dbref, title, user, type, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      this.props.progress(0.1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const sessionId = new Date().getTime();
      let uploadBlob = null;
        this.props.progress(0.3);
      const imageRef = fbAccess.storage().ref(location).child(`${sessionId}.jpg`);
      console.log('start of upload');
        this.props.progress(0.4);
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
              approvedAt: 0,
              lastLikedAt: 0
          });
        })
        .catch((error) => console.log('could not upload: ', error));
          this.props.progress(0.5);
      });
  }
  render() {
    console.log(this.props.cache);
    return (
      <Modal
        isVisible={this.props.visible}
        onBackdropPress={() => this.props.uploadscreen(false)}
        style={{ flex: 1, justifyContent: 'space-between' }}
      >
        <Caption />
        <ProgressBar />
        <Button
        title='send'
        onPress={() => {
          this.uploadImage(this.props.uri, this.props.locate, this.props.dbref, this.props.captiontext, this.props.userid, this.props.usertype)
          .then(() => {
            console.log('updated');
            this.props.progress(0.9);
            this.props.uploadscreen(false);
            this.props.progress(0);
            Actions.pop();
          });
        }}
        />
        <Image
          source={{ uri: this.props.uri }}
          style={styles.image}
        />

      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    uri: state.cache,
    locate: state.currentLocation,
    dbref: state.dbRef,
    userid: state.userId,
    usertype: state.loginStatus,
    captiontext: state.caption
  };
};

export default connect(mapStateToProps, actions)(ImageModal);
