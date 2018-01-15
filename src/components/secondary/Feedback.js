import React,{ Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Header, Icon } from 'react-native-elements';
import * as actions from '../../actions';

class Feedback extends Component {
  menuIcon() {
    return (
    <Icon name='menu' color='#663300' onPress={() => this.props.drawerState(false)} />
  );
}
  render() {
    return (
      <View>
      <Header
      backgroundColor='#003366'
      leftComponent={this.menuIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={{ icon: 'dots-three-vertical', color: '#fff' }}
      />
      </View>
    );
  }
}

export default connect(null, actions)(Feedback);
