export default (state = null, action) => {
  switch (action.type) {
    case 'events':
      return action.payload;
    default:
      return state;
  }
};
