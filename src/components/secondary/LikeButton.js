import React, { Component } from 'react';
import { Text, Alert, View, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import fbAccess from '../FirebaseConfig';

const styles = {
  back: {
    position: 'absolute',
    marginLeft: 10,
    marginTop: 10
  },
  likedisplay: {
    position: 'absolute',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 17,
    marginTop: 35
 }
};
class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = ({ number: this.props.currentLikes });
  }
  hitLike() {
    console.log('in hitLike');
      const sessionId = new Date().getTime();
      let user = this.props.userid;
      /*if (fbAccess.auth().currentUser != null) {
        user = fbAccess.auth().currentUser.uid;
      } else if (this.props.userid !== 0) {
        user = this.props.userid;
      } else {
        Alert.alert('you must log in to like');
        return;
      } */

      const uniqueKey = `${this.props.db}${this.props.id}`;
      fbAccess.database().ref(`/hypeUsers/users/${user}${uniqueKey}`).once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
            Alert.alert('you have liked this before, thanks!');
        } else {
          //user has not liked this image before
          //transaction
          fbAccess.database().ref(this.props.db).child(this.props.id).child('likes')
          .transaction((like) => {
            return like + 1;
          })
          .then(() => {
            this.setState({ number: this.state.number + 1 });
            //unique identifier to check if a user has liked an image before.
            fbAccess.database().ref(`/hypeUsers/users/${user}`).child(uniqueKey).set(true);
            //Alert.alert('your like was counted');
            console.log('Image is liked');
          })
          .then(() => {
            fbAccess.database().ref(this.props.db).child(this.props.id).child('lastLikedAt')
            .transaction(() => {
              return sessionId;
            })
            .then(() => console.log('lastLikedAt updated'));
          });
      }
    })
      .catch(() => Alert.alert('fishh!, please try again.'));
  }

  render() { console.log('render');
      return (
        <View style={{ position: 'absolute' }}>
        <TouchableOpacity
        onPress={() => this.hitLike()}
        style={styles.back}
        >
        <Icon
        name='favorite'
        color='#E01646'
        />
        </TouchableOpacity>
      <Text
      onPress={() => this.hitLike()}
      style={styles.likedisplay}
      >
      {this.state.number}
      </Text>
      </View>
    );
  }
}

export default LikeButton;
