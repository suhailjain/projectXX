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
    <View style={styles.buttonCont}>
    <Button
    style={styles.button}
    transparent={true}
    textStyle={styles.text}
    title={this.props.store.brand}
    onPress={() => {
      this.viewModal();
    }}
    />
    </View>
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
  buttonCont: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  button: {
    backgroundColor: '#ffffff'
  },
  text: {
    color: '#003366'
  },
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
    borderWidth: 1,
    borderColor: '#d0d0d0'
  },
});


export default Food;
