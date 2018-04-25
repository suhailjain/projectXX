import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const styles = {
  rate: {
    alignSelf: 'center'
  },
  comment: {
    alignSelf: 'center'
  }
};
class FeedbackOptions extends Component {
  constructor() {
    super();
    this.state = { text: '' };
  }
  render() {
    return (
      <View>
        <Text style={styles.rate}>Rate</Text>
        <Text style={styles.comment}>Comments</Text>
        <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 2 }}
        onChangeText={(text) => this.setState({ text })}
        value={this.state.text}
        />
      </View>
    );
  }
}

export default connect(null, actions)(FeedbackOptions);
