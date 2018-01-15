import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';

class ShowTime extends Component {
  constructor() {
    super();
    this.state = { monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [] };
  }
  componentWillMount() {
    let mon = [];
    let tue = [];
    let wed = [];
    let thu = [];
    let fri = [];
    let sat = [];
    let sun = [];
    const db = fbAccess.database();
  db.ref(`cinepolis/slot/${this.props.movie.id}/monday`).on('child_added', (snapshot) => {
  mon.unshift(snapshot.val());
  this.setState({ monday: mon });
  });
  db.ref(`cinepolis/slot/${this.props.movie.id}/tuesday`).on('child_added', (snapshot) => {
  tue.unshift(snapshot.val());
  this.setState({ tuesday: tue });
  });
  db.ref(`cinepolis/slot/${this.props.movie.id}/wednesday`).on('child_added', (snapshot) => {
  wed.unshift(snapshot.val());
  this.setState({ wednesday: wed });
  });
  db.ref(`cinepolis/slot/${this.props.movie.id}/thursday`).on('child_added', (snapshot) => {
  thu.unshift(snapshot.val());
  this.setState({ thursday: thu });
  });
  db.ref(`cinepolis/slot/${this.props.movie.id}/friday`).on('child_added', (snapshot) => {
  fri.unshift(snapshot.val());
  this.setState({ friday: fri });
  });
  db.ref(`cinepolis/slot/${this.props.movie.id}/saturday`).on('child_added', (snapshot) => {
  sat.unshift(snapshot.val());
  this.setState({ saturday: sat });
  });
  db.ref(`cinepolis/slot/${this.props.movie.id}/sunday`).on('child_added', (snapshot) => {
  sun.unshift(snapshot.val());
  this.setState({ sunday: sun });
  });
  }
  render() {
    console.log(this.state);
    return (
      <View>
      <Text>{this.props.movie.name}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movieSelected
  };
};

export default connect(mapStateToProps, actions)(ShowTime);
