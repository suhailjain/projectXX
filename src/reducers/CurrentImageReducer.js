export default (state = '', action) => {
  switch (action.type) {
    case 'current_image':
      return action.payload;
    default:
      return state;
  }
};
