import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../actions';
import Service from './Service';

const styles = {
  container: {
    backgroundColor: '#DBDBDB',
    flex: 1
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    marginTop: 25
  }
};
class FeedbackPage extends Component {
  static navigationOptions = {
    tabBarLabel: 'Feedback'
  }
  constructor(props) {
    super(props);
    this.state = { services: this.props.services };
  }

  componentDidMount() {
  }

  renderSeparator() {
      return (
        <View
          style={{
            height: 6,
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
          height: 10,
          width: "100%",
          backgroundColor: "#DBDBDB"
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={{ flex: 0.2, justifyContent: 'center' }}>
      <Text style={styles.title}>Please select a service</Text>
      </View>
      <View style={{ flex: 0.8 }}>
      <FlatList
        data={this.state.services}
        renderItem={({ item }) => <Service service={item} />}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
      />
      </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    services: state.services
  };
};

export default connect(mapStateToProps, null)(FeedbackPage);
