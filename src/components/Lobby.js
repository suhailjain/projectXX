import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon } from 'react-native-elements';
import * as actions from '../actions';
import Menu from './Menu';
import DrawerModal from './common/DrawerModal';

class Lobby extends Component {
  constructor() {
    super();
    const { width, height } = Dimensions.get('window');
  }
  menuIcon() {
    return (
    <Icon underlayColor='#003366' name='menu' color='#663300' onPress={() => this.props.drawerState(false)} />
  );
  }
  render() {
    return (
        <View>
        <Header
        backgroundColor='#003366'
        leftComponent={this.menuIcon()}
        centerComponent={{ text: '', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Menu location={this.props.locate} />
        <DrawerModal visible={this.props.toggle} />
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locate: state.currentLocation,
    toggle: state.drawerState
  };
};

export default connect(mapStateToProps, actions)(Lobby);
