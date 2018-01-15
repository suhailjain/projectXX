import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Menu extends Component {
  renderCinepolis() {
    if (this.props.location === 'Rohini') {
      return (
        <Button title='Cinepolis' onPress={() => {
          Actions.cinepolis();
        }}
        />
      );
    }
  }
  render() {
  return (
    <View >

    <Button title='Shopping' onPress={() => {
    this.props.purpose('shopping');
      Actions.storelist();
    }}
    />

    <Button title='Food' onPress={() => {
    this.props.purpose('food');
      Actions.storelist();
    }}
    />

    {this.renderCinepolis()}

    <Button title='Park Assist' onPress={() => Actions.park()} />
    </View>
  );
}
}

export default connect(null, actions)(Menu);
