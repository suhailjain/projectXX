import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header } from 'react-native-elements';
import * as actions from '../actions';
import Button from './common/Button';

class PickLocation extends Component {
  render() {
    return (
        <View>
        <StatusBar barStyle = "dark-content" hidden = {false}/>
        <Header
        backgroundColor='#003366'
        centerComponent={{ text: 'Unity One', style: { color: '#fff' } }}
        />
        <Button onPress={() => {
          this.props.selectLocation('Rohini');
          this.props.postUrl('https://unityone-65a80.firebaseio.com/posts.json');
          this.props.likeUrl('https://unityone-65a80.firebaseio.com/posts');
          this.props.storeUrl('https://unityone-65a80.firebaseio.com/rohiniShop.json');
          this.props.foodUrl('https://unityone-65a80.firebaseio.com/rohiniFood.json');
          this.props.dbRef('/posts');
          Actions.lobby();
        }}>Rohini
        </Button>
        <Button onPress={() => {
          this.props.selectLocation('Janakpuri');
          this.props.postUrl('https://unityone-65a80.firebaseio.com/jPosts.json');
          this.props.likeUrl('https://unityone-65a80.firebaseio.com/jPosts');
          this.props.storeUrl('https://unityone-65a80.firebaseio.com/janakpuriShop.json');
          this.props.foodUrl('https://unityone-65a80.firebaseio.com/janakpuriFood.json');
          this.props.dbRef('/jPosts');
          Actions.lobby();
        }}>Janakpuri
        </Button>
        <Button onPress={() => {
          this.props.selectLocation('Shahadra');
          this.props.postUrl('https://unityone-65a80.firebaseio.com/sPosts.json');
          this.props.likeUrl('https://unityone-65a80.firebaseio.com/sPosts');
          this.props.storeUrl('https://unityone-65a80.firebaseio.com/shahdraShop.json');
          this.props.foodUrl('https://unityone-65a80.firebaseio.com/shahdraFood.json');
          this.props.dbRef('/sPosts');
          Actions.lobby();
        }}>
          Shahadra
        </Button>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locate: state.currentLocation
  };
};

export default connect(mapStateToProps, actions)(PickLocation);
