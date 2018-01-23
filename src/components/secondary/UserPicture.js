import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';


const styles = StyleSheet.create({
  smallImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  largeImage: {
    width: 100,
    height: 100,
    borderRadius: 50
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
    console.log(this.props.selected);
    console.log(this.props.pic.id);
    return (
      <View>
      <TouchableOpacity onPress={() => this.props.userSelects(this.props.pic.id)}>
        <Image
        style={this.selectStyle()}
        source={{ uri: this.props.pic.url }}
        />
      </TouchableOpacity>
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
