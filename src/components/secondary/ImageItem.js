import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { SwipeRow, Icon, Button } from 'native-base';
import * as actions from '../../actions';
import LikeButton from './LikeButton';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    backgroundColor: '#ffffff'
  },
  image: {
    borderRadius: 5,
    width: width * 1,
    height: height * 0.3,
    justifyContent: 'center',
  },
  imageCont: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    backgroundColor: '#ffffff'
  },
  likes: {
    fontSize: 16
  }
});
/*

*/
class ImageItem extends Component {
  render() {
    return (

      <View>
      <SwipeRow
            leftOpenValue={200}
            rightOpenValue={-75}
            left={
            //comments
            <Text>
            {this.props.pic.title}
            </Text>
            }
            body={
              <TouchableOpacity onPress={() => {
                this.props.currentImage(this.props.pic.url);
                this.props.currentImageVisible(true);
               }}
              >
              <Image
                style={styles.image}
                source={{ uri: this.props.pic.url }}
              />
              </TouchableOpacity>
            }
            right={
              <LikeButton
              currentLikes={this.props.pic.likes}
              db={this.props.dbref}
              id={this.props.pic.id}
              userid={this.props.userid}
              />
            }
      />


      <Modal
      onBackdropPress={() => this.props.currentImageVisible(false)}
      isVisible={this.props.visible}
      >
          <Image
          style={{ width: width * 0.90,
                  height: height * 0.85,
                  alignSelf: 'center',
                }}
          source={{ uri: this.props.highlight }}
          />
      </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dbref: state.dbRef,
    highlight: state.currentImage,
    visible: state.visible,
    locate: state.currentLocation,
    userid: state.fbUserID
  };
};

export default connect(mapStateToProps, actions)(ImageItem);
