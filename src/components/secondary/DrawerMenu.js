import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon, Button } from 'react-native-elements';
import fbAccess from '../FirebaseConfig';
import * as actions from '../../actions';

//drawer close icon is here not in drawerModal.js

const styles = StyleSheet.create({
  containerOuter: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#003366',
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
      <Button
      icon={{ name: 'home' }}
      backgroundColor='#003366'
        title='Home'
        onPress={() => {
        props.drawerState(true);
        Actions.lobby();
        }}
      />
      <Button
      icon={{ name: 'movie' }}
      backgroundColor='#003366'
        title='Unity Clip'
        onPress={() => {
        props.drawerState(true);
        Actions.movie();
        }}
      />
      <Button
      icon={{ name: 'feedback' }}
      backgroundColor='#003366'
        title='Feedback'
        onPress={() => {
        if (loginCheck()) {
        Actions.feedback();
        } else {
        Alert.alert('login is must');
        }
        }}
      />
      <Button
      icon={{ name: 'note' }}
      backgroundColor='#003366'
        title='Surveys'
        onPress={() => {
          if (loginCheck()) {
          Actions.feedback();
        } else {
          Alert.alert('login is must');
        }
      }}
      />
      <Button
      icon={{ name: 'collections' }}
      backgroundColor='#003366'
        title='Gallery'
        onPress={() => {
        props.drawerState(true);
        Actions.gallery();
      }}
      />
      <Button
      icon={{ name: 'group' }}
      backgroundColor='#003366'
        title='Connect'
        onPress={() => {
        props.drawerState(true);
        Actions.connect();
      }}
      />
      <Button
      icon={{ name: 'info' }}
      backgroundColor='#003366'
        title='About'
        onPress={() => {
        props.drawerState(true);
        Actions.about();
      }}
      />
    </View>
    </View>
  );
};

export default connect(null, actions)(DrawerMenu);
