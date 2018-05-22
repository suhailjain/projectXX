import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon, Button, Avatar, Divider } from 'react-native-elements';
import fbAccess from '../FirebaseConfig';
import * as actions from '../../actions';

//drawer close icon is here not in drawerModal.js
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#003366',
    borderBottomLeftRadius: 9,
    borderTopLeftRadius: 9,
    paddingTop: 7,
    paddingBottom: 7
  },
  containerOuter: {
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7
  }
});

const DrawerMenu = (props) => {
  return (
    <View style={styles.containerOuter}>
    <View style={styles.row}>
      <Icon name='collections' iconStyle={{ marginLeft: 7, color: '#ffffff', marginRight: 5 }} />
      <TouchableOpacity
      onPress={() => {
      props.loggedMenu('gallery');
      props.drawerState(true);
      }}
      >
      <Text style={{ color: '#ffffff' }}>Images</Text>
      </TouchableOpacity>
    </View>
    <View
      style={{
        height: 7,
        width: width * 1,
        backgroundColor: 'transparent',
      }}
    />

    <View style={styles.row}>
    <Icon name='feedback' iconStyle={{ marginLeft: 7, color: '#ffffff', marginRight: 5 }} />
      <TouchableOpacity
      onPress={() => {
      props.loggedMenu('feedback');
      props.drawerState(true);
      }}
      >
      <Text style={{ color: '#ffffff' }}>Feedback</Text>
      </TouchableOpacity>
    </View>
    <View
    style={{
      height: 7,
      width: width * 1,
      backgroundColor: 'transparent',
    }}
    />

      <View style={styles.row}>
      <Icon name='group' iconStyle={{ marginLeft: 7, color: '#ffffff', marginRight: 5 }} />
      <TouchableOpacity
      onPress={() => {
        props.loggedMenu('stats');
        props.drawerState(true);
      }}
      >
      <Text style={{ color: '#ffffff' }}>Stats</Text>
      </TouchableOpacity>
      </View>
      <View
      style={{
        height: 15,
        width: width * 1,
        backgroundColor: 'transparent',
      }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    userid: state.fbUserID
  };
};

export default connect(mapStateToProps, actions)(DrawerMenu);
