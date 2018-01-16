import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Icon, Button } from 'react-native-elements';
import * as actions from '../../actions';
import fbAccess from '../FirebaseConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const submit = (service, comment) => {
    console.log('submit');
    const user = fbAccess.auth().currentUser.uid;
    fbAccess.database().ref(`/feedback/service/${service}`).child(`${user}`)
    .set(comment)
    .then(() => {
    Alert.alert('appreciate your efforts to make us better');
  })
    .then(() => Actions.pop());
};

class Feedback extends Component {
  constructor() {
    super();
    this.state = { service: 'Washroom', comment: '' };
  }
  update = (selected) => {
      this.setState({ service: selected });
  }
  comment = (text) => {
    this.setState({ comment: text });
  }
  menuIcon() {
    return (
  <Icon name='navigate-before' color='#663300' underlayColor='#003366' onPress={() => Actions.pop()} />
  );
}
rightIcon() {
  return (
    <Icon name='local-parking' color='#663300' underlayColor='#003366' onPress={() => {
      this.props.cameraFace('back');
      Actions.camera();
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
      <Text>What is it about</Text>
      <Picker selectedValue={this.state.service} onValueChange={this.update}>
         <Picker.Item label="Washroom" value="Washroom" />
         <Picker.Item label="Parking" value="Parking" />
         <Picker.Item label="Lift" value="Lift" />
         <Picker.Item label="Store" value="Store" />
         <Picker.Item label="Suggestion" value="Suggestion" />
      </Picker>
      <Text>anddd...</Text>
      <TextInput
         multiline={true}
         placeholder="Elaborate a bit to help us understand your concern.."
         placeholderTextColor="#9a73ef"
         autoCapitalize="none"
         onChangeText={this.comment}
      />
      <Button
      title='send it across' onPress={() => submit(this.state.service, this.state.comment)}
      />
      </View>
    );
  }
}

export default connect(null, actions)(Feedback);
