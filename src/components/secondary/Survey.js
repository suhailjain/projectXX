import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { Header, Icon, Button } from 'react-native-elements';

export default class Survey extends Component {
  menuIcon() {
    return (
    <Icon name='navigate-before' color='#663300' underlayColor='#003366' onPress={() => Actions.pop()} />
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
        <Text>survey</Text>
      </View>
    );
  }
}
