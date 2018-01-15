import React, { Component } from 'react';
import { View, FlatList, ScrollView, List, Image, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class MovieItem extends Component {
  render() {
    console.log(this.props.movie.url);
    return (
      <Card
        title={this.props.movie.title}
        image={{ uri: this.props.movie.url }}
      >
        <Text style={{ marginBottom: 10 }}>
           {this.props.movie.about}
        </Text>
        <Button
          backgroundColor='#03A9F4'
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='Show Time'
          onPress={() => {
            this.props.currentMovieVisible(true);
            this.props.movieSelected(this.props.movie);
          }}
        />
      </Card>
    );
  }
}

export default connect(null, actions)(MovieItem);
