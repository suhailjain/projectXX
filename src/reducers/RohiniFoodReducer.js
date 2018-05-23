export default (state = [], action) => {
  //onsole.log(action.payload);
  switch (action.type) {
    case 'food_r':
      return action.payload;
    default:
      return state;
  }
};
