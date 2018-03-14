import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';


const styles = StyleSheet.create({
  smallImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000000'
  },
  largeImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#000000'
  }
});

class UserPicture extends Component {
  selectStyle() {
    if (this.props.selected === this.props.pic.id) {
      return styles.largeImage;
    } else {
      return styles.smallImage;
    }
  }
  render() {
    return (
      <View>
      <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
      onPress={() => {
        this.props.userSelects(this.props.pic.id);
        this.props.approval(this.props.pic.approved);
        this.props.likes(this.props.pic.likes);
    }}>
        <Image
        style={this.selectStyle()}
        source={{ uri: this.props.pic.url }}
        />
      </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected: state.carousel
  };
};

export default connect(mapStateToProps, actions)(UserPicture);
