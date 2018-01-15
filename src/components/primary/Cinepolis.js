import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Header, Icon } from 'react-native-elements';
import MovieList from './MovieList';
import * as actions from '../../actions';

class Cinepolis extends Component {
  menuIcon() {
    return (
    <Icon name='menu' color='#fff' onPress={() => this.props.drawerState(false)} />
  );
}
    render() {
      return (
        <View>
        <Header
        leftComponent={this.menuIcon()}
        centerComponent={{ text: '', style: { color: '#fff' } }}
        rightComponent={{ icon: 'dots-three-vertical', color: '#fff' }}
        />
        <MovieList />
        </View>
      );
    }
}

export default connect(null, actions)(Cinepolis);
