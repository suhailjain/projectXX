import React, { Component } from 'react';
import { View, FlatList, Button, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import ImageItem from './ImageItem';
import fbAccess from './../FirebaseConfig';
import * as actions from './../../actions';
//there is no data writing back to firebase here

class ImageList extends Component {

  static statInd;

  constructor(props) {
    super(props);
      this.state = { isFetching: false, data: this.props.gallery };
      this.refreshIndex();
  }

  async onRefresh() {
    console.log('refreshing');
    this.setState({ isFetching: true });
    this.refreshIndex();

    let pics = [];
    await fbAccess.database().ref(this.props.dbref)
    .limitToLast(3)
    .on('child_added', (snapshot) => {
      if (snapshot.val().approved === 'Y') {
        pics.unshift(snapshot.val());
    }
    });
      this.setState({ isFetching: false, data: pics });
  }

  async sortByLikes() {
      console.log('sorting now ');
      let temp = this.state.data;
      temp.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));
      this.setState({ data: temp });
  }

async add(pic) {
  await this.setState({ data: [...this.state.data, ...[pic]] });
  return;
}

async loadMoreData() {
  if (ImageList.statInd < 0) {
    console.log('no more data to load');
    return;
  }

  await fbAccess.database().ref(this.props.dbref)
    .orderByKey()
    .endAt(String(ImageList.statInd))
    .limitToLast(3)
    .on('child_added', (snapshot) => {
      if (snapshot.val().approved === 'Y') {
        this.add(snapshot.val());
      }
    });

   ImageList.statInd -= await 3;
}

refreshIndex() {
  ImageList.statInd = this.props.gallery[0].id - 3;
  ImageList.likeInd = this.props.gallery[0].id + 1;
}

renderFooter() {
console.log('rendering footer');
return (
  <View
    style={{
      paddingVertical: 20,
      borderTopWidth: 1,
      borderColor: "#CED0CE"
    }}
  >
  <Text>end</Text>
  </View>
);
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
    console.log(this.state.data);
    return (
      <View>
      <Button
      title='most liked first'
      onPress={this.sortByLikes.bind(this)}
      />
      <FlatList
        refreshing={this.state.isFetching}
        onRefresh={this.onRefresh.bind(this)}
        data={this.state.data}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({ item }) => <ImageItem pic={item} />}
        keyExtractor={item => item.id}
        onEndReached={this.loadMoreData.bind(this)}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={false}
      />
      </View>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.postsDB,
    dbref: state.dbRef,
    gallery: state.gallery,
    index: state.lastIndex
  };
};

export default connect(mapStateToProps, actions)(ImageList);
