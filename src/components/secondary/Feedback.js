import React,{ Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../common/Header';
import * as actions from '../../actions';
import DrawerModal from '../common/DrawerModal';

class Feedback extends Component {
  render() {
    return (
      <View>
      <Header headerText={'hi'} onPress={() => this.props.drawerState(false)} />
        <Text>
            feedback page!!!
        </Text>
        <DrawerModal />
      </View>
    );
  }
}

export default connect(null, actions)(Feedback);
