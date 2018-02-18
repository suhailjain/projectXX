import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon } from 'react-native-elements';
import * as actions from '../../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
});

class Aboutus extends Component {
  menuIcon() {
    return (
  <Icon name='navigate-before' color='#ededed' underlayColor='#003366' onPress={() => Actions.pop()} />
  );
}
rightIcon() {
  return (
    <Icon name='help' color='#ededed' underlayColor='#003366' onPress={() => {

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
        <Text>about us</Text>
      </View>
    );
  }
}

export default connect(null, actions)(Aboutus);
