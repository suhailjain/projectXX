import React, { Component } from 'react';
import { View, TextInput, Alert, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import UserProfile from '../common/UserProfile';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
              <View style={styles.logout}>
              <Button
                  title='Log out'
                  textStyle={{ color: '#003366' }}
                  backgroundColor='#ffffff'
                  onPress={() => this.logout()}
              />
              </View>
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
