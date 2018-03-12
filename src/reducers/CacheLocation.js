export default (state = '', action) => {
  switch (action.type) {
    case 'cache':
      return action.payload;
    default:
      return state;
  }
};
