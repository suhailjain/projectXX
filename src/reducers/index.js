import { combineReducers } from 'redux';
import LocationReducer from './LocationReducer';
import StoreReducer from './StoreReducer';
import FoodReducer from './FoodReducer';
import PostsReducer from './PostsReducer';
import DbRefReducer from './DbRefReducer';
import PurposeReducer from './PurposeReducer';
import LikeUrlReducer from './LikeUrlReducer';
import DrawerStateReducer from './DrawerStateReducer';
import CurrentImageReducer from './CurrentImageReducer';
import CurrentImageVisible from './CurrentImageVisibleReducer';
import CameraReducer from './CameraReducer';
import MovieReducer from './MovieReducer';
import MovieShowReducer from './MovieShowReducer';
import EventUrlReducer from './EventUrlReducer';
import DayReducer from './DayReducer';
import ParkingReducer from './ParkingReducer';
import RGalleryReducer from './RGalleryReducer';
import SGalleryReducer from './SGalleryReducer';
import JGalleryReducer from './JGalleryReducer';
import UserPostsReducer from './UserPostsReducer';
import UserSelectedImageReducer from './UserSelectedImageReducer';
import ApprovalReducer from './ApprovalReducer';
import LikeReducer from './LikeReducer';
import LoadingReducer from './LoadingReducer';
import CacheLocation from './CacheLocation';
import LoginStatus from './LoginStatus';
import UserIdReducer from './UserIdReducer';
import incReducer from '../store/incReducer';
import ProgressReducer from './ProgressReducer';
import CaptionReducer from './CaptionReducer';

export default combineReducers({

  cache: CacheLocation,
  currentLocation: LocationReducer,
  postsDB: PostsReducer,
  storeDB: StoreReducer,
  foodDB: FoodReducer,
  dbRef: DbRefReducer,
  purpose: PurposeReducer,
  likeUrl: LikeUrlReducer,
  drawerState: DrawerStateReducer,
  currentImage: CurrentImageReducer,
  visible: CurrentImageVisible,
  cameraFace: CameraReducer,
  movieVisible: MovieShowReducer,
  movieSelected: MovieReducer,
  eventURL: EventUrlReducer,
  day: DayReducer,
  park: ParkingReducer,
  rgallery: RGalleryReducer,
  jgallery: JGalleryReducer,
  sgallery: SGalleryReducer,
  userposts: UserPostsReducer,
  carousel: UserSelectedImageReducer,
  approvalstatus: ApprovalReducer,
  likecount: LikeReducer,
  loading: LoadingReducer,
  loginStatus: LoginStatus,
  userId: UserIdReducer,
  count: incReducer,
  progress: ProgressReducer,
  caption: CaptionReducer

});
