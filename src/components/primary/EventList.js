import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon } from 'react-native-elements';
import Event from './Event';
import * as actions from '../../actions';

const { width, height } = Dimensions.get('window');

const styles = {
  back: {
    position: 'absolute',
    marginTop: height - 50,
    marginLeft: 20
  }
};

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

renderSeparator() {
    return (
      <View
        style={{
          height: 10,
          width: "100%",
          backgroundColor: "#DBDBDB"
        }}
      />
    );
  }
  renderHeader() {
    return (
      <View
        style={{
          height: 30,
          width: "100%",
          backgroundColor: "#DBDBDB"
        }}
      />
    );
  }
  renderFooter() {
    return (
      <View
        style={{
          height: 15,
          width: "100%",
          backgroundColor: "#DBDBDB"
        }}
      />
    );
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#DBDBDB' }}>
      <FlatList
        data={this.state.events}
        renderItem={({ item }) => <Event event={item} />}
        keyExtractor={item => item.title}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
      />
      <TouchableOpacity
      onPress={() => Actions.pop()}
      style={styles.back}
      >
      <Icon
      name='clear'
      />
      </TouchableOpacity>
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
