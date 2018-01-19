import React, { Component } from 'react';
import { Image, Text, View, TextInput, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import UploadCard from '../common/UploadCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {},
  upload: {},
  retry: {},
  imput: {}
});

class ConfirmUploadView extends Component {
  constructor() {
    super();
    this.state = { title: '' };
  }
  title = (text) => {
    this.setState({ title: text });
  }
  render() {
    return (
      <View style={styles.container}>
      <UploadCard uri={this.props.pic.node.image.uri} title={this.state.title} />
      <View style={styles.innerContainer} >
      <Image
        style={{ width: 300,
        height: 300 }}
        source={{ uri: this.props.pic.node.image.uri }}
      />
      <TextInput
           underlineColorAndroid="transparent"
           placeholder="what makes unity special ?"
           placeholderTextColor="#9a73ef"
           autoCapitalize="none"
           onChangeText={this.title}
      />
      </View>
      </View>
    );
  }
}

export default ConfirmUploadView;
