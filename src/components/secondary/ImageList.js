import React, { Component } from 'react';
import { View, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ImageItem from './ImageItem';
import fbAccess from './../FirebaseConfig';
import * as actions from './../../actions';
//there is no data writing back to firebase here
class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = { isFetching: false };
  }
  onRefresh() {
    console.log('refreshing');
    this.setState({ isFetching: true });

    const fbdb = fbAccess.database();
    let pics = [];
    let userPics = [];
    console.log(this.props.dbref);
    fbdb.ref(this.props.dbref).orderByChild('likes')
    .on('child_added', (snapshot) => {
      if (snapshot.val().approved === 'Y') {
        pics.unshift(snapshot.val());
        this.props.gallerydata(pics);
    }
  });
  this.setState({ isFetching: false });
  console.log(pics);
  return pics;
  }
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
    return (
      <ScrollView
      contentContainerStyle={{ flex: 1, marginBottom: 20 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      >
      <FlatList
        refreshing={this.state.isFetching}
        onRefresh={() => {
          this.onRefresh.bind();
        }}
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
    gallery: state.gallery
  };
};

export default connect(mapStateToProps, actions)(ImageList);
