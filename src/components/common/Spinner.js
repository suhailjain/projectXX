import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import Modal from 'react-native-modal';

const Spinner = (props) => {
  return (
    <Modal
      isVisible={props.loading}
    >
    <View style={styles.spinnerStyle}>
      <Text style={{ fontSize: 20, fontWeight: 'normal', color: '#12110e' }}>
        loading...
      </Text>
      <View style={{ height: 10, backgroundColor: '#f4f2f5' }} />
      <ActivityIndicator
        animating={true}
        size='large'
        color='#12110e'
      />
    </View>
    </Modal>

  );
};

const styles = {
    spinnerStyle: {
      flex: 0.27,
      marginLeft: 40,
      marginRight: 40,
      borderRadius: 13,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f2f5'
    }
};

export default Spinner;
