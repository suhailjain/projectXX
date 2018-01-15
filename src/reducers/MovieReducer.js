export default (state = null, action) => {
  switch (action.type) {
    case 'movie':
      return action.payload;
    default:
      return state;
  }
};
