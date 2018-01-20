import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Tile } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';
import fbAcess from './FirebaseConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
    marginTop: 7,
    marginRight: 7,
    marginBottom: 7,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    backgroundColor: '#ffffff',
  },
  text: {
    color: '#003366',
    fontSize: 24,
    fontWeight: 'bold'
  },
});
let urlBackground = [];
class Menu extends Component {
  constructor() {
    super();
    this.state = { shop: { url: '' } };
  }
  componentWillMount() {
    fbAcess.database().ref('/backgrounds').on('child_added', (snapshot) => {
      urlBackground.push(snapshot.val());
  });
  }
  renderCinepolis() {
    if (this.props.location === 'Rohini') {
      return (
        <Button
        transparent={true}
        textStyle={styles.text}
        title='Cinepolis' onPress={() => {
          Actions.cinepolis();
        }}
        />
      );
    }
  }
  render() {
  return (
    <View style={styles.container}>
    <Button
    transparent={true}
    textStyle={styles.text}
    title='Shopping' onPress={() => {
    this.props.purpose(true);
      Actions.storelist();
    }}
    />

    <Button
    transparent={true}
    textStyle={styles.text}
    title='Food' onPress={() => {
    this.props.purpose(false);
      Actions.foodlist();
    }}
    />

    <Button
    transparent={true}
    textStyle={styles.text}
    title='Events' onPress={() => {
      Actions.events();
    }}
    />

    {this.renderCinepolis()}

    </View>
  );
}
}

export default connect(null, actions)(Menu);
