export default (state = null, action) => {
  switch (action.type) {
    case 'food_url':
      return action.payload;
    default:
      return state;
  }
};
