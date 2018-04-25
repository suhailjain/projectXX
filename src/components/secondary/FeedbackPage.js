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
  }
};
class FeedbackPage extends Component {
  static navigationOptions = {
    tabBarLabel: 'Feedback'
  }
  constructor(props) {
    super(props);
    console.log(this.props.services);
    this.state = { services: this.props.services };
  }

  componentDidMount() {
  }

  renderSeparator() {
      return (
        <View
          style={{
            height: 3,
            width: "100%",
            backgroundColor: "#DBDBDB"
          }}
        />
      );
  }

  render() {
    return (
      <View style={styles.container}>
      <Text>Please select a service</Text>
      <FlatList
        data={this.state.services}
        renderItem={({ item }) => <Service service={item} />}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={this.renderSeparator}
      />
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
