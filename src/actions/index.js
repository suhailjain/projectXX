export const selectLocation = (location) => {
  return {
    type: 'select_location',
    payload: location
  };
};

export const postUrl = (url) => {
  return {
    type: 'posts_url',
    payload: url
  };
};

export const selectStyle = (style) => {
  return {
    type: 'style',
    payload: style
  };
};

export const Rstores = (url) => {
  return {
    type: 'store_r',
    payload: url
  };
};

export const Jstores = (url) => {
  return {
    type: 'store_j',
    payload: url
  };
};

export const Sstores = (url) => {
  return {
    type: 'store_s',
    payload: url
  };
};

export const stores = (url) => {
  return {
    type: 'store_selected',
    payload: url
  };
};

export const Rfood = (url) => {
  return {
    type: 'food_r',
    payload: url
  };
};

export const Jfood = (url) => {
  return {
    type: 'food_j',
    payload: url
  };
};

export const Sfood = (url) => {
  return {
    type: 'food_s',
    payload: url
  };
};

export const dbRef = (ref) => {
  return {
    type: 'db_ref',
    payload: ref
  };
};

export const purpose = (purposed) => {
  return {
    type: 'purpose',
    payload: purposed
  };
};

export const likeUrl = (url) => {
  return {
    type: 'like_url',
    payload: url
  };
};

export const loggedMenu = (mode) => {
  return {
    type: 'logged_menu',
    payload: mode
  };
};

export const drawerState = (toggle) => {
  return {
    type: 'drawer_state',
    payload: toggle
  };
};

export const currentImage = (url) => {
  return {
    type: 'current_image',
    payload: url
  };
};

export const currentImageVisible = (bool) => {
  return {
    type: 'curr_pic',
    payload: bool
  };
};

export const movieSelected = (movie) => {
  return {
    type: 'movie',
    payload: movie
  };
};

export const currentMovieVisible = (bool) => {
  return {
    type: 'show_time',
    payload: bool
  };
};

export const eventUrl = (url) => {
  return {
    type: 'events',
    payload: url
  };
};

export const daySelector = (day) => {
  return {
    type: 'day',
    payload: day
  };
};

export const parking = (park) => {
  return {
    type: 'park',
    payload: park
  };
};

export const rgallerydata = (data) => {
  return {
    type: 'rgallery',
    payload: data
  };
};

export const sgallerydata = (data) => {
//  console.log(data);
  return {
    type: 'sgallery',
    payload: data
  };
};

export const jgallerydata = (data) => {
  return {
    type: 'jgallery',
    payload: data
  };
};

export const ruserPics = (posts) => {
  return {
    type: 'ruser_posts',
    payload: posts
  };
};

export const suserPics = (posts) => {
  return {
    type: 'suser_posts',
    payload: posts
  };
};

export const juserPics = (posts) => {
  return {
    type: 'juser_posts',
    payload: posts
  };
};

export const userSelects = (pic) => {
  return {
    type: 'user_self',
    payload: pic
  };
};

export const approval = (status) => {
  return {
    type: 'approval',
    payload: status
  };
};

export const likes = (count) => {
  return {
    type: 'likes',
    payload: count
  };
};

export const loading = (mode) => {
  return {
    type: 'loading',
    payload: mode
  };
};

export const cacheURI = (location) => {
  return {
    type: 'cache',
    payload: location
  };
};

export const loginStatus = (status) => {
  return {
    type: 'login_status',
    payload: status
  };
};

export const userId = (id) => {
  return {
    type: 'user_id',
    payload: id
  };
};

export const cameraFace = (type) => {
  return {
    type: 'camera',
    payload: type
  };
};

export const progress = (type) => {
  return {
    type: 'progress',
    payload: type
  };
};

export const caption = (text) => {
  return {
    type: 'caption',
    payload: text
  };
};

export const signupmodal = (bool) => {
  return {
    type: 'signup',
    payload: bool
  };
};

export const uploadscreen = (bool) => {
  return {
    type: 'upload',
    payload: bool
  };
};

export const feedbackDB = (dbref) => {
  return {
    type: 'feedbck_dbref',
    payload: dbref
  };
};

export const feedbackServices = (servicesArray) => {
  return {
    type: 'services',
    payload: servicesArray
  };
};

export const SetUserName = (name) => {
  return {
    type: 'username',
    payload: name
  };
};

export const filteredResults = (results) => {
  return {
    type: 'search',
    payload: results
  };
};

export const textInSearchBar = (text) => {
  return {
    type: 'search_text',
    payload: text
  };
};

export const isItForShopping = (bool) => {
  return {
    type: 'food_shop',
    payload: bool
  };
};
