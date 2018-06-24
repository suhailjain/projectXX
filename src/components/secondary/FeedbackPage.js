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
    fontSize: 24,
    alignSelf: 'center',
    color: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10
  },
  titleview: {
    borderRadius: 17,
    backgroundColor: '#003366',
    marginLeft: 40,
    marginTop: 35,
    marginRight: 40,
    justifyContent: 'center'
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
    console.log('render');
    return (
      <View style={styles.container}>
      <View style={styles.titleview}>
      <Text style={styles.title}>Please select a service</Text>
      </View>
      <View style={{ marginTop: 50 }}>
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
