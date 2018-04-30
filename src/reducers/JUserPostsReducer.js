export default (state = '', action) => {
  switch (action.type) {
    case 'juser_posts':
      return action.payload;
    default:
      return state;
  }
};
