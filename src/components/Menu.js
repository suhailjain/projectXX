import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';
import fbAcess from './FirebaseConfig';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  opacity: {
    marginTop: 5,
    marginLeft: 4,
    marginRight: 4
  },
  tiles: {
    width: width - 17,
    height: (height - 120) / 4
  },
  container: {
    marginLeft: 7,
    marginTop: 7,
    marginRight: 7,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    backgroundColor: '#ffffff',
  },
  text: {
    width: 200,
    marginLeft: 50,
    marginTop: 20,
    position: 'absolute',
    height: 200,
    backgroundColor: 'transparent'
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
        <View>
        <TouchableOpacity style={styles.container} onPress={() => Actions.cinepolis()}>
        <Image
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2Fcinepolisback.jpg?alt=media&token=a5e7c4c5-36db-4cdd-bdef-0f341317728f' }}
        style={styles.tiles}
        />
        <View style={styles.text}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ffffff' }}>Cinepolis</Text>
        </View>
        </TouchableOpacity>
        </View>
      );
    }
  }
  render() {
  return (
    <ScrollView
    contentContainerStyle={{ flex: 1, marginBottom: 30 }}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    >
    <View style={{}}>

    <TouchableOpacity style={styles.container} onPress={() => Actions.storelist()}>
    <Image
    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2Fshop.jpg?alt=media&token=cb50abfd-1bd6-4acb-9c87-d224ecf277d9' }}
    style={styles.tiles}
    />
    <View style={styles.text}>
    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ffffff' }}>Shopping</Text>
    </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.container} onPress={() => Actions.foodlist()}>
    <Image
    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2FFood.jpg?alt=media&token=cfac46b1-cc0d-4b2a-a4bf-4295f78bb861' }}
    style={styles.tiles}
    />
    <View style={styles.text}>
    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ffffff' }}>Food</Text>
    </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.container} onPress={() => Actions.events()}>
    <Image
    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/unityone-65a80.appspot.com/o/backgrounds%2FEvents.jpg?alt=media&token=19f5ffac-1cf3-42b9-bdef-b14b16aba758' }}
    style={styles.tiles}
    />
    <View style={styles.text}>
    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ffffff' }}>Events</Text>
    </View>
    </TouchableOpacity>
    {this.renderCinepolis()}
    </View>
    </ScrollView>
  );
}
}

export default connect(null, actions)(Menu);
