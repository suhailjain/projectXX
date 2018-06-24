import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../actions';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  eventcard: {
    flex: 0.8,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    width: width - 20,
    height: height - 100,
    borderRadius: 12,
  },
  title: {
    alignSelf: 'center',
    marginTop: 12,
    fontSize: 20
  },
  image: {
    marginTop: 15,
    justifyContent: 'center',
    width: width - 20,
    height: height - 350,
  },
  description: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    alignSelf: 'center'
  },
  footfall: {
    justifyContent: 'flex-end',
    alignSelf: 'center'
  }
});

class Event extends Component {
  constructor() {
    super();
    this.state = { selectedEvent: [] };
  }
  render() {
    console.log('render');
  return (
    <View style={styles.eventcard}>
      <Text style={styles.title}>
      {this.props.event.title}
      </Text>
      <Image
        style={styles.image}
        source={{ uri: this.props.event.image }}
      />
      <Text style={styles.description}>
      {this.props.event.description}
      </Text>
      <Button
      onPress={() => this.updateFootfall()}
      title='i am going to be there'
      style={styles.footfall}
      />
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
