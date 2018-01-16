import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon } from 'react-native-elements';
import * as actions from '../actions';
import Menu from './Menu';
import DrawerModal from './common/DrawerModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
});

class Lobby extends Component {
  constructor() {
    super();
    const { width, height } = Dimensions.get('window');
  }
  menuIcon() {
    return (
    <Icon name='menu' color='#663300' underlayColor='#003366' onPress={() => this.props.drawerState(false)} />
  );
  }
  rightIcon() {
    return (
      <Icon name='local-parking' color='#663300' underlayColor='#003366' onPress={() => {
        this.props.cameraFace('back');
        Actions.camera();
      }}
      />
    );
  }
  render() {
    return (
        <View style={styles.container}>
        <Header
        backgroundColor='#003366'
        leftComponent={this.menuIcon()}
        centerComponent={{ text: '', style: { color: '#fff' } }}
        rightComponent={this.rightIcon()}
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
