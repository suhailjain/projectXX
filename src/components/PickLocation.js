import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button, Header, Divider, SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  outerContainer: {
    backgroundColor: '#ededed',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginLeft: 7,
    marginTop: 7,
    marginRight: 7,
    marginBottom: 7,
  },
});

const { width, height } = Dimensions.get('window');

class PickLocation extends Component {
  title() {
    return (
      <Text style={{ color: '#ffffff', fontSize: 42, fontWeight: 'bold' }}>
        Unity One
      </Text>
    );
  }

  render() {
    return (
        <View style={styles.base}>
        <Header
        statusBarProps={{ barStyle: 'light-content' }}
        backgroundColor='#003366'
        centerComponent={this.title()}
        outerContainerStyles={{ flex: 0.4, justifyContent: 'center' }}
        />
        <View
        style={styles.outerContainer}
        >
        <View style={styles.container}>
        <Button
        large
        transparent
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
        transparent
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
        transparent
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
