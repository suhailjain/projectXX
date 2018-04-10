export default (state = '', action) => {
  switch (action.type) {
    case 'caption':
      return action.payload;
    default:
      return state;
  }
};
