import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { Header, Icon, Button } from 'react-native-elements';
import EmailPass from '../login/EmailPass';

export default class SocialConnect extends Component {
  menuIcon() {
    return (
    <Icon name='menu' color='#663300' onPress={() => this.props.drawerState(false)} />
  );
}
  render() {
    return (
      <View style={{ paddingTop: 20 }}>
      <Header
      backgroundColor='#003366'
      leftComponent={this.menuIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={{ icon: 'dots-three-vertical', color: '#fff' }}
      />
        <EmailPass />
      </View>
    );
  }
}
