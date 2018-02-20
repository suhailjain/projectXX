import { View, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Header, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import fbAccess from '../FirebaseConfig';
import * as actions from '../../actions';

const FBSDK = require('react-native-fbsdk');

const {
LoginButton,
AccessToken
} = FBSDK;

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

  refreshUserPicList(dbref) {
    return new Promise((resolve) => {
        let userPics = [];
        const fbdb = fbAccess.database();
          console.log('refreshing for user:  ', fbAccess.auth().currentUser.uid);
        fbdb.ref(dbref).orderByChild('likes')
        .on('child_added', (snapshot) => {
          //reversing the like order and check for approved
          if (fbAccess.auth().currentUser != null) {
          if (snapshot.val().user === fbAccess.auth().currentUser.uid) {
            userPics.unshift(snapshot.val());
          }
        }
        });
        this.props.userPics(userPics);
         resolve();
});
}

  login = (email, pass) => {
    this.setState({ loading: !this.state.loading });
    fbAccess.auth().signInWithEmailAndPassword(email, pass)
    .then(() => {
      this.refreshUserPicList(this.props.dbref).then(() => Actions.logged());
      this.setState({ loading: !this.state.loading, loggedIn: true });
    })
    .catch(() => {
      fbAccess.auth().createUserWithEmailAndPassword(email, pass)
      .then(() => {
        this.setState({ loading: !this.state.loading, loggedIn: true });
        this.refreshUserPicList(this.props.dbref).then(() => Actions.logged());
    })
    .catch(() => {
      this.setState({ loading: !this.state.loading });
        Alert.alert('something went wrong');
      });
    });
  }

  menuIcon() {
    return (
      <Icon
      name='navigate-before'
      color='#ededed'
      underlayColor='#ededed'
      onPress={() => Actions.lobby()}
      />
    );
  }

  rightIcon() {
    return (
      <Icon
      name='local-parking' color='#ededed' underlayColor='#ededed' onPress={() => {
        this.props.cameraFace('back');
        Actions.camera();
      }}
      />
    );
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ededed' }}>
      <Header
      backgroundColor='#003366'
      leftComponent={this.menuIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={this.rightIcon()}
      />
        <View style={styles.loginContainer}>
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
                    Alert.alert(data.accessToken.toString());
                  }
                )
              }
            }
          }
          onLogoutFinished={() => Alert.alert('logout.')}
        />
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
      </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dbref: state.dbRef,
  };
};

export default connect(mapStateToProps, actions)(NotLogged);
