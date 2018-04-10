import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import * as actions from '../actions';
import DrawerModal from './common/DrawerModal';
import fbAccess from './FirebaseConfig';
import Spinner from './common/Spinner';
import store from '../store';
import MenuFab from '../fabs/MenuFab';
import MenuSwiper from './MenuSwiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
});

class Lobby extends Component {
  constructor() {
    super();
    const { width, height } = Dimensions.get('window');
    this.state = { user: '', loading: true };
  }
  componentWillMount() {
    this.setState({ loading: !this.state.loading });
    this.getGallery();
  }

  async getGallery() {
    const fbdb = fbAccess.database();
    let pics = [];
    let userPics = [];
    console.log('user form the lobby: ', this.props.userid);
    // dbref = '/posts' || '/jPosts' || 'sPosts
    await fbdb.ref(this.props.dbref)
    .limitToLast(3)
    .on('child_added', (snapshot) => {
      //reversing the like order and check for approved
      if (snapshot.val().user === this.props.userid) {
        userPics.unshift(snapshot.val());
        this.props.userPics(userPics);
      }
      if (snapshot.val().approved === 'Y') {
          pics.unshift(snapshot.val());
          this.props.gallerydata(pics);
          //cache specific
          store.dispatch({
            type: 'gallery',
            payload: pics
          });
    }
  });
}

  checkForParking() {
    if (this.props.park === 'not_found') {
      Actions.camera();
    } else {
      Actions.park();
    }
  }
  rightIcon() {
    return (
      <Icon name='local-parking' color='#ededed' underlayColor='#003366' onPress={() => {
        this.checkForParking();
      }}
      />
    );
  }
  render() {
    return (
        <View style={styles.container}>
        <MenuSwiper />
        <DrawerModal visible={this.props.toggle} />
        <Spinner loading={this.state.loading} />
        <MenuFab />
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locate: state.currentLocation,
    toggle: state.drawerState,
    park: state.park,
    dbref: state.dbRef,
    curruser: state.user,
    index: state.lastIndex,
    userid: state.userId
  };
};

export default connect(mapStateToProps, actions)(Lobby);
