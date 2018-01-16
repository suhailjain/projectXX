import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
});

class Event extends Component {
  constructor() {
    super();
    this.state = { selectedEvent: [] };
  }
  description() {
    if (this.props.event.title === this.props.visible) {
    return (
      <View>
        <Text>{this.props.event.description}</Text>
      </View>
    );
  } else {
    return;
  }
  }
  render() {
  return (
    <View style={styles.container}>
    <View>
      <Button title={this.props.event.title} onPress={() => this.props.currentImageVisible(this.props.event.title)} />
    </View>
    {this.description()}
    </View>
  );
}
}

const mapStateToProps = state => {
  return {
    visible: state.visible
  };
};

export default connect(mapStateToProps, actions)(Event);
