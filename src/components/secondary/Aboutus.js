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
  <Icon name='navigate-before' color='#663300' underlayColor='#003366' onPress={() => Actions.pop()} />
  );
}
  render() {
    return (
      <View style={styles.container}>
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

export default connect(null, actions)(Aboutus);
