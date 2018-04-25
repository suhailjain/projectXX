import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Slider } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';

const styles = {
  rate: {
    alignSelf: 'center'
  },
  comment: {
    alignSelf: 'center'
  },
  submit: {
    alignSelf: 'center'
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
      <View>
        <Text style={styles.rate}>Rate</Text>
        <Slider
        onSlidingComplete={(value) => {
          rating = value;
        }}
        />
        <Text style={styles.comment}>Comments</Text>
        <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 2 }}
        onChangeText={(text) => this.setState({ text })}
        value={this.state.text}
        />
        <TouchableOpacity onPress={() => this.submitFeedback()}>
        <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
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
