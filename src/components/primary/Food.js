import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

class Food extends Component {
  constructor() {
    super();
    this.state = { modalVisible: false };
  }

  viewModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }


  render() {
  return (
    <View style={styles.container}>
    <Button
    title={this.props.store.brand}
    onPress={() => {
      this.viewModal();
    }}
    />
    <Modal
    backdropOpacity={0.8}
    onBackdropPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
    isVisible={this.state.modalVisible}
    >
          <View style={styles.modalView} >
            <Text>find this store at</Text>
            <Text>{this.props.store.floor}</Text>
            <Text>Ongoing Offers</Text>
            <Text>{this.props.store.offer}</Text>
            <TouchableOpacity onPress={this.viewModal}>
              <Text>Hide me!</Text>
            </TouchableOpacity>
          </View>
    </Modal>
    </View>
  );
}
}

const styles = StyleSheet.create({
  modalContainer: {
    width: width * 0.9,
    height: height * 0.6,
  },
  modalView: {
    width: width * 0.9,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bab9bf',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});

export default Food;
