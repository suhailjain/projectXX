export default (state = '', action) => {
  switch (action.type) {
    case 'likes':
      return action.payload;
    default:
      return state;
  }
};
