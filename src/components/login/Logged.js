import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Button, Icon, Header } from 'react-native-elements';
import UserProfile from '../common/UserProfile';
import fbAccess from '../FirebaseConfig';
import NotLogged from './NotLogged';

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

class Logged extends Component {

  constructor() {
    super();
    this.state = { loading: false, loggedIn: true };
  }

  componentWillMount() {

  }

  logout = () => {
    console.log('logging out of user: ', fbAccess.auth().currentUser.uid);
    this.setState({ loading: !this.state.loading });
    fbAccess.auth().signOut().then(() => {
      this.setState({ loading: !this.state.loading, loggedIn: !this.state.loggedIn });
      Actions.notlogged();
    });
  }

  menuIcon() {
    return (
      <Icon
      name='navigate-before'
      color='#663300'
      underlayColor='#003366'
      onPress={() => Actions.lobby()}
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
      <View style={{ backgroundColor: '#ededed' }}>
        <Header
          backgroundColor='#003366'
          leftComponent={this.menuIcon()}
          centerComponent={{ text: '', style: { color: '#fff' } }}
          rightComponent={this.rightIcon()}
        />
          <View style={styles.logout}>
          <Button
              title='Log out'
              textStyle={{ color: '#003366' }}
              backgroundColor='#ffffff'
              onPress={() => this.logout()}
          />
          </View>
          <UserProfile />
          <ActivityIndicator
                   animating={this.state.loading}
                   color='#bc2b78'
                   size='large'
                   style={styles.activityIndicator}
          />
      </View>
    );
  }
}

export default Logged;
