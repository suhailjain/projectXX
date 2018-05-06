import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import PickLocation from './components/PickLocation';
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
import EventList from './components//primary/EventList';
import FoodList from './components/primary/FoodList';
import Logged from './components/login/Logged';
import NotLogged from './components/login/NotLogged';
import ConfirmUploadView from './components/secondary/ConfirmUploadView';
import FrontCameraComponent from './components/common/FrontCameraComponent';
import Main from './components/main/Main';
import TabMenu from './components/TabMenu';
import BootUp from './components/BootUp';
// first Scene is by default the first class loaded by react-native
class RouterComponent extends Component {
  render() {
    return (
      <Router hideNavBar={true}>
        <Scene key="boot" component={BootUp} />
        <Scene key="tabs" component={TabMenu} />
        <Scene key="feedback" component={Feedback} />
        <Scene key="gallery" component={Gallery} />
        <Scene key="about" component={Aboutus} />
        <Scene key="survey" component={Survey} />
        <Scene key="movie" component={Movie} />
        <Scene key="connect" component={SocialConnect} />
        <Scene key="camera" component={CameraComponent} />
        <Scene key="display" component={DisplayImage} />
        <Scene key="storelist" component={StoreList} />
        <Scene key="foodlist" component={FoodList} />
        <Scene key="cinepolis" component={Cinepolis} />
        <Scene key="park" component={ParkAssist} />
        <Scene key='events' component={EventList} />
        <Scene key='logged' component={Logged} />
        <Scene key='notlogged' component={NotLogged} />
        <Scene key="confirmUpload" component={ConfirmUploadView} />
        <Scene key="frontCam" component={FrontCameraComponent} />
      </Router>
          );
  }
}

export default RouterComponent;
