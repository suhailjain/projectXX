import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import Logged from './Logged';

class LoggedWrapper extends Component {

  render() {
    console.log(this.props.navigation);
    console.log('in wrapper');
  return (
    <Logged navigation={this.props.navigation} />
  );
}
}

export default withNavigation(LoggedWrapper);
