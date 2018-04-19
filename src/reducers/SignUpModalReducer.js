export default (state = false, action) => {
  switch (action.type) {
    case 'signup':
      return action.payload;
    default:
      return state;
  }
};
