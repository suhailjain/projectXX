import React, { Component } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { Divider, Button } from 'react-native-elements';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';

const { width, height } = Dimensions.get('window');

const likeHandle = (url, id, likes, fbuser) => {
    let user;
    if (fbAccess.auth().currentUser != null) {
      user = fbAccess.auth().currentUser.uid;
    } else if (fbuser !== 0) {
      user = fbuser;
    } else {
      Alert.alert('you must log in to like');
      return;
    }

    const db = fbAccess.database();
    const uniqueKey = url + id;
    db.ref(`/hypeUsers/users/${user}/${uniqueKey}`).once('value').then((snapshot) => {
      if (snapshot.val()) {
          Alert.alert('you have liked this before, thanks!');
      } else {
        //user has not liked this image before
        //transaction
        db.ref(`${url}`).child(id).update({ likes: likes + 1 })
        //.update({ likes: likes + 1 })

        .then(() => {
          db.ref(`/hypeUsers/users/${user}/`).child(uniqueKey).set(true)
            .then(() => {
              Alert.alert('your like was counted');
            });
        });
    }
  })
    .catch(() => Alert.alert('fishh!, please try again.'));

};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    backgroundColor: '#ffffff'
  },
  image: {
    borderRadius: 5,
    width: width * 0.8,
    height: height * 0.24,
    justifyContent: 'center',
  },
  imageCont: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#ffffff'
  },
  likes: {
    fontSize: 16
  }
});

class ImageItem extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.imageCont}>
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
      </View>
      <Text>
      {this.props.pic.title}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
      <Button
      small
      rounded
      backgroundColor='#663300'
      textStyle={{ color: '#ffffff' }}
      title='hype it up!'
      onPress={() => likeHandle(this.props.dbref, this.props.pic.id, this.props.pic.likes, this.props.userid)}
      />
      <Text style={styles.likes}>
      {this.props.pic.likes}
      </Text>
      </View>
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
    userid: state.fbUserID
  };
};

export default connect(mapStateToProps, actions)(ImageItem);
