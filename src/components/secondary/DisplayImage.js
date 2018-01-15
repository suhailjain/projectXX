import React, { Component } from 'react';
import { Image, Text, View, CameraRoll, FlatList } from 'react-native';
import ConfirmUploadView from './ConfirmUploadView';

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
    console.log(this.state.photo);
    return (
      <FlatList
        data={this.state.photo}
        renderItem={({ item }) => <ConfirmUploadView pic={item} />}
        extraData={this.state}
      />
    );
  }
}

export default DisplayImage;
