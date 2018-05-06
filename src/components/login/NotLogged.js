import React, { Component } from 'react';
import { View, Text, Dimensions, Alert, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Jiro } from 'react-native-textinput-effects';
import fbAccess from '../FirebaseConfig';
import * as actions from '../../actions';
import SignUp from './SignUp';

const { widtht } = Dimensions.get('window');

const FBSDK = require('react-native-fbsdk');

const {
LoginButton,
AccessToken
} = FBSDK;

const styles = {
  outerContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  login: {
    marginTop: 20,
    width: widtht,
    backgroundColor: '#034A9C',
    borderRadius: 15
  },
  text: {
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 18,
  }
};
class NotLogged extends Component {
  constructor() {
    super();
    this.state = { email: '', password: '', error: '', loading: false, signup: false };
  }

  handleEmail = (text) => {
    console.log(text);
    this.setState({ email: text });
  }

  handlePassword = (text) => {
    console.log(text);
    this.setState({ password: text });
  }

  login = (email, pass) => {
    this.setState({ loading: !this.state.loading });
    fbAccess.auth().signInWithEmailAndPassword(email, pass)
    .then(() => {
        this.props.userId(fbAccess.auth().currentUser.uid);
        this.props.loginStatus('email');
        //this.setState({ loading: !this.state.loading, loggedIn: true });
        //update user total login and last login time here
    })
    .catch((error) => {
      console.log(error);
      fbAccess.auth().createUserWithEmailAndPassword(email, pass)
      .then(() => {
        const sessionId = new Date().getTime();
        fbAccess.database().ref('users').child(fbAccess.auth().currentUser.uid).set({
            badge: 'noobie',
            jfeedback: 0,
            rfeedback: 0,
            sfeedback: 0,
            jpics: 0,
            rpics: 0,
            spics: 0,
            lastLogin: `${sessionId}`,
            totalLogins: 1,
            type: 'email'
          });
          this.props.loginStatus('email');
          this.props.userId(fbAccess.auth().currentUser.uid);
          //this.setState({ loading: !this.state.loading, loggedIn: true });
    })
    .catch(() => {
      this.setState({ loading: !this.state.loading });
        Alert.alert('something went wrong');
      });
    });
  }

  resetPass = (email) => {
    /*fbAccess.auth.sendPasswordResetEmail(email).then(() => {
        Alert.alert('you will soon recieve an email to reset you password.');*/
        fbAccess.database().ref('/resetPassword').push(email: email)
        .then(() => Alert.alert('you will soon recieve an email to reset you password.'))
        .catch((error) => {
        console.log(error);
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.outerContainer}>
        <View style={styles.container}>
        <Jiro
          label={'Email'}
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
        // this is used as active and passive border color
          borderColor={'#86A3C4'}
          inputStyle={{ color: 'white' }}
        />
        <Jiro
          label={'Password'}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
        // this is used as active and passive border color
          borderColor={'#86A3C4'}
          inputStyle={{ color: 'white' }}
        />
          <Button
            onPress={() => {
              this.login(this.state.email, this.state.password);
            }}
            title='Login'
            textStyle={styles.text}
            buttonStyle={styles.login}
          />
          <TouchableOpacity onPress={() => {
            this.props.signupmodal(true);
          }}>
          <Text
            style={{
            paddingTop: 5,
            paddingBottom: 5,
            alignSelf: 'center' }}
          >
            Sign Up
          </Text>
          </TouchableOpacity>
          <Text
            style={{
            paddingTop: 30,
            paddingBottom: 30,
            alignSelf: 'center' }}
          >
            - or -
          </Text>
          <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                Alert.alert('login has error: ' + result.error);
              } else if (result.isCancelled) {
                Alert.alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
              (data) => {
                  this.props.loginStatus('facebook');
                  this.props.userId(data.userID);
                  console.log('fb user id: ', data.userID);
                  }
              );
              }
            }
          }
            onLogoutFinished={() => {
              this.props.userId(0);
              Alert.alert('logout.');
          }}
          />
          <ActivityIndicator
                animating={this.state.loading}
                color='#bc2b78'
                size='large'
                style={styles.activityIndicator}
          />
       <SignUp visible={this.props.visible} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    dbref: state.dbRef,
    userid: state.userId,
    visible: state.signup
  };
};

export default connect(mapStateToProps, actions)(NotLogged);
