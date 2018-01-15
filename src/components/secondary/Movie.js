import { Text, View, WebView } from 'react-native';
import React, { Component } from 'react';

export default class Movie extends Component {
  render() {
    return (
      <View>
      <WebView
          source={{ uri:
             'https://www.youtube.com/results?search_query=unity+one+mall' }}
      />
      </View>
    );
  }
}
