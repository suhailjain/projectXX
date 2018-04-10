export default (state = 0, action) => {
  switch (action.type) {
    case 'user_id':
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};
