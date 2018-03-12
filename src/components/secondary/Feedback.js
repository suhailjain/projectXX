import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, Picker, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon, Button, Rating } from 'react-native-elements';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';

const styles = StyleSheet.create({
  rate: {
    marginTop: 15
  },
  picker: {
    marginTop: 60,
  },
  container: {
    flex: 1,
    backgroundColor: '#ededed'
  },
  question: {
    marginTop: 10,
    fontSize: 18,
    marginLeft: 7
  },
  innerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    marginTop: 7,
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 7,
    backgroundColor: '#ffffff',
  },
  activityIndicator: {
    flex: 1
  }
});

let feedRef = '';
let detail = false;
class Feedback extends Component {
  constructor() {
    super();
    this.state = { service: 'Washroom', comment: '', feedtype: '', rating: -1, loading: false };
  }
  componentWillMount() {
    switch (this.props.location) {
      case 'Rohini': {
        feedRef = 'feedback';
        break;
      }
      case 'Shahadra': {
        feedRef = 'sfeedback';
        break;
      }
      case 'Janakpuri': {
        feedRef = 'jfeedback';
        break;
      }
      default: {
        feedRef = 'feedback';
        break;
      }
    }
  }
 submit(service, comment, type, rating) {
    if (comment === '' && type === 'written') {
      Alert.alert('even a single adjective would be enough, please.');
      return;
    }
    this.setState({ loading: true });
    const user = fbAccess.auth().currentUser.uid;
    const url = `${feedRef}/service/${service}`;
  fbAccess.database().ref(url).push({ uid: `${user}`, review: `${comment}`, rating: `${rating}` })
  .then(() => {
    this.setState({ loading: false });
    Actions.pop();
  });
  }
  update = (selected) => {
      this.setState({ service: selected });
  }
  comment = (text) => {
    this.setState({ comment: text });
  }
  menuIcon() {
    return (
  <Icon name='navigate-before' color='#ededed' underlayColor='#003366' onPress={() => Actions.pop()} />
  );
}
rightIcon() {
  return (
    <Icon name='local-parking' color='#ededed' underlayColor='#003366' onPress={() => {
      this.props.cameraFace('RNCamera.Constants.Type.back');
      Actions.camera();
    }}
    />
  );
}
feedmethod() {
  if (this.state.feedtype === 'written') {
  return (
    <View>
    <TextInput
       multiline={true}
       placeholder="Elaborate a bit to help us understand better."
       placeholderTextColor="#9a73ef"
       autoCapitalize="none"
       onChangeText={this.comment}
    />
    <Button
    title='send it across' onPress={() => this.submit(this.state.service, this.state.comment, this.state.feedtype, this.state.rating)}
    />
    </View>
  );
} else if (this.state.feedtype === 'rating') {
  return (
    <View>
    <Rating
      type="rocket"
      ratingCount={10}
      fractions={2}
      startingValue={4.5}
      imageSize={15}
      onFinishRating={this.ratingCompleted}
      showRating
      style={{}}
    />
    <Button
    title='send it across' onPress={() => this.submit(this.state.service, this.state.comment, this.state.feedtype, this.state.rating)}
    />
    </View>
  );
}
}
ratingCompleted(rate) {
  this.setState({ rating: rate });
}
  render() {
    return (
      <KeyboardAvoidingView
       style={styles.container}
      >
      <Header
      backgroundColor='#003366'
      leftComponent={this.menuIcon()}
      centerComponent={{ text: '', style: { color: '#fff' } }}
      rightComponent={this.rightIcon()}
      />
      <View style={styles.innerContainer}>
      <Text style={styles.question}>We would love to hear it from you, about</Text>
      <View
        style={{
          height: 1,
          width: "100%",
          marginLeft: 7,
          marginRight: 7,
          marginTop: 3,
          backgroundColor: "#ededed",
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
      <Picker sytle={styles.picker} selectedValue={this.state.service} onValueChange={this.update}>
         <Picker.Item label="Washroom" value="Washroom" />
         <Picker.Item label="Parking" value="Parking" />
         <Picker.Item label="Lift" value="Lift" />
         <Picker.Item label="Store" value="Store" />
         <Picker.Item label="Suggestion" value="Suggestion" />
      </Picker>
      <Button
      textStyle={{ color: '#000000' }}
      transparent
      onPress={() => {
        this.setState({ feedtype: 'written' });
      }}
      title='i will write about the service selected'
      style={styles.write}
      />
      {this.feedmethod()}
      <Button
      textStyle={{ color: '#000000' }}
      transparent
      onPress={() => {
        this.setState({ feedtype: 'rating' });
      }}
      title='i think i did rather rate it on 10'
      style={styles.rate}
      />
      <ActivityIndicator
               animating={this.state.loading}
               color='#bc2b78'
               size='large'
               style={styles.activityIndicator}
      />

      </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.currentLocation
  };
};

export default connect(mapStateToProps, actions)(Feedback);
