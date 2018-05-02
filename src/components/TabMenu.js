import React from 'react';
import { TabNavigator } from 'react-navigation';
import FeedbackPage from './secondary/FeedbackPage';
import Aboutus from './secondary/Aboutus';
import Main from './main/Main';
import SocialConnect from './secondary/SocialConnect';
import Gallery from './secondary/Gallery';
import ParkAssist from './ParkAssist';
import Logged from './login/Logged';

const TabMenu = TabNavigator({
  Home: { screen: Main },
  Connect: { screen: SocialConnect },
  Gallery: { screen: Gallery },
  Feedback: { screen: FeedbackPage },
  Parking: { screen: ParkAssist }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
  tabBarOptions: {
    labelStyle: {
      fontSize: 10,
      color: '#ffffff'
    },
    activeTintColor: '#003366',
    inactiveTintColor: '#663300',
    activeBackgroundColor: '#86A3C4',
    inactiveBackgroundColor: '#034A9C',
    allowFontScaling: true
  }
});

TabMenu.navigationOptions = {
  title: 'tab menu'
};

export default TabMenu;
