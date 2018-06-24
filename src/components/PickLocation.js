import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { Button, Header, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';
import store from '../store';
import fbAccess from './FirebaseConfig';

const FBSDK = require('react-native-fbsdk');

const {
  AccessToken
} = FBSDK;

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  outerContainer: {
    backgroundColor: '#ededed',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    borderRadius: 5,
    width: width * 0.8,
    height: height * 0.24,
  },
  container: {
    flex: 1,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginLeft: 7,
    marginTop: 7,
    marginRight: 7,
    marginBottom: 7,
  },
});

const { width, height } = Dimensions.get('window');

class PickLocation extends Component {
  constructor() {
    super();
    if (fbAccess.auth().currentUser !== null) {
      this.props.loginStatus('email');
      this.props.userId(fbAccess.auth().currentUser.uid);
    }
    AccessToken.getCurrentAccessToken().then((resp) => {
      if (resp !== null) {
        this.props.loginStatus('facebook');
        this.props.userId(resp.userID);
        console.log('fb user id: ', resp.userID);
    }
  });
  }
  title() {
    return (
      <Text style={{ color: '#ffffff', fontSize: 42, fontWeight: 'bold' }}>
         my app
      </Text>
    );
  }

  render() { console.log('render');
    return (
        <View style={styles.base}>
        <Header
        statusBarProps={{ barStyle: 'light-content' }}
        backgroundColor='#003366'
        centerComponent={this.title()}
        outerContainerStyles={{ flex: 0.4, justifyContent: 'center' }}
        />
        <View
        style={styles.outerContainer}
        >
        <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: 'file:///Users/suhailjain/Library/Developer/CoreSimulator/Devices/DB8029F7-CD06-4792-A938-724F6B4367F7/data/Containers/Data/Application/1076F8D6-4EC1-4686-B435-FDBF02ECA45C/Library/Caches/crazyAF.jpg' }}
        />
        <Button
        large
        transparent
        textStyle={{ color: '#663300' }}
        title='Rohini'
        onPress={() => {
          console.log(store.getState());
          this.props.selectLocation('Rohini');
          this.props.postUrl('https://unityone-65a80.firebaseio.com/posts.json');
          this.props.likeUrl('https://unityone-65a80.firebaseio.com/posts');
          this.props.storeUrl('https://unityone-65a80.firebaseio.com/rohiniShop.json');
          this.props.foodUrl('https://unityone-65a80.firebaseio.com/rohiniFood.json');
          this.props.dbRef('/posts');
          this.props.eventUrl('https://unityone-65a80.firebaseio.com/rEvents.json');
          Actions.lobby();
        }}
        />
        <Divider style={{ backgroundColor: '#003366', marginRight: width / 5, marginLeft: width / 5 }} />
        <Button
        large
        transparent
        textStyle={{ color: '#663300' }}
        title='Janakpuri' onPress={() => {
        /*  store.dispatch({
            type: 'inc'
          });
          */
          console.log(store.getState());
          this.props.selectLocation('Janakpuri');
          this.props.postUrl('https://unityone-65a80.firebaseio.com/jPosts.json');
          this.props.likeUrl('https://unityone-65a80.firebaseio.com/jPosts');
          this.props.storeUrl('https://unityone-65a80.firebaseio.com/janakpuriShop.json');
          this.props.foodUrl('https://unityone-65a80.firebaseio.com/janakpuriFood.json');
          this.props.dbRef('/jPosts');
          this.props.eventUrl('https://unityone-65a80.firebaseio.com/jEvents.json');
          Actions.lobby();
        }}
        />
        <Divider style={{ backgroundColor: '#003366', marginRight: width / 5, marginLeft: width / 5 }} />
        <Button
        large
        transparent
        textStyle={{ color: '#663300' }}
        title='Shahadra' onPress={() => {
          NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
          });
          console.log(store.getState());
          this.props.selectLocation('Shahadra');
          this.props.postUrl('https://unityone-65a80.firebaseio.com/sPosts.json');
          this.props.likeUrl('https://unityone-65a80.firebaseio.com/sPosts');
          this.props.storeUrl('https://unityone-65a80.firebaseio.com/shahdraShop.json');
          this.props.foodUrl('https://unityone-65a80.firebaseio.com/shahdraFood.json');
          this.props.dbRef('/sPosts');
          this.props.eventUrl('https://unityone-65a80.firebaseio.com/sEvents.json');
          Actions.lobby();
        }}
        />
        </View>
        </View>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locate: state.currentLocation
  };
};

export default connect(mapStateToProps, actions)(PickLocation);
