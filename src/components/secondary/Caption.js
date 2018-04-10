import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Caption extends Component {
  constructor() {
    super();
    this.state = { title: '' };
  }
  title = (text) => {
    this.setState({ title: text });
    this.props.caption(text);
  }
  render() {
    return (
      <TextInput
        underlineColorAndroid="transparent"
        placeholder="what makes unity special ?"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={this.title}
      />
    );
  }
}

export default connect(null, actions)(Caption);
