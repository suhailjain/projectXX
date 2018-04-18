import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text, Dimensions, Image, Button, Alert } from 'react-native';
import * as actions from '../../actions';

const { width, height } = Dimensions.get('window');
const styles = {
  container: {
    flex: 0.7,
    backgroundColor: '#336600',
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
    if (this.props.location === 'Rohini') {

      this.props.selectLocation('Rohini');
      this.props.postUrl('https://unityone-65a80.firebaseio.com/posts.json');
      this.props.likeUrl('https://unityone-65a80.firebaseio.com/posts');
      this.props.storeUrl('https://unityone-65a80.firebaseio.com/rohiniShop.json');
      this.props.foodUrl('https://unityone-65a80.firebaseio.com/rohiniFood.json');
      this.props.dbRef('/posts');
      this.props.eventUrl('https://unityone-65a80.firebaseio.com/rEvents.json');

      if (cardSelected === 'Shopping') {
        Actions.storelist();
      } else if (cardSelected === 'Food') {
        Actions.foodlist();
      } else if (cardSelected === 'Events') {
        Actions.events();
      } else if (cardSelected === 'Cinepolis') {
        Actions.cinepolis();
      }
    } else if (this.props.location === 'Janakpuri') {

      this.props.selectLocation('Janakpuri');
      this.props.postUrl('https://unityone-65a80.firebaseio.com/jPosts.json');
      this.props.likeUrl('https://unityone-65a80.firebaseio.com/jPosts');
      this.props.storeUrl('https://unityone-65a80.firebaseio.com/janakpuriShop.json');
      this.props.foodUrl('https://unityone-65a80.firebaseio.com/janakpuriFood.json');
      this.props.dbRef('/jPosts');
      this.props.eventUrl('https://unityone-65a80.firebaseio.com/jEvents.json');

      if (cardSelected === 'Shopping') {
        Actions.storelist();
      } else if (cardSelected === 'Food') {
        Actions.foodlist();
      } else if (cardSelected === 'Events') {
        Actions.events();
      } else if (cardSelected === 'Cinepolis') {
        Alert.alert('Cinepolis is available only for Rohini location');
      }
    } else if (this.props.location === 'Shahadra') {

      this.props.postUrl('https://unityone-65a80.firebaseio.com/sPosts.json');
      this.props.likeUrl('https://unityone-65a80.firebaseio.com/sPosts');
      this.props.storeUrl('https://unityone-65a80.firebaseio.com/shahdraShop.json');
      this.props.foodUrl('https://unityone-65a80.firebaseio.com/shahdraFood.json');
      this.props.dbRef('/sPosts');
      this.props.eventUrl('https://unityone-65a80.firebaseio.com/sEvents.json');

      if (cardSelected === 'Shopping') {
        Actions.storelist();
      } else if (cardSelected === 'Food') {
        Actions.foodlist();
      } else if (cardSelected === 'Events') {
        Actions.events();
      } else if (cardSelected === 'Cinepolis') {
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
