import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  Image,
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
  },
  containerOuter: {
    flex: 1,
    backgroundColor: '#003366',
  },
  container: {
    flex: 0.8,
    justifyContent: 'center',
    marginLeft: 10,
    backgroundColor: '#003366',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const loginCheck = () => {
  console.log(fbAccess.auth().currentUser.uid);
  if (fbAccess.auth().currentUser !== null && (fbAccess.auth().currentUser.uid !== 'none')) {
  return true;
  } else {
    return false;
  }
};

const DrawerMenu = (props) => {
  return (
    <View style={styles.containerOuter}>
    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 30, marginRight: 10 }}>
    <Icon
    name='navicon'
    type='font-awesome'
    underlayColor='#003366'
    color='#ffffff'
    onPress={() => props.drawerState(true)}
    />
    </View>

    <View style={{ alignItems: 'center', marginTop: 60 }}>
    <TouchableOpacity
    onPress={() => {
        props.drawerState(true);
        Actions.locationPicker();
    }}
    >
    <Image
      style={{ width: 150, height: 150, borderRadius: 75 }}
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2FFood.jpg?alt=media&token=cfac46b1-cc0d-4b2a-a4bf-4295f78bb861' }}
    />
    </TouchableOpacity>
    </View>

    <View style={styles.container}>
    <View style={styles.row}>
      <Icon name='home' iconStyle={{ marginLeft: 5, color: '#ffffff' }} />
      <Button
      backgroundColor='#003366'
        title='Home'
        onPress={() => {
        props.drawerState(true);
        Actions.lobby();
        }}
      />
    </View>
    <View
      style={{
        height: 1,
        backgroundColor: "#ffffff",
        marginRight: 10
      }}
    />

    <View style={styles.row}>
      <Icon name='movie' iconStyle={{ marginLeft: 5, color: '#ffffff' }} />
      <Button
      backgroundColor='#003366'
        title='Unity Clip'
        onPress={() => {
        props.drawerState(true);
        Actions.movie();
        }}
      />
    </View>
    <View
      style={{
        height: 1,
        backgroundColor: "#ffffff",
        marginRight: 10
      }}
    />

    <View style={styles.row}>
      <Icon name='collections' iconStyle={{ marginLeft: 5, color: '#ffffff' }} />
      <Button
      backgroundColor='#003366'
        title='Unity Selfie'
        onPress={() => {
        props.drawerState(true);
        Actions.gallery();
      }}
      />
    </View>
    <View
      style={{
        height: 1,
        backgroundColor: "#ffffff",
        marginRight: 10
      }}
    />

    <View style={styles.row}>
    <Icon name='feedback' iconStyle={{ marginLeft: 5, color: '#ffffff' }} />
      <Button
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
    <View
      style={{
        height: 1,
        backgroundColor: "#ffffff",
        marginRight: 10
      }}
    />

      <View style={styles.row}>
      <Icon name='group' iconStyle={{ marginLeft: 5, color: '#ffffff' }} />
      <Button
      backgroundColor='#003366'
        title='Connect'
        onPress={() => {
        props.drawerState(true);
        Actions.connect();
      }}
      />
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "#ffffff",
          marginRight: 10
        }}
      />

      <View style={styles.row}>
      <Icon name='info' iconStyle={{ marginLeft: 5, color: '#ffffff' }} />
      <Button
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
