import React, { Component } from 'react';
import { View, FlatList, ScrollView, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import ImageItem from './ImageItem';
import fbAccess from './../FirebaseConfig';
import * as actions from './../../actions';
//there is no data writing back to firebase here

class ImageList extends Component {

  static statInd;
   static newpics = [];

  constructor(props) {
    super(props);
      this.state = { isFetching: false, data: this.props.gallery };
      this.refreshIndex();
  }
  componentWillMount() {
  }
  async onRefresh() {
    console.log('refreshing');
    this.setState({ isFetching: true });
    this.refreshIndex();
    const fbdb = fbAccess.database();
    let pics = [];
    await fbdb.ref(this.props.dbref)
    .limitToLast(3)
    .on('child_added', (snapshot) => {
      if (snapshot.val().approved === 'Y') {
        pics.unshift(snapshot.val());
        //this.props.gallerydata(pics);
    }
  });
  this.setState({ isFetching: false, data: pics });
}

async sortByDate() {
      console.log('sorting now ');
      this.setState({ isFetching: true });

      const fbdb = fbAccess.database();
      let pics = [];
      fbdb.ref(this.props.dbref).orderByChild('upsertedAt')
      .on('child_added', (snapshot) => {
        if (snapshot.val().approved === 'Y') {
          pics.unshift(snapshot.val());
        }
      });
      this.setState({ isFetching: false, data: pics });
}

async add(pic) {
  console.log('adding up', pic.id);
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
       //ImageList.newpics.unshift(snapshot.val());
       console.log('new node: ', snapshot.val().id);
      }
    });

   ImageList.statInd -= await 3;
}

refreshIndex() {
  ImageList.statInd = this.props.gallery[0].id - 3;
}

sortByLikes() {

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
    console.log('rendering now: ', this.state.data);
    return (
      <ScrollView
      contentContainerStyle={{ flex: 1, marginBottom: 20 }}
      >
      <Button
      title='most recent first'
      onPress={this.sortByDate.bind(this)}
      />
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
      />
      </ScrollView>
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
