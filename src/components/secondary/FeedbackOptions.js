import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Slider } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';

const styles = {
  container: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  },
  rate: {
    alignSelf: 'center',
    marginTop: 5,
  },
  comment: {
    alignSelf: 'center',
  },
  submit: {
    color: '#ffffff',
    alignSelf: 'center',
    paddingTop: 6,
    paddingBottom: 6
  },
  slider: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 15
  }
};
let rating = 0;
class FeedbackOptions extends Component {
  constructor() {
    super();
    this.state = { text: '' };
  }
  submitFeedback() {
    if (this.props.user === 0 && this.props.type === 'none') {
      //user not logged in
    }
    const sessionId = new Date().getTime();
    this.setState({ loading: true });
    fbAccess.database().ref(`${this.props.feedbackref}/service/${this.props.service}`)
    .push({ uid: `${this.props.user}`, type: `${this.props.type}`, review: `${this.state.text}`, rating: `${rating}`, upsertTime: `${sessionId}` })
    .then(() => {

    });
    //update user table
    //fbAccess.database().ref(`/users/${this.props.user}`).update();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.rate}>Rate</Text>
        <Slider
        onSlidingComplete={(value) => {
          rating = value;
        }}
        style={styles.slider}
        maximumValue={10}
        minimumValue={1}
        stepValue={1}
        value={5}
        />
        <Text style={styles.comment}>Comments</Text>
        <TextInput
        numberOfLines={4}
        maxLength={100}
        placeholder="Thriving for some feedback. Max chars 100."
        placeholderTextColor="#DBDBDB"
        style={{ height: 70,
        marginLeft: 10,
        marginRight: 10,
        }}
        multiline
        onChangeText={(text) => this.setState({ text })}
        value={this.state.text}
        />
        <TouchableOpacity
        onPress={() => this.submitFeedback()}
        style={{ backgroundColor: '#034A9C' }}
        >
        <View
          style={{
            height: 4,
            width: '100%',
            backgroundColor: '#DBDBDB'
          }}
        />
        <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
        <View
          style={{
            height: 17,
            width: '100%',
            backgroundColor: '#DBDBDB'
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
      feedbackref: state.feedbckDB,
      user: state.userId,
      type: state.loginStatus
  };
};

export default connect(mapStateToProps, actions)(FeedbackOptions);
