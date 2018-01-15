import { Text, View } from 'react-native';
import React, { Component } from 'react';
import EmailPass from '../login/EmailPass';

export default class SocialConnect extends Component {
  render() {
    return (
      <View style={{ paddingTop: 20 }}>
        <EmailPass />
      </View>
    );
  }
}
