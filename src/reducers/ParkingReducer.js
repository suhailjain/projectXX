export default (state = 'not_found', action) => {
  switch (action.type) {
    case 'park':
      return action.payload;
    default:
      return state;
  }
};
