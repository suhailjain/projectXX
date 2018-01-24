import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import fbAccess from '../FirebaseConfig';
import * as actions from '../../actions';
import UserPicture from '../secondary/UserPicture';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 7,
    borderColor: '#d0d0d0',
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  heading: {
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

class UserProfile extends Component {
  componentWillMount() {
    //get user specific images
    const fbdb = fbAccess.database();
    console.log(this.props.curruser);
    let userPics = [];
    fbdb.ref(this.props.dbref).orderByChild('likes')
    .on('child_added', (snapshot) => {
      if (this.props.curruser !== 'none') {
      if (snapshot.val().user === this.props.curruser) {
        console.log('equal');
        userPics.unshift(snapshot.val());
        this.props.userPics(userPics);
      }
    }
  });
  }
  resolveApproval() {
    if (this.props.approvalStat === 'Y') {
      return 'Hollllaah, its approved';
    } else if (this.props.approvalStat === 'N') {
      return 'pending...';
    } else if (this.props.approvalStat === '') {
      return 'select an image to get its approval status';
    }
  }
  renderSeparator() {
      return (
        <View
          style={{
            height: 120,
            width: 4,
            backgroundColor: "#ffffff",
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
      );
    }
  render() {
    console.log(this.props.approvalStat);
    console.log(this.props.likesCount);
    return (
      <View>
        <View style={styles.container}>
          <View style={{ alignItems: 'center', marginTop: 7 }}>
              <Text style={{ fontSize: 16 }}>Images uploaded by you</Text>
                <View
                  style={{
                  height: 1,
                  width: '70%',
                  backgroundColor: "#000000",
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                />
          </View>

          <ScrollView
          contentContainerStyle={{ marginLeft: 15, marginRight: 15, marginBottom: 10, marginTop: 70 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          >
          <FlatList
          data={this.props.userpics}
          horizontal={true}
          renderItem={({ item }) => <UserPicture pic={item} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          contentContainerStyle={{ alignItems: 'center'
          }}
          />
          </ScrollView>

      </View>
      <View style={styles.container}>
      <Text>{this.resolveApproval()}</Text>
      <Text>{this.props.likesCount}</Text>
      </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userpics: state.userposts,
    curruser: state.user,
    dbref: state.dbRef,
    selected: state.carousel,
    approvalStat: state.approvalstatus,
    likesCount: state.likecount
  };
};

export default connect(mapStateToProps, actions)(UserProfile);
