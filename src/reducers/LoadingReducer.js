export default (state = false, action) => {
  switch (action.type) {
    case 'loading':
      return action.payload;
    default:
      return state;
  }
};
