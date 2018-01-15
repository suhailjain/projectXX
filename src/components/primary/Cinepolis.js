import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Header, Icon } from 'react-native-elements';
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
    <Icon name='menu' color='#663300' onPress={() => this.props.drawerState(false)} />
  );
}
    render() {
      return (
        <View style={styles.container} > 
        <Header
        backgroundColor='#003366'
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
