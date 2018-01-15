export default (state = null, action) => {
  switch (action.type) {
    case 'store_url':
      return action.payload;
    default:
      return state;
  }
};
