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

export const storeUrl = (url) => {
  return {
    type: 'store_url',
    payload: url
  };
};

export const foodUrl = (url) => {
  return {
    type: 'food_url',
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

export const gallerydata = (data) => {
  return {
    type: 'gallery',
    payload: data
  };
};

export const userPics = (posts) => {
  return {
    type: 'user_posts',
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

export const cache = (location) => {
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

export const fbUserId = (id) => {
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
