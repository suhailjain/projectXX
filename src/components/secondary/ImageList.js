import React, { Component } from 'react';
import { View, FlatList, ScrollView, List } from 'react-native';
import { connect } from 'react-redux';
import ImageItem from './ImageItem';
import fbAccess from '../FirebaseConfig';
//there is no data writing back to firebase here
class ImageList extends Component {
  constructor() {
    super();
    this.state = { datalist: [] };
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
  }
  render() {
    return (
      <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      >
      <FlatList
        data={this.state.datalist}
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
