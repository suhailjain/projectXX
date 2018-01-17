import React, { Component } from 'react';
import { View, FlatList, ScrollView, List, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import MovieItem from './MovieItem';
import ShowTime from './ShowTime';
import Header from '../common/Header';
import fbAccess from '../FirebaseConfig';
import * as actions from '../../actions';

class MovieList extends Component {
  constructor() {
    super();
    this.state = { movielist: [] };
  }
  componentWillMount() {
    let movies = [];
    const fbdb = fbAccess.database();
    fbdb.ref('/cinepolis/movie').on('child_added', (snapshot) => {
      console.log(snapshot.val());
      movies.unshift(snapshot.val());
      this.setState({
        movielist: movies
    });
  });
  }


  render() {
    console.log(this.state.movielist);
    return (
      <ScrollView
      //contentContainerStyle={styles.scrollContent}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      >
      <FlatList
        data={this.state.movielist}
        renderItem={({ item }) => <MovieItem movie={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ marginBottom: 20 }}
      />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
  },
  drawerContainer: {
    borderWidth: 2,
    borderColor: '#000000',
  }
});

const mapStateToProps = state => {
  return {
    visible: state.movieVisible,
    movie: state.movieSelected
  };
};

export default connect(mapStateToProps, actions)(MovieList);
