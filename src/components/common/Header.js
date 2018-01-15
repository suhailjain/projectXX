import React from 'react';
import { Text, View } from 'react-native';
import Button from './Button';

const Header = (props) => {
  const { textStyle, viewStyle, menu } = styles;

  return (
    <View style={viewStyle}>
      <Button onPress={props.onPress} styles={menu} visible={props.isVisible}>
      menu
      </Button>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: '25%',
    flexDirection: 'row',
    marginTop: '2%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  },
  menu :{

  }
};

// Make the component available to other parts of the app
export default Header;
