import React, { Component } from 'react';
import { View, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ImageItem from './ImageItem';
import fbAccess from '../FirebaseConfig';
//there is no data writing back to firebase here
class ImageList extends Component {
  constructor() {
    super();
    this.state = { datalist: [], isLoading: true };
  }
  componentWillMount() {
    const fbdb = fbAccess.database();
    let pics = [];
    // dbref = '/posts' || '/jPosts' || 'sPosts'
    fbdb.ref(this.props.dbref).orderByChild('likes')
    .on('child_added', (snapshot) => {
      //reversing the like order and check for approved
      if (snapshot.val().approved === 'Y') {
      pics.unshift(snapshot.val());
      this.setState({
        datalist: pics
      });
    }
  });
    this.setState({ isLoading: false });
  }
  render() {
    return (
      <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      >
      <ActivityIndicator animating={this.state.isLoading} size='large' />
      <FlatList
        data={this.state.datalist}
        contentContainerStyle={{ justifyContent: 'center' }}
        renderItem={({ item }) => <ImageItem pic={item} />}
        keyExtractor={item => item.id}
      />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.postsDB,
    dbref: state.dbRef
  };
};

export default connect(mapStateToProps)(ImageList);
