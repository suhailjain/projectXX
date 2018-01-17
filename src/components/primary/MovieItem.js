import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import ShowTime from './ShowTime';
import * as actions from '../../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bab9bf'
  },
  row: {

  },
  days: {

  }
});

class MovieItem extends Component {
  render() {
    return (
      <View>
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
      <Modal
      isVisible={this.props.visible}
      style={styles.drawerContainer}
      animationIn={'slideInLeft'}
      animationOut={'slideOutLeft'}
      onBackdropPress={() => this.props.currentMovieVisible(false)}
      >
      <ShowTime id={this.props.movie.id} />
      </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    visible: state.movieVisible,
    movieSelected: state.movieSelected
  };
};

export default connect(mapStateToProps, actions)(MovieItem);
