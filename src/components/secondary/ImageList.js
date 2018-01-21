import React, { Component } from 'react';
import { View, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ImageItem from './ImageItem';
//there is no data writing back to firebase here
class ImageList extends Component {
  renderSeparator() {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#ededed",
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
      );
    }
  render() {
    console.log(this.props.gallery);
    return (
      <ScrollView
      contentContainerStyle={{ flex: 1, marginBottom: 20 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      >
      <FlatList
        data={this.props.gallery}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({ item }) => <ImageItem pic={item} />}
        contentContainerStyle={{ marginBottom: 20 }}
        keyExtractor={item => item.id}
      />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.postsDB,
    dbref: state.dbRef,
  };
};

export default connect(mapStateToProps)(ImageList);
