export default (state = null, action) => {
  switch (action.type) {
    case 'posts_url':
      return action.payload;
    default:
      return state;
  }
};
