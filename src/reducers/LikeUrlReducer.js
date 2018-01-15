export default (state = null, action) => {
  switch (action.type) {
    case 'like_url':
      return action.payload;
    default:
      return state;
  }
};
