import React, { Component } from 'react';
import { View, Platform, Alert, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
import { connect } from 'react-redux';
import Button from './Button';
import fbAccess from '../FirebaseConfig';

const storage = fbAccess.storage();
const db = fbAccess.database();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, location, dbref, title, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = storage.ref(location).child(`${sessionId}`);
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
        let key = 0;
        let dbhouse = '';
        axios.get('https://unityone-65a80.firebaseio.com/IndexKeys.json')
        .then(response => { /* get the index*/
          switch (location) {
            case 'Rohini': {
              dbhouse = 'posts';
              key = response.data.posts.index;
              break;
            }
            case 'Janakpuri': {
              dbhouse = 'jposts';
              key = response.data.jposts.index;
              break;
            }
            case 'Shahadra': {
              dbhouse = 'sposts';
              key = response.data.sposts.index;
              break;
            }
            default:
              key = 0;
          }
        })
        .then(() => db.ref(dbref).child(key).set({ url: url, likes: 0, id: key, approved: 'N', title: title })) /* push new record */
        .then(() => {
          db.ref(`/IndexKeys/${dbhouse}`).update({ index: key + 1 });
        }) /* increment the index */
        .then(() => Actions.gallery())
        .then(() => Alert.alert('your selfie is uploaded and is awaiting authority approval.'));
        })
        .catch((error) => {
        reject(error);
    });
    console.log('end of upload');
  });
};

class UploadCard extends Component {
  render() {
    const { container, upload, retry } = styles;
    return (
      <View>
        <View style={container}>
          <Button onPress={() => uploadImage(this.props.uri, this.props.locate, this.props.dbref, this.props.title)} style={upload} >
            upload
          </Button>
        </View>
        <View>
          <Button onPress={() => Actions.camera()} style={retry} >
            Retry
          </Button>
        </View>
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
};

const mapStateToProps = state => {
  return {
    locate: state.currentLocation,
    dbref: state.dbRef,
  };
};

export default connect(mapStateToProps)(UploadCard);
