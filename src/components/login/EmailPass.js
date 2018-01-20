import React, { Component } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import UserProfile from '../common/UserProfile';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 1,
    alignItems: 'center',
    marginTop: 20,
  },
  email: {
    width: width * 0.85,
  },
  password: {
    marginTop: 10,
  },
  submit: {
    marginTop: 10,
  },
});
class EmailPass extends Component {
  constructor() {
    super();
    this.state = { email: '', password: '', error: '', loggedIn: '' };
  }
  isUserSignedIn = () => {
    const user = this.props.curruser;
    if (user === null || user === '' || user === 'none') {
      this.props.currentUser('none');
      return (
        <View>
        <View>
        <TextInput
          style={styles.email}
             underlineColorAndroid="transparent"
             placeholder="Email"
             placeholderTextColor="#003366"
             autoCapitalize="none"
             onChangeText={this.handleEmail}
        />
        </View>
        <View>
        <TextInput
          style={styles.password}
             underlineColorAndroid="transparent"
             placeholder="Password"
             placeholderTextColor="#003366"
             autoCapitalize="none"
             onChangeText={this.handlePassword}
        />
        <Button
        style={styles.submit}
        title='SignUp/Login'
        backgroundColor='#003366'
        onPress={() => this.login(this.state.email, this.state.password)}
        />
        </View>
        </View>
      );
    } else {
        return (
          <View>
          <Button
          style={styles.submit}
          title='logOut'
          backgroundColor='#003366'
          onPress={() => this.logout()}
          />
          <UserProfile />
          </View>
        );
    }
  }
  logout = () => {
    fbAccess.auth().signOut().then(() => Alert.alert('loggedOut successfuly'));
    this.props.currentUser('none');
    Actions.pop();
  }
  handleEmail = (text) => {
    this.setState({ email: text });
  }
  handlePassword = (text) => {
    this.setState({ password: text });
  }
  login = (email, pass) => {
    fbAccess.auth().signInWithEmailAndPassword(email, pass)
    .then(() => Alert.alert('you have loggedin successfuly'))
    .then(() => {
      this.props.currentUser(fbAccess.auth().currentUser.uid);
      Actions.pop();
    })
    .catch(() => {
      fbAccess.auth().createUserWithEmailAndPassword(email, pass)
      .then(() => Alert.alert('you have signedup successfuly!'))
      .then(() => {
        // message of signing up
        Actions.lobby();
      })
      .catch(() => {
        Alert.alert('something went wrong');
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
      {this.isUserSignedIn()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    curruser: state.user
  };
};

export default connect(mapStateToProps, actions)(EmailPass);
