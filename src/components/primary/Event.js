import React from 'react';
import { View, StyleSheet } from 'react-native';
import DrawerModal from '../common/DrawerModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
});

const EventView = () => {
  return (
    <View style={styles.container}>
    <DrawerModal />
    </View>
  );
};

export defult EventView;
