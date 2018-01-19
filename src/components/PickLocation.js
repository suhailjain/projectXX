import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Button, Header, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
});

const { width, height } = Dimensions.get('window');

class PickLocation extends Component {
  render() {
    return (
        <View style={styles.outerContainer}>
        <Header
        backgroundColor='#003366'
        centerComponent={{ text: 'Unity One', style: { color: '#fff' } }}
        />
        <View style={styles.container}>
        <Button
        large
        transparent={true}
        textStyle={{ color: '#663300' }}
        title='Rohini' onPress={() => {
          this.props.selectLocation('Rohini');
          this.props.postUrl('https://unityone-65a80.firebaseio.com/posts.json');
          this.props.likeUrl('https://unityone-65a80.firebaseio.com/posts');
          this.props.storeUrl('https://unityone-65a80.firebaseio.com/rohiniShop.json');
          this.props.foodUrl('https://unityone-65a80.firebaseio.com/rohiniFood.json');
          this.props.dbRef('/posts');
          this.props.eventUrl('https://unityone-65a80.firebaseio.com/rEvents.json');
          Actions.lobby();
        }}
        />
        <Divider style={{ backgroundColor: '#003366', marginRight: width / 5, marginLeft: width / 5 }} />
        <Button
        large
        transparent={true}
        textStyle={{ color: '#663300' }}
        title='Janakpuri' onPress={() => {
          this.props.selectLocation('Janakpuri');
          this.props.postUrl('https://unityone-65a80.firebaseio.com/jPosts.json');
          this.props.likeUrl('https://unityone-65a80.firebaseio.com/jPosts');
          this.props.storeUrl('https://unityone-65a80.firebaseio.com/janakpuriShop.json');
          this.props.foodUrl('https://unityone-65a80.firebaseio.com/janakpuriFood.json');
          this.props.dbRef('/jPosts');
          this.props.eventUrl('https://unityone-65a80.firebaseio.com/jEvents.json');
          Actions.lobby();
        }}
        />
        <Divider style={{ backgroundColor: '#003366', marginRight: width / 5, marginLeft: width / 5 }} />
        <Button
        large
        transparent={true}
        textStyle={{ color: '#663300' }}
        title='Shahadra' onPress={() => {
          this.props.selectLocation('Shahadra');
          this.props.postUrl('https://unityone-65a80.firebaseio.com/sPosts.json');
          this.props.likeUrl('https://unityone-65a80.firebaseio.com/sPosts');
          this.props.storeUrl('https://unityone-65a80.firebaseio.com/shahdraShop.json');
          this.props.foodUrl('https://unityone-65a80.firebaseio.com/shahdraFood.json');
          this.props.dbRef('/sPosts');
          this.props.eventUrl('https://unityone-65a80.firebaseio.com/sEvents.json');
          Actions.lobby();
        }}
        />
        </View>
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
