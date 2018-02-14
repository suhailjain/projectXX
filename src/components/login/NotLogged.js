import { View, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { Icon, Header, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import fbAccess from '../FirebaseConfig';
import Logged from './Logged';

const styles = StyleSheet.create({
  submit: {
    paddingTop: 20
  },
  email: {
    marginLeft: 7,
    marginRight: 7,
    marginTop: 20
  },
  pass: {
    marginTop: 10,
    marginLeft: 7,
    marginRight: 7,
  },
  loginContainer: {
    flex: 1,
    marginRight: 7,
    marginLeft: 7,
    marginTop: 7,
    borderColor: '#d0d0d0',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  logout: {
    backgroundColor: '#ffffff',
    paddingBottom: 5,
    paddingTop: 5,
    marginRight: 7,
    marginLeft: 7,
    marginTop: 7,
    borderColor: '#d0d0d0',
    borderWidth: 1
  },
  activityIndicator: {
    flex: 1
  }
});
let status = false;
class NotLogged extends Component {

  constructor() {
    super();
    this.state = { email: '', password: '', error: '', loggedIn: false, loading: false };
  }

  handleEmail = (text) => {
    this.setState({ email: text });
  }

  handlePassword = (text) => {
    this.setState({ password: text });
  }

  newState() {
    console.log(this.state.loggedIn);
    if (this.state.loggedIn) {
      Actions.logged();
    } else {
      return;
    }
  }

  login = (email, pass) => {
    this.setState({ loading: !this.state.loading });
    fbAccess.auth().signInWithEmailAndPassword(email, pass)
    .then(() => {
      this.setState({ loading: !this.state.loading, loggedIn: true });
      status = true;
      //Actions.logged();
      //Alert.alert('you have loggedin successfuly');
    })
    .catch(() => {
      console.log('hi');
      fbAccess.auth().createUserWithEmailAndPassword(email, pass)
      .then(() => {
        status = false;
    })
    .catch(() => {
        Alert.alert('something went wrong');
      });
    });
  }

  menuIcon() {
    return (
      <Icon
      name='navigate-before'
      color='#663300'
      underlayColor='#003366'
      onPress={() => Actions.pop()}
      />
    );
  }

  rightIcon() {
    return (
      <Icon
      name='local-parking' color='#663300' underlayColor='#003366' onPress={() => {
        this.props.cameraFace('back');
        Actions.camera();
      }}
      />
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
      <Header
      backgroundColor='#003366'
      leftComponent={this.menuIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={this.rightIcon()}
      />
        <View style={styles.loginContainer}>
          <View style={styles.email}>
          <TextInput
           underlineColorAndroid="transparent"
           placeholder="Email"
           placeholderTextColor="#003366"
           autoCapitalize="none"
           onChangeText={this.handleEmail}
          />
          <View
            style={{
              height: 2,
              width: '100%',
              backgroundColor: '#003366',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
          </View>

          <View style={styles.pass}>
          <TextInput
           style={styles.password}
           underlineColorAndroid="transparent"
           placeholder="Password"
           placeholderTextColor="#003366"
           autoCapitalize="none"
           onChangeText={this.handlePassword}
          />
          <View
            style={{
              height: 2,
              width: '100%',
              backgroundColor: '#003366',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
          </View>

       <Button
        style={styles.submit}
        title='SignUp/Login'
        backgroundColor='#003366'
        onPress={() => this.login(this.state.email, this.state.password)}
       />
       <ActivityIndicator
                animating={this.state.loading}
                color='#bc2b78'
                size='large'
                style={styles.activityIndicator}
       />
       {this.newState()}
      </View>
      </View>
    );
  }
}

export default NotLogged;
