export default (state = false, action) => {
  switch (action.type) {
    case 'upload':
      return action.payload;
    default:
      return state;
  }
};
