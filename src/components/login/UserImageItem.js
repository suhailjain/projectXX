import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import FastImage from 'react-native-fast-image'
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../actions';

const styles = StyleSheet.create({
  smallImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000000',
    paddingTop: 7,
    paddingBottom: 7,
    paddingRight: 10,
    alignSelf: 'center',
    paddingLeft: 7
  },
  largeImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#000000'
  },
  card: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    height: 150,
    borderRadius: 6,
    borderWidth: 0.8,
    borderColor: '#000000',
  }
});

const FBSDK = require('react-native-fbsdk');

const {
  GraphRequest,
 GraphRequestManager
} = FBSDK;

class UserImageItem extends Component {
  responseInfoCallback(error: ?Object, result: ?Object) {
  if (error) {
    Alert.alert('Must be Bad network.');
  } else {
    Alert.alert('We have a surprise for you, go check FB.');
  }
  }
  shareLinkWithShareDialog(url) {
    console.log('fb sharing now, pic url: ', url);
    const infoRequest = new GraphRequest(
      '/me/photos',
      {
        httpMethod: 'POST',
        parameters: {
          'url': { string: url },
          'caption': { string: 'article' }
        }
      },
      this.responseInfoCallback,
    );
    new GraphRequestManager().addRequest(infoRequest).start();
   }
  render() {
    return (
      <View style={styles.card}>
      <View style={{ flex: 0.4, justifyContent: 'center' }}>
      <FastImage
        style={styles.smallImage}
        source={{
          uri: this.props.pic.url,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      </View>
      <View style={{ flex: 0.6, justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
      <Text style={{ fontSize: 12 }}>Likes: </Text>
      <Text style={{ fontSize: 10 }}>{this.props.pic.likes}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
      <Text style={{ fontSize: 12 }}>Status: </Text>
      <Text style={{ fontSize: 10, flexWrap: 'wrap', flex: 1 }}>{this.props.pic.approved}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
      <Text style={{ fontSize: 12 }}>Last liked at: </Text>
      <Text style={{ fontSize: 10, flexWrap: 'wrap', flex: 1 }}>{this.props.pic.lastLikedAt}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
      <Text style={{ fontSize: 12 }}>Title: </Text>
      <Text style={{ fontSize: 10, flexWrap: 'nowrap', flex: 1 }}>{this.props.pic.title}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
      <TouchableOpacity
      onPress={() => {
        this.shareLinkWithShareDialog(this.props.pic.url);
      }}
      >
      <Text style={{ alignSelf: 'center', fontSize: 16, color: '#034A9C', marginTop: 7 }}>Boast on FB</Text>
      </TouchableOpacity>
      </View>
      </View>
      </View>
    );
  }
}

export default UserImageItem;
