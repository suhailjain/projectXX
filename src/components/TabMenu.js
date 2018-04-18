import React from 'react-native';
import { TabNavigator } from 'react-navigation';
import Feedback from './secondary/Feedback';
import Aboutus from './secondary/Aboutus';
import Main from './main/Main';
import SocialConnect from './secondary/SocialConnect';
import Gallery from './secondary/Gallery';


const TabMenu = TabNavigator({
  Home: { screen: Main },
  Connect: { screen: SocialConnect },
  Gallery: { screen: Gallery },
  Feedback: { screen: Feedback },
  About: { screen: Aboutus }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
  tabBarOptions: {
    labelStyle: {
      fontSize: 10
    },
    allowFontScaling: true
  }
});

TabMenu.navigationOptions = {
  title: 'tab menu'
};

export default TabMenu;
