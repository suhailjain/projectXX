import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import fbAccess from '../FirebaseConfig';

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = ({ number: this.props.currentLikes });
  }
  hitLike() {
      let user = '';
      if (fbAccess.auth().currentUser != null) {
        user = fbAccess.auth().currentUser.uid;
      } else if (this.props.userid !== 0) {
        user = this.props.userid;
      } else {
        Alert.alert('you must log in to like');
        return;
      }

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
            fbAccess.database().ref(`/hypeUsers/users/${user}`).child(uniqueKey).set(true);
            Alert.alert('your like was counted');
          });
      }
    })
      .catch(() => Alert.alert('fishh!, please try again.'));
  }

  render() {
      return (
      <Text onPress={this.hitLike.bind(this)}>
          {this.state.number}
      </Text>
    );
  }
}

export default LikeButton;
