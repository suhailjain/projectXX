import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { Header, Icon } from 'react-native-elements';
import { SwipeRow, Button } from 'native-base';
import * as actions from '../../actions';
import LikeButton from './LikeButton';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  row: {
    flex: 1
  },
  image: {
    width: width * 1,
    height: height * 0.35,
  },
  likes: {
    fontSize: 16
  },
  text: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  comments: {
    flex: 1,
    marginLeft: 7,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
/*

*/
class ImageItem extends Component {
  render() {
    console.log('render');
    return (
      <SwipeRow
            disableLeftSwipe
            leftOpenValue={170}
            style={styles.row}
            left={
            //comments
              <View style={styles.comments}>
              <Text style={styles.text}>
              {this.props.pic.title}
              </Text>
              </View>
            }

            body={
              <View>
              <TouchableOpacity
                onPress={() => {
                  console.log('image clicked');
               }}
              >
              <Image
                style={styles.image}
                source={{ uri: this.props.pic.url }}
              />
              </TouchableOpacity>
              <LikeButton
              currentLikes={this.props.pic.likes}
              db={this.props.dbref}
              id={this.props.pic.id}
              userid={this.props.userid}
              />
              </View>
            }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    dbref: state.dbRef,
    highlight: state.currentImage,
    visible: state.visible,
    locate: state.currentLocation,
    userid: state.userId
  };
};

export default connect(mapStateToProps, actions)(ImageItem);
