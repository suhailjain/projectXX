import React, { Component } from 'react';
import { View, FlatList, Button, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import ImageItem from './ImageItem';
import fbAccess from './../FirebaseConfig';
import * as actions from './../../actions';
//there is no data writing back to firebase here

class ImageList extends Component {

  static statInd;
  static hasMoreData = true;
  constructor(props) {
    super(props);
      this.state = { isFetching: false, data: this.props.gallery };
      this.refreshIndex();
  }
  componentWillMount() {
    ImageList.hasMoreData = true;
  }
  componentWillUnmount() {
    ImageList.hasMoreData = true;
  }

  async onRefresh() {
    ImageList.hasMoreData = true;
    console.log('refreshing');
    let first = 0;
    await this.setState({ data: [] });
    await fbAccess.database().ref(this.props.dbref)
      .orderByKey()
      .limitToLast(3)
      .on('child_added', (snapshot) => {
        console.log(snapshot.val().id);
        if (first === 0) {
          first++;
          ImageList.statInd = snapshot.val().id;
        }
        console.log('newest posts begins from id: ', ImageList.statInd);
        if (snapshot.val().approved === 'Y') {
          this.add(snapshot.val());
        }
      });
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
  if (!ImageList.hasMoreData) {
    console.log('no more data to load');
    return;
  }
  await console.log('well be starting at', ImageList.statInd);
  let first = 0;
  await fbAccess.database().ref(this.props.dbref)
    .orderByKey()
    .endAt(String(ImageList.statInd))
    .limitToLast(3)
    .on('child_added', (snapshot) => {
      if (first === 0) {
        ImageList.statInd = snapshot.val().id;
        console.log('new index : ', ImageList.statInd);
      }
      if (snapshot.val().id === 0) {
        ImageList.hasMoreData = false;
      }
      first++;
      console.log(first);
      //not adding up when first===3 as it will lead to duplicate item
      if (snapshot.val().approved === 'Y' && first !== 3 && snapshot.val().id !== 0) {
        this.add(snapshot.val());
      }
    });
}

refreshIndex() {
  ImageList.statInd = this.props.gallery[2].id;
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
