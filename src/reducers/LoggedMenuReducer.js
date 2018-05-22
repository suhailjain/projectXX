export default (state = 'gallery', action) => {
  switch (action.type) {
    case 'logged_menu':
      return action.payload;
    default:
      return state;
  }
};
