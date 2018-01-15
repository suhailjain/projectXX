import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import PickLocation from './components/PickLocation';
import Lobby from './components/Lobby';
import Feedback from './components/secondary/Feedback';
import Gallery from './components/secondary/Gallery';
import Aboutus from './components/secondary/Aboutus';
import Survey from './components/secondary/Survey';
import SocialConnect from './components/secondary/SocialConnect';
import Movie from './components/secondary/Movie';
import CameraComponent from './components/common/CameraComponent';
import DisplayImage from './components/secondary/DisplayImage';
import StoreList from './components/primary/StoreList';
import Cinepolis from './components/primary/Cinepolis';
import ParkAssist from './components/ParkAssist';

class RouterComponent extends Component {
  render() {
    return (
      <Router hideNavBar={true}>
        <Scene key="locationPicker" component={PickLocation} />
        <Scene key="lobby" component={Lobby} />
        <Scene key="feedback" component={Feedback} />
        <Scene key="gallery" component={Gallery} />
        <Scene key="about" component={Aboutus} />
        <Scene key="survey" component={Survey} />
        <Scene key="movie" component={Movie} />
        <Scene key="connect" component={SocialConnect} />
        <Scene key="camera" component={CameraComponent} />
        <Scene key="display" component={DisplayImage} />
        <Scene key="storelist" component={StoreList} />
        <Scene key="cinepolis" component={Cinepolis} />
        <Scene key="park" component={ParkAssist} />
      </Router>
          );
  }
}

export default RouterComponent;
