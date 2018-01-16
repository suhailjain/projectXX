import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Tile } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';
import fbAcess from './FirebaseConfig';

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
let urlBackground = [];
class Menu extends Component {
  constructor() {
    super();
    this.state = { shop: { url: '' } };
  }
  componentWillMount() {
    console.log('there?');
    fbAcess.database().ref('/backgrounds').on('child_added', (snapshot) => {
      console.log(snapshot.val());
      urlBackground.push(snapshot.val());
  });
  }
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
    <Tile
   imageSrc={{ uri: urlBackground.pop() }}
   title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
   featured
   caption="Some Caption Text"
    />

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

    <Button title='Park Assist' onPress={() => {
      this.props.cameraFace('back');
      Actions.camera();
    }}
    />
    </View>
  );
}
}

export default connect(null, actions)(Menu);
