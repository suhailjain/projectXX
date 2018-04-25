import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import * as actions from '../../actions';
import FeedbackOptions from './FeedbackOptions';

const { width, height } = Dimensions.get('window');

const styles = {
  bar: {
    backgroundColor: '#ffffff',
    width: width - 20,
    alignSelf: 'center'
  },
  title: {
    alignSelf: 'center',
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
    <Text style={styles.title}>{this.props.service.name}</Text>
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
