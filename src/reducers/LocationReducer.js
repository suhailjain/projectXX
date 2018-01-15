export default (state = null, action) => {
  switch (action.type) {
    case 'select_location':
      return action.payload;
    default:
      return state;
  }
};
