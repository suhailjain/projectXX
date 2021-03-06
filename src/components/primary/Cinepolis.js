import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Header, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import MovieList from './MovieList';
import * as actions from '../../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
});

class Cinepolis extends Component {
  menuIcon() {
    return (
      <Icon name='navigate-before' color='#ededed' underlayColor='#003366' onPress={() => Actions.pop()} />
    );
}
rightIcon() {
  return (
    <Icon name='local-parking' color='#ededed' underlayColor='#003366' onPress={() => {
      this.props.cameraFace('RNCamera.Constants.Type.back');
      Actions.camera();
    }}
    />
  );
}
    render() { console.log('render');
      return (
        <View style={styles.container} >
        <MovieList />
        </View>
      );
    }
}

export default connect(null, actions)(Cinepolis);
