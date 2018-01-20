export default (state = '', action) => {
  switch (action.type) {
    case 'user_posts':
      return action.payload;
    default:
      return state;
  }
};
