export default (state = 'https://unityone-65a80.firebaseio.com/rohiniShop.json', action) => {
  //onsole.log(action.payload);
  switch (action.type) {
    case 'store_url':
      return action.payload;
    default:
      return state;
  }
};
