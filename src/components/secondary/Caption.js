import React, { Component } from 'react';
import { TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const { width, height } = Dimensions.get('window');

class Caption extends Component {
  constructor() {
    super();
    this.state = { title: '' };
  }
  title = (text) => {
    if (this.state.title.length >= 60) {
      console.log('shorter the better');
    } else {
    this.setState({ title: text });
    this.props.caption(text);
    }
  }
  render() {
    console.log('render');
    return (
      <TextInput
        multiline
        numberOfLines={4}
        maxLength={70}
        selectionColor='#ffffff'
        style={{ flex: 0.27, fontSize: 24, borderRadius: 8, color: '#ffffff' }}
        placeholder="Did i tell you that adding a caption makes getting approvals easier?"
        placeholderTextColor="#ffffff"
        autoCapitalize="none"
        onChangeText={this.title}
      />
    );
  }
}

export default connect(null, actions)(Caption);
