import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Header, Icon } from 'react-native-elements';
import * as actions from '../../actions';
import BackFab from '../../fabs/BackFab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  heading: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  para: {
    marginTop: 20,
    fontSize: 14,
    alignItems: 'center',
  }
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
      <Button warning><Text> Warning </Text></Button>
        <Text style={styles.heading}>Unity One</Text>
        <Text style={styles.para}>We at unity one are trying to build a bridge between services we
        have to offer and the experience which our users enjoy at our three premier
        locations Rohini, Janakpuri and Shahdra.</Text>
        <BackFab />
      </View>
    );
  }
}

export default connect(null, actions)(Aboutus);
