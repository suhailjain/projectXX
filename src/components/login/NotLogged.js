import React, { Component } from 'react';
import { View, Text, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { Form, Item, Input, Label } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import fbAccess from '../FirebaseConfig';
import BackFab from '../../fabs/BackFab';
import * as actions from '../../actions';

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
    backgroundColor: '#07969b',
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
    this.state = { email: '', password: '', error: '', loading: false };
  }

  handleEmail = (text) => {
    console.log(text);
    this.setState({ email: text });
  }

  handlePassword = (text) => {
    console.log(text);
    this.setState({ password: text });
  }

  refreshUserPicList(dbref) {
    let user;
    if (fbAccess.auth().currentUser != null) {
      user = fbAccess.auth().currentUser.uid;
    } else if (this.props.userid) {
      user = this.props.userid;
    }
    console.log(user);
    return new Promise((resolve) => {
        let userPics = [];
        const fbdb = fbAccess.database();
          console.log('refreshing for user:  ', fbAccess.auth().currentUser.uid);
        fbdb.ref(dbref).orderByChild('likes')
        .on('child_added', (snapshot) => {
          //reversing the like order and check for approved
        //  if (fbAccess.auth().currentUser != null) {
          if (snapshot.val().user === user) {
            userPics.unshift(snapshot.val());
          }
      //  }
        });
        this.props.userPics(userPics);
         resolve();
       });
  }

  login = (email, pass) => {
    console.log(email);
    this.setState({ loading: !this.state.loading });
    fbAccess.auth().signInWithEmailAndPassword(email, pass)
    .then(() => {
      this.props.loginStatus('email');
      this.props.userId(fbAccess.auth().currentUser.uid);
      this.refreshUserPicList(this.props.dbref).then(() => Actions.logged());
      this.setState({ loading: !this.state.loading, loggedIn: true });
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
          this.refreshUserPicList(this.props.dbref).then(() => Actions.logged());
          this.setState({ loading: !this.state.loading, loggedIn: true });
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
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Form>
           <Item floatingLabel>
             <Label>Email</Label>
             <Input
              onChangeText={this.handleEmail}
             />
           </Item>
           <Item floatingLabel last>
             <Label>Password</Label>
             <Input
              onChangeText={this.handlePassword}
             />
           </Item>
          </Form>
          <Button
            onPress={() => {
              this.login(this.state.email, this.state.password);
            }}
            title='Login'
            textStyle={styles.text}
            buttonStyle={styles.login}
          />
          <Text style={{
            paddingTop: 40,
            paddingBottom: 40,
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
              )
        .then(() => Actions.logged());
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
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dbref: state.dbRef,
    userid: state.fbUserID
  };
};

export default connect(mapStateToProps, actions)(NotLogged);
