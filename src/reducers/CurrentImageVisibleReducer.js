export default (state = false, action) => {
  switch (action.type) {
    case 'curr_pic':
      return action.payload;
    default:
      return state;
  }
};
