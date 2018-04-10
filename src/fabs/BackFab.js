import React, { Component } from 'react';
import { Fab, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

class BackFab extends Component {
  render() {
    return (
          <Fab
            active={false}
            direction="down"
            containerStyle={{ marginTop: 15 }}
            style={{ backgroundColor: 'transparent' }}
            position="topLeft"
            onPress={() => Actions.pop()}>
            <Icon name="arrow-back" style={{ fontSize: 25, fontWeight: 20, color: '#5067FF' }}/>
          </Fab>
    );
  }
}

export default BackFab;
