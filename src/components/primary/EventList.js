import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon } from 'react-native-elements';
import Event from './Event';
import * as actions from '../../actions';

class EventList extends Component {
  constructor() {
    super();
    this.state = { events: [] };
  }
  componentWillMount() {
    axios.get(this.props.url).then(response => {
      this.setState({
        events: response.data
      });
    });
  }
  backIcon() {
    return (
<Icon name='navigate-before' color='#663300' underlayColor='#003366' onPress={() => Actions.pop()} />
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
      <View>
      <Header
      backgroundColor='#003366'
      leftComponent={this.backIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={this.rightIcon()}
      />
      <FlatList
        data={this.state.events}
        renderItem={({ item }) => <Event event={item} />}
        keyExtractor={item => item.title}
      />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    url: state.eventURL
  };
};

export default connect(mapStateToProps, actions)(EventList);
