import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { Header, Icon } from 'react-native-elements';

export default class Aboutus extends Component {
  menuIcon() {
    return (
    <Icon name='menu' color='#663300' onPress={() => this.props.drawerState(false)} />
  );
}
  render() {
    return (
      <View>
      <Header
      backgroundColor='#003366'
      leftComponent={this.menuIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={{ icon: 'dots-three-vertical', color: '#fff' }}
      />
        <Text>about us</Text>
      </View>
    );
  }
}
