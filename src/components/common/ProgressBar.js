import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');

class ProgressBar extends Component {
  constructor() {
    super();
    this.state = { progress: 0 };
  }
  change() {
    if (this.props.progress === 0.8 || this.props.progress === 0.3) {
      this.setState({ progress: this.props.progress * width });
    }
  }
  render() {
    this.change();
    return (
      <View
      style={{
        backgroundColor: '#003366',
        height: 10,
        width: this.state.progress
      }}
      />
    );
  }
}

const mapStateToProps = state => {
    return {
      progress: state.progress
    };
};

export default connect(mapStateToProps, null)(ProgressBar);
