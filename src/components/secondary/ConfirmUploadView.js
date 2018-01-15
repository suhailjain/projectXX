import React, { Component } from 'react';
import { Image, Text, View, TextInput } from 'react-native';
import UploadCard from '../common/UploadCard';

class ConfirmUploadView extends Component {
  constructor() {
    super();
    this.state = { title: '' };
  }
    //console.log(this.prop.pic);
    title = (text) => {
        this.setState({ title: text });
    }

    //console.log(this.props.pic.node.image.uri);
    render() {
    return (
      <View>
      <Text>confirm</Text>
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
      <UploadCard uri={this.props.pic.node.image.uri} title={this.state.title} />
      </View>
    );
  }
}
//source={{ uri: props.pic.node.image.uri }}
export default ConfirmUploadView;
