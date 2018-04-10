import React, { Component } from 'react';
import { Fab, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MenuFab extends Component {
  render() {
    return (
          <Fab
            active={false}
            direction="down"
            containerStyle={{ marginTop: 15 }}
            style={{ backgroundColor: 'transparent' }}
            position="topLeft"
            onPress={() => this.props.drawerState(false)}>
            <Icon name="menu" style={{ fontSize: 25, fontWeight: 50, color: '#5067FF' }}/>
          </Fab>
    );
  }
}

export default connect(null, actions)(MenuFab);
