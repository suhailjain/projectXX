import { View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Logged from '../login/Logged';
import NotLogged from '../login/NotLogged';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed'
  },
});

class SocialConnect extends Component {
  static navigationOptions = {
    tabBarLabel: 'Connect'
  }

  isUserSignedIn = () => {
    if (Number.parseInt(this.props.userid, 10) === 0) {
      console.log('redirecting you to : notlogged');
      return (
        <NotLogged navigation={this.props.navigation} />
      );
    } else {
      console.log('redirecting you to : logged');
      return (
        <Logged navigation={this.props.navigation} />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
      {this.isUserSignedIn()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userid: state.userId
  };
};

export default connect(mapStateToProps, actions)(SocialConnect);
