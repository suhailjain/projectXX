import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  smallImage: {
    width: 50,
    height: 50,
    borderRadius: 25 
  }
});
class UserPicture extends Component {
  render() {
    console.log(this.props.pic);
    return (
      <View>
      <TouchableOpacity onPress={() => console.log('show modal')}>
        <Image
        style={styles.smallImage}
        source={{ uri: this.props.pic.url }}
        />
      </TouchableOpacity>
      </View>
    );
  }
}

export default UserPicture;
