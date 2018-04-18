export default (state = 'https://unityone-65a80.firebaseio.com/rohiniFood.json', action) => {
  switch (action.type) {
    case 'food_url':
      return action.payload;
    default:
      return state;
  }
};
