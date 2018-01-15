export default (state = 'back', action) => {
  switch (action.type) {
    case 'camera':
      return action.payload;
    default:
      return state;
  }
};
