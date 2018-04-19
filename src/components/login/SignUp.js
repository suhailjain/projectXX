import React from 'react';
import { View, Text, Button } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const styles = {
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f2f5'
  }
};

const SignUp = (props) => {
  console.log(props.visible);
  return (
    <Modal
      isVisible={props.visible}
      avoidKeyboard={true}
      onBackdropPress={() => props.signupmodal(false)}
    >
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'normal', color: '#12110e' }}>
        loading...
      </Text>
      <View style={{ height: 10, backgroundColor: '#f4f2f5' }} />
    </View>
    </Modal>

  );
};

export default connect(null, actions)(SignUp);
