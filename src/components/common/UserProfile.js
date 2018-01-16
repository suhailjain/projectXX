import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class UserProfile extends Component {
  componentWillMount() {
    //get user specific images
  }
  render() {
    return (
      <View>
      <Text>Images uploaded by you</Text>
      </View>
    );
  }
}

export default connect()(UserProfile);
