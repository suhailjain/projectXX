export default (state = [], action) => {
  //onsole.log(action.payload);
  switch (action.type) {
    case 'food_s':
      return action.payload;
    default:
      return state;
  }
};
