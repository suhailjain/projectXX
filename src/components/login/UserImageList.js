import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../actions';
import UserImageItem from './UserImageItem';
import fbAccess from './../FirebaseConfig';


const { width, height } = Dimensions.get('window');

class UserImageList extends Component {
  constructor(props) {
    super(props);
    this.state = { isFetching: false };
  }
  componentDidMount() {
  }
  onRefresh = () => {
    console.log('refreshing user images');
    this.setState({ isFetching: true });
      let userPics = [];
      fbAccess.database().ref(this.props.dbref)
      .once('value', (snapshot) => {
            //reversing the like order and check for approved
          snapshot.forEach((child) => {
                if (child.val().user === this.props.userid) {
                  userPics.unshift(child.val());
                }
              });
              console.log(userPics);
              this.setState({ isFetching: false, data: userPics });
            });
      };
  renderHeader() {
    return (
      <View
        style={{
          height: 150,
          width: width * 1,
          backgroundColor: '#DBDBDB'
        }}
      />
    );
  }
renderSeparator() {
        return (
          <View
            style={{
              height: 7,
              width: width * 1,
              backgroundColor: '#DBDBDB',
            }}
          />
        );
      }
renderFooter() {
        return (
          <View
            style={{
              height: 140,
              backgroundColor: '#DBDBDB'
            }}
          />
          );
        }
  render() {
    return (
      <View style={{ backgroundColor: '#DBDBDB' }}>
      <FlatList
      data={this.props.data}
      refreshing={this.state.isFetching}
      onRefresh={this.onRefresh}
      renderItem={({ item }) => <UserImageItem pic={item} />}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={this.renderSeparator}
      ListFooterComponent={this.renderFooter}
      />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ruserpics: state.ruserposts,
    juserpics: state.juserposts,
    suserpics: state.suserposts,
    dbref: state.dbRef,
    selected: state.carousel,
    approvalStat: state.approvalstatus,
    likesCount: state.likecount,
    shareImage: state.carousel
  };
};

export default connect(mapStateToProps, actions)(UserImageList);
