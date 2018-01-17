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
  console.log(url);
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

export const cameraFace = (type) => {
  return {
    type: 'camera',
    payload: type
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
