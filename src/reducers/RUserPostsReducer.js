export default (state = '', action) => {
  switch (action.type) {
    case 'ruser_posts':
      return action.payload;
    default:
      return state;
  }
};
