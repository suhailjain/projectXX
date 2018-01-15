export default (state = false, action) => {
  switch (action.type) {
    case 'drawer_state':
      return !action.payload;
    default:
      return state;
  }
};
