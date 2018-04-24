import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Jiro } from 'react-native-textinput-effects';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';

const styles = {
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 13,
    backgroundColor: '#f4f2f5'
  }
};

class SignUp extends Component {
  constructor() {
    super();
    this.state = { email: '', name: '', number: '', password: '' };
  }
  signup() {
    //text inpiut validation should be placed here
      fbAccess.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const sessionId = new Date().getTime();
        fbAccess.database().ref('users').child(fbAccess.auth().currentUser.uid).set({
            badge: 'noobie',
            name: `${this.state.name}`,
            contact: `${this.state.contact}`,
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
          this.props.signupmodal(true);
          Actions.logged();
    })
    .catch(() => {
        Alert.alert('something went wrong');
      });
  }
  render() {
  return (
    <Modal
      isVisible={this.props.visible}
      avoidKeyboard={true}
      onBackdropPress={() => this.props.signupmodal(false)}
    >
    <View style={styles.container}>
    <Jiro
      label={'Email'}
      onChangeText={(text) => {
        this.setState({ email: text });
      }}
    // this is used as active and passive border color
      borderColor={'#336600'}
      inputStyle={{ color: 'white' }}
    />
    <Jiro
      label={'Name'}
      onChangeText={(text) => {
        this.setState({ name: text });
      }}
    // this is used as active and passive border color
      borderColor={'#336600'}
      inputStyle={{ color: 'white' }}
    />
    <Jiro
      label={'Contact'}
      onChangeText={(text) => {
        this.setState({ number: text });
      }}
    // this is used as active and passive border color
      borderColor={'#336600'}
      inputStyle={{ color: 'white' }}
    />
    <Jiro
      label={'Password'}
      onChangeText={(text) => {
        this.setState({ password: text });
      }}
    // this is used as active and passive border color
      borderColor={'#336600'}
      inputStyle={{ color: 'white' }}
    />
    <Button
    onPress={() => this.signup()}
    title='Register'
    />
    </View>
    </Modal>

  );
}
};

export default connect(null, actions)(SignUp);
