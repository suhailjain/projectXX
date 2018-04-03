import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon } from 'react-native-elements';
import * as actions from '../actions';
import Menu from './Menu';
import DrawerModal from './common/DrawerModal';
import fbAccess from './FirebaseConfig';
import Spinner from './common/Spinner';

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
    let user;
    if (fbAccess.auth().currentUser != null) {
       user = fbAccess.auth().currentUser.uid;
    } else if (this.props.userid !== 0) {
      user = this.props.userid;
    }
    const fbdb = fbAccess.database();
    let pics = [];
    let userPics = [];
    // dbref = '/posts' || '/jPosts' || 'sPosts
    await fbdb.ref(this.props.dbref)
    .limitToLast(3)
    .on('child_added', (snapshot) => {
      //reversing the like order and check for approved
      if (snapshot.val().user === user) {
        userPics.unshift(snapshot.val());
        this.props.userPics(userPics);
      }
      if (snapshot.val().approved === 'Y') {
          pics.unshift(snapshot.val());
          this.props.gallerydata(pics);
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
  menuIcon() {
    return (
    <Icon name='menu' color='#ededed' underlayColor='#ededed' onPress={() => this.props.drawerState(false)} />
  );
  }
  rightIcon() {
    return (
      <Icon name='local-parking' color='#ededed' underlayColor='#003366' onPress={() => {
        Actions.camera();
        this.checkForParking();
      }}
      />
    );
  }
  render() {
    return (
        <View style={styles.container}>
        <Header
        backgroundColor='#003366'
        leftComponent={this.menuIcon()}
        centerComponent={{ text: '', style: { color: '#fff' } }}
        rightComponent={this.rightIcon()}
        />
        <Menu location={this.props.locate} />
        <DrawerModal visible={this.props.toggle} />
        <Spinner loading={this.state.loading} />
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
    userid: state.fbUserID
  };
};

export default connect(mapStateToProps, actions)(Lobby);
