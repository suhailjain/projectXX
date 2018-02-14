import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
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

const getGalleryData = () => {
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
    this.props.gallerydata(pics);
  }
});
}

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

  getGallery() {
    const fbdb = fbAccess.database();
    let pics = [];
    let userPics = [];
    // dbref = '/posts' || '/jPosts' || 'sPosts'
    fbdb.ref(this.props.dbref).orderByChild('likes')
    .on('child_added', (snapshot) => {
      //reversing the like order and check for approved
      if (this.props.curruser !== 'none') {
      if (snapshot.val().user === this.props.curruser) {
        userPics.unshift(snapshot.val());
        this.props.userPics(userPics);
      }
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
    <Icon name='menu' color='#663300' underlayColor='#003366' onPress={() => this.props.drawerState(false)} />
  );
  }
  rightIcon() {
    return (
      <Icon name='local-parking' color='#663300' underlayColor='#003366' onPress={() => {
        Actions.camera();
        this.checkForParking();
      }}
      />
    );
  }
  render() {
    this.props.cameraFace('back');
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
    curruser: state.user
  };
};

export default connect(mapStateToProps, actions)(Lobby);
