import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');

class ProgressBar extends Component {
  render() {
    console.log(this.props.progress);
    return (
      <View
      style={{
        backgroundColor: '#003366',
        borderRadius: 8,
        flex: 0.03,
        width: this.props.progress * width
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
