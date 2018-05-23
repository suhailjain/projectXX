export default (state = true, action) => {
  switch (action.type) {
    case 'food_shop':
      return action.payload;
    default:
      return state;
  }
};
