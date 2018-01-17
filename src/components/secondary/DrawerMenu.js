import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon, Button, Avatar } from 'react-native-elements';
import fbAccess from '../FirebaseConfig';
import * as actions from '../../actions';

//drawer close icon is here not in drawerModal.js
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  containerOuter: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#003366',
    height: height * 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003366',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const loginCheck = () => {
  if (fbAccess.auth().currentUser === null) {
  return false;
  } else {
    return true;
  }
};

const DrawerMenu = (props) => {
  return (
    <View style={styles.containerOuter}>
    <Icon
    name='navicon'
    type='font-awesome'
    underlayColor='#003366'
    color='#663300'
    iconStyle={{ marginTop: 30, marginRight: 20 }}
    onPress={() => props.drawerState(true)}
    />
    <View style={styles.container}>
    <Avatar
      large
      rounded
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2FFood.jpg?alt=media&token=cfac46b1-cc0d-4b2a-a4bf-4295f78bb861' }}
      onPress={() => {
        props.drawerState(true);
        Actions.locationPicker();
      }}
    />

    <View style={styles.row}>
      <Icon name='home' iconStyle={{ marginLeft: 5, color: '#ffffff' }} />
      <Button
      large
      backgroundColor='#003366'
        title='Home'
        onPress={() => {
        props.drawerState(true);
        Actions.lobby();
        }}
      />
    </View>

    <View style={styles.row}>
      <Icon name='movie' iconStyle={{ marginLeft: 5, color: '#ffffff' }} />
      <Button
      large
      backgroundColor='#003366'
        title='Unity Clip'
        onPress={() => {
        props.drawerState(true);
        Actions.movie();
        }}
      />
    </View>

    <View style={styles.row}>
      <Icon name='collections' iconStyle={{ marginLeft: 5, color: '#ffffff' }} />
      <Button
      large
      backgroundColor='#003366'
        title='Unity Selfie'
        onPress={() => {
        props.drawerState(true);
        Actions.gallery();
      }}
      />
    </View>

    <View style={styles.row}>
    <Icon name='feedback' iconStyle={{ marginLeft: 5, color: '#ffffff' }} />
      <Button
      large
      backgroundColor='#003366'
        title='Feedback'
        onPress={() => {
        if (loginCheck()) {
        props.drawerState(true);
        Actions.feedback();
        } else {
        Alert.alert('login is must');
        }
        }}
      />
    </View>

      <View style={styles.row}>
      <Icon name='group' iconStyle={{ marginLeft: 5, color: '#ffffff' }} />
      <Button
      large
      backgroundColor='#003366'
        title='Connect'
        onPress={() => {
        props.drawerState(true);
        Actions.connect();
      }}
      />
      </View>

      <View style={styles.row}>
      <Icon name='info' iconStyle={{ marginLeft: 5, color: '#ffffff' }} />
      <Button
      large
      backgroundColor='#003366'
        title='About'
        onPress={() => {
        props.drawerState(true);
        Actions.about();
      }}
      />
      </View>

    </View>
    </View>
  );
};

export default connect(null, actions)(DrawerMenu);
