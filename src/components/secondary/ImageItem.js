import React, { Component } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { Divider, Button } from 'react-native-elements';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';

const { width, height } = Dimensions.get('window');

const likeHandle = (url, id, likes) => {
    const user = fbAccess.auth().currentUser;
    if (user === null) {
      Alert.alert('you must log in to like');
    } else {
    const db = fbAccess.database();
    const uid = user.uid;
    const uniqueKey = url + id;
    db.ref(`/hypeUsers/users/${uid}/${uniqueKey}`).once('value').then((snapshot) => {
      if (snapshot.val()) {
          Alert.alert('you have liked this before, thanks!');
      } else {
        //user has not liked this image before

        db.ref(`${url}`).child(id).update({ likes: likes + 1 })

        .then(() => {
          db.ref(`/hypeUsers/users/${uid}/`).child(uniqueKey).set(true)
            .then(() => {
              Alert.alert('your like was counted');
            });
        });
    }
  })
    .catch(() => Alert.alert('fishh!, please try again.'));
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  image: {
    borderRadius: 20,
    width: width * 0.8,
    height: height * 0.25,
    justifyContent: 'center'
  },
});

class ImageItem extends Component {
  render() {
    return (
      <View style={styles.container}>
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
      <Text>
      {this.props.pic.title}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
      <Button
      small
      rounded
      backgroundColor='#663300'
      textStyle={{ color: '#ffffff', size: 8 }}
      title='hype it up!'
      onPress={() => likeHandle(this.props.dbref, this.props.pic.id, this.props.pic.likes)} />
      <Button
      small
      rounded
      backgroundColor='#663300'
      textStyle={{ color: '#ffffff' }}
      title={this.props.pic.likes}
      />
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
    visible: state.visible
  };
};

export default connect(mapStateToProps, actions)(ImageItem);
