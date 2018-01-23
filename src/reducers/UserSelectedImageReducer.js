export default (state = null, action) => {
  switch (action.type) {
    case 'user_self':
      return action.payload;
    default:
      return state;
  }
};
