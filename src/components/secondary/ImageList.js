import React, { Component } from 'react';
import { View, FlatList, Button, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import ImageItem from './ImageItem';
import fbAccess from './../FirebaseConfig';
import * as actions from './../../actions';
import store from '../../store';
import ProgressBar from '../common/ProgressBar';

const styles = {
activityIndicator: {
    flex: 1
 }
};

class ImageList extends Component {

  static statInd;
  static hasMoreData = true;
  constructor(props) {
    super(props);
    /*  if (this.props.gallery.length === 0) {
        this.state = { isFetching: false, data: store.getState().gallery, loading: false };
        this.refreshIndexByCached();
      } else { */
//      console.log(this.props);
        this.state = { isFetching: false, data: this.props.gallery, loading: false };
        this.refreshIndex();
      //}
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
    let first = true;
    await this.setState({ data: [] });
    await fbAccess.database().ref(this.props.dbref)
      .limitToLast(3)
      .once('value', (snapshot) => {
        console.log(snapshot.val());
          snapshot.forEach((child) => {
            if (first) {
              ImageList.statInd = child.val().id;
              first = false;
            }
            console.log('newest posts begins from id: ', ImageList.statInd);
            if (child.val().approved === 'Y') {
              this.add(child.val());
            }
          });
      });
}

async sortByLikes() {
      console.log('sorting now ');
      let temp = this.state.data;
      temp.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));
      this.setState({ data: temp });
}

async add(pic) {
  console.log('adding to list', pic.id);
  await this.setState({ data: [...this.state.data, ...[pic]] });
  return;
}

async loadMoreData() {
  console.log('loading more pics');
  this.setState({ loading: !this.state.loading });
  if (!ImageList.hasMoreData) {
    Alert.alert('no more data to load');
    return;
  }
  let first = 0;
//  console.log(this.props);
  await fbAccess.database().ref(this.props.dbref)
    .orderByKey()
    .endAt(String(ImageList.statInd))
    .limitToLast(3)
    .once('value', (snapshot) => {
      snapshot.forEach((child) => {
        if (first === 0) {
          ImageList.statInd = child.val().id;
        }

        first++;

        if (child.val().id === 0) {
          ImageList.hasMoreData = false;
        }
        //not adding up when first===3 as it will lead to duplicate item
        if (child.val().approved === 'Y' && first !== 3 && child.val().id !== 0) {
          this.add(child.val());
        }
      });
    });
    this.setState({ loading: !this.state.loading });
}

refreshIndex() {
  ImageList.statInd = this.props.gallery[2].id;
}
refreshIndexByCached() {
  ImageList.statInd = store.getState().gallery[2].id;
}

renderFooter() {
return (
  <View>
  <View
    style={{ height: 40, backgroundColor: '#003366' }}
  />
  <ActivityIndicator
         animating={this.state.loading}
         color='#bc2b78'
         size='large'
         style={styles.activityIndicator}
  />
  </View>
);
}

renderSeparator() {
      return (
        <View
          style={{
            height: 3,
            width: "100%",
            backgroundColor: "#DBDBDB"
          }}
        />
      );
}
//<ProgressBar />
render() {
//  console.log(this.props.gallery);
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
        ListFooterComponent={this.renderFooter.bind(this)}
      />
      </View>

    );
  }


}

const mapStateToProps = (state) => {
  return {
    url: state.postsDB,
    dbref: state.dbRef,
    index: state.lastIndex
  };
};

export default connect(mapStateToProps, actions)(ImageList);
