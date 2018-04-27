import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import * as actions from '../../actions';
import FeedbackOptions from './FeedbackOptions';

const { width, height } = Dimensions.get('window');

const styles = {
  bar: {
    flex: 0.5,
    backgroundColor: '#ffffff',
    width: width - 20,
    alignSelf: 'center',
    borderRadius: 6,
  },
  service: {
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    fontSize: 16
  }
};

class Service extends Component {
  showOptions(name) {
    if (name === this.props.visible) {
    return (
      <View>
      <View style={{ height: 3, backgroundColor: '#DBDBDB' }} />
      <FeedbackOptions service={name} />
      </View>
    );
    } else {
      return;
    }
  };
  render() {
  return (
    <View style={styles.bar}>
    <TouchableOpacity onPress={() => this.props.currentImageVisible(this.props.service.name)} >
    <Text style={styles.service}>{this.props.service.name}</Text>
    </TouchableOpacity>
    {this.showOptions(this.props.service.name)}
    </View>
  );
}
}

const mapStateToProps = state => {
  return {
    visible: state.visible
  };
};

export default connect(mapStateToProps, actions)(Service);
