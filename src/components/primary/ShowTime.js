import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bab9bf'
  },
  row: {

  },
  days: {

  },
  time: {

  }
});

class ShowTime extends Component {
  constructor() {
    super();
    this.state = { showtime: [] };
  }
  componentWillMount() {
    axios.get(`https://unityone-65a80.firebaseio.com/cinepolis/slot/${this.props.id}.json`).then(response => {
      this.setState({
        showtime: response.data
      });
      console.log(response.data);
    });
  }

  timings(day) {
    if (this.props.day === day) {
    return (
      <View style={styles.time}>
      <Text>{day}</Text>
      </View>
    );
  } else {
    return;
  }
  }

  render() { console.log('render');
    return (
      <View style={styles.container}>
      <Button
      title='Monday'
      onPress={() => this.props.daySelector('mon')}
      style={styles.days}
      />
      {this.timings('mon')}

      <Button
      title='Tuesday'
      onPress={() => this.props.daySelector('tue')}
      style={styles.days}
      />
      {this.timings('tue')}

      <Button
      title='Wednesday'
      onPress={() => this.props.daySelector('wed')}
      style={styles.days}
      />
      {this.timings('wed')}

      <Button
      title='Thursday'
      onPress={() => this.props.daySelector('thu')}
      style={styles.days}
      />
      {this.timings('thu')}

      <Button
      title='Friday'
      onPress={() => this.props.daySelector('fri')}
      style={styles.days}
      />
      {this.timings('fri')}

      <Button
      title='Saturday'
      onPress={() => this.props.daySelector('sat')}
      style={styles.days}
      />
      {this.timings('sat')}

      <Button
      title='Sunday'
      onPress={() => this.props.daySelector('sun')}
      style={styles.days}
      />
      {this.timings('sun')}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movieSelected,
    day: state.day
  };
};

export default connect(mapStateToProps, actions)(ShowTime);
