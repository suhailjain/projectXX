export default (state = null, action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'user_self':
      return action.payload;
    default:
      return state;
  }
};
