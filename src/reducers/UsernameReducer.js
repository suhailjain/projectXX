export default (state = '', action) => {
  switch (action.type) {
    case 'username':
      return action.payload;
    default:
      return state;
  }
};
