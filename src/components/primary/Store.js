import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

class Store extends Component {
  constructor() {
    super();
    this.state = { modalVisible: false };
  }

  render() {
    let style = {};
    if (this.props.index % 1 === 0) {
      style = styles.container;
    } else {
      style = styles.containerBig;
    }
  return (
    <TouchableOpacity
    onPress={() => { console.log('shop click'); }}
    style={style}
    >
      <Image
      source={{ uri: this.props.store.url }}
      style={{ flex: 1 }}
      />
    </TouchableOpacity>
  );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 0.490,
      height: 150,
      backgroundColor: '#ffffff'
    },
    containerBig: {
      flex: 0.490,
      height: 80,
      backgroundColor: '#ffffff'
    },
    text: {
      alignSelf: 'center'
    }
});

export default Store;
