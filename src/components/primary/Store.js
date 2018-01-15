import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Button from '../common/Button';

class Store extends Component {
  constructor() {
    super();
    this.state = { modalVisible: false };
  }

  viewModal = () => {
    console.log('hi');
    console.log(this.props.store);
    this.setState({ modalVisible: !this.state.modalVisible });
  }


  render() {
  return (
    <View>
    <Button onPress={() => {
      this.viewModal();
    }}>
      {this.props.store.brand}
    </Button>
    <Modal isVisible={this.state.modalVisible}>
          <View style={styles.modalView} >
            <Text>find this store at</Text>
            <Text>{this.props.store.floor}</Text>
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
  modalView: {
    flex: 1,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Store;
