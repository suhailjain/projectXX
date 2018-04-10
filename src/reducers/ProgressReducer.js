export default (state = 0, action) => {
  switch (action.type) {
    case 'progress':
      return action.payload;
    default:
      return state;
  }
};
