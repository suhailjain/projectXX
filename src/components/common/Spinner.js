import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';

const Spinner = (props) => {
  console.log(props.loading);
  return (
    <Modal
    isVisible={props.loading}
    >
    <View style={styles.spinnerStyle}>
      <ActivityIndicator
      animating={true}
      size='large'
      />
    </View>
    </Modal>

  );
};

const styles = {
    spinnerStyle: {
      flex: 1,
      paddingTop: 200,
      justifyContent: 'center',
      alignItems: 'center'
    }
};

export default Spinner;
