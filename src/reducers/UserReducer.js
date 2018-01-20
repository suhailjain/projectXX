export default (state = 'none', action) => {
  switch (action.type) {
    case 'user':
      return action.payload;
    default:
      return state;
  }
};
