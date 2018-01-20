export default (state = [], action) => {
  switch (action.type) {
    case 'gallery':
      return action.payload;
    default:
      return state;
  }
};
