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
});
let user = '';
class EmailPass extends Component {
  constructor() {
    super();
    this.state = { email: '', password: '', error: '', loggedIn: '' };
  }
  componentWillMount() {
    user = fbAccess.auth().currentUser.uid;
  }
  isUserSignedIn = () => {
    if (!((user !== null) && (user.uid !== '') && (user.uid !== 'none'))) {
      return (
        <View>
            <TextInput
             underlineColorAndroid="transparent"
             placeholder="Email"
             placeholderTextColor="#003366"
             autoCapitalize="none"
             onChangeText={this.handleEmail}
           />

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
      );
    } else {
        return (
          <View>
              <Button
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
