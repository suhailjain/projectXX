import React, { Component } from 'react';
import { View, CameraRoll, FlatList, StyleSheet } from 'react-native';
import ConfirmUploadView from './ConfirmUploadView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed'
  }
});
class DisplayImage extends Component {
  state = {
    photo: []
  }
  componentWillMount() {
    this.getPhotosFromGallery();
  }
  getPhotosFromGallery() {
    CameraRoll.getPhotos({ first: 1 })
      .then(res => {
        //console.log(res, 'images data');
        this.setState({
          photo: res.edges
        });
      });
  }
  render() {
    return (
      <View style={styles.container} >
      <FlatList
        data={this.state.photo}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ConfirmUploadView pic={item} />}
        extraData={this.state}
      />
      </View>
    );
  }
}

export default DisplayImage;
