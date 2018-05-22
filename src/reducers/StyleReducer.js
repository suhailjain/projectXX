export default (state = {}, action) => {
  switch (action.type) {
    case 'style':
      return action.payload;
    default:
      return state;
  }
};
