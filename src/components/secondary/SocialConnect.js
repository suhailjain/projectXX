import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Header, Icon, Button } from 'react-native-elements';
import EmailPass from '../login/EmailPass';
import * as actions from '../../actions';
import UserProfile from '../common/UserProfile';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed'
  },
});

class SocialConnect extends Component {
  menuIcon() {
    return (
    <Icon name='navigate-before' color='#663300' underlayColor='#003366' onPress={() => Actions.pop()} />
  );
}
rightIcon() {
  return (
    <Icon name='local-parking' color='#663300' underlayColor='#003366' onPress={() => {
      this.props.cameraFace('back');
      Actions.camera();
    }}
    />
  );
}
  render() {
    return (
      <View style={styles.container}>
      <Header
      backgroundColor='#003366'
      leftComponent={this.menuIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={this.rightIcon()}
      />
        <EmailPass />
      </View>
    );
  }
}

export default connect(null, actions)(SocialConnect);
