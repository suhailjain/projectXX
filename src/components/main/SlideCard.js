import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text, Dimensions, Image, Button, Alert } from 'react-native';
import * as actions from '../../actions';

const { width, height } = Dimensions.get('window');
const styles = {
  container: {
    flex: 0.7,
    backgroundColor: '#ffffff',
    borderRadius: 15
  },
  image: {
    flex: 0.6
  },
  headtext: {
    marginTop: 5,
    alignSelf: 'center',
    fontSize: 20
  }
};

class SlideCard extends Component {
  handleGo(cardSelected) {
    console.log(this.props.location);
    console.log(cardSelected);
      if (cardSelected === 'Shopping') {
        Actions.storelist();
      } else if (cardSelected === 'Food') {
        Actions.foodlist();
      } else if (cardSelected === 'Events') {
        Actions.events();
      } else if (cardSelected === 'Cinepolis') {
          if (this.props.location === 'Rohini') {
            Actions.cinepolis();
          } else {
            Alert.alert('Cinepolis is available only for Rohini location');
          }
      }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headtext}>
        {this.props.item.header}
        </Text>
        <Image
        style={styles.image}
        source={this.props.item.image}
        />
        <Text>
        {this.props.item.description}
        </Text>
        <Button
        onPress={() => this.handleGo(this.props.item.header)}
        title='go'
        style={styles.go}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.currentLocation
  };
}

export default connect(mapStateToProps, actions)(SlideCard);
