import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Gallery from './components/secondary/Gallery';
import Aboutus from './components/secondary/Aboutus';
import SocialConnect from './components/secondary/SocialConnect';
import Movie from './components/secondary/Movie';
import CameraComponent from './components/common/CameraComponent';
import StoreWrapper from './components/primary/StoreWrapper';
import Cinepolis from './components/primary/Cinepolis';
import ParkAssist from './components/ParkAssist';
import EventList from './components//primary/EventList';
import Logged from './components/login/Logged';
import NotLogged from './components/login/NotLogged';
import FrontCameraComponent from './components/common/FrontCameraComponent';
import TabMenu from './components/TabMenu';
import BootUp from './components/BootUp';
import WixCamera from './components/common/WixCamera';
// first Scene is by default the first class loaded by react-native
class RouterComponent extends Component {
  render() {
    return (
      <Router hideNavBar>
        <Scene key="boot" component={BootUp} />
        <Scene key="tabs" component={TabMenu} />
        <Scene key="gallery" component={Gallery} />
        <Scene key="about" component={Aboutus} />
        <Scene key="movie" component={Movie} />
        <Scene key="connect" component={SocialConnect} />
        <Scene key="camera" component={CameraComponent} />
        <Scene key="storelist" component={StoreWrapper} />
        <Scene key="cinepolis" component={Cinepolis} />
        <Scene key="park" component={ParkAssist} />
        <Scene key='events' component={EventList} />
        <Scene key='logged' component={Logged} />
        <Scene key='notlogged' component={NotLogged} />
        <Scene key="frontCam" component={FrontCameraComponent} />
        <Scene key="wix" component={WixCamera} />
      </Router>
          );
  }
}

export default RouterComponent;
