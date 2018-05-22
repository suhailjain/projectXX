import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import * as actions from '../../actions';
import FeedbackOptions from './FeedbackOptions';

const { width, height } = Dimensions.get('window');

const styles = {
  barInactive: {
    flex: 0.5,
    backgroundColor: '#ffffff',
    width: width - 20,
    alignSelf: 'center',
    borderRadius: 12,
  },
  barActive: {
    flex: 0.5,
    backgroundColor: '#034A9C',
    width: width - 20,
    alignSelf: 'center',
    borderRadius: 12,
  },
  serviceActive: {
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    fontSize: 16,
    color: '#ffffff'
  },
  serviceInactive: {
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    fontSize: 16
  }
};

class Service extends Component {
  constructor() {
    super();
    this.state = { barStyle: styles.barInactive, serviceStyle: styles.serviceInactive };
    this.showOptions.bind(this);
  }

  showOptions(name) {
    console.log(this.props.visible);
    if (name === this.props.visible) {
    //this.props.selectStyle({ barStyle: styles.barActive, serviceStyle: styles.serviceActive });
      //this.setState({ barStyle: styles.barActive, serviceStyle: styles.serviceActive });
    return (
      <View>
      <View style={{ height: 3, backgroundColor: '#DBDBDB' }} />
      <FeedbackOptions service={name} />
      </View>
    );
    } else {
      return;
    }
  }

  render() {
  return (
    <View style={styles.barInactive}>
    <TouchableOpacity onPress={() => this.props.currentImageVisible(this.props.service.name)} >
    <Text style={styles.serviceInactive}>{this.props.service.name}</Text>
    </TouchableOpacity>
    {this.showOptions(this.props.service.name)}
    </View>
  );
}
}

const mapStateToProps = state => {
  return {
    visible: state.visible,
    style: state.style
  };
};

export default connect(mapStateToProps, actions)(Service);
