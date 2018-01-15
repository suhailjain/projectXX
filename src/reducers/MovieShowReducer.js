export default (state = false, action) => {
  switch (action.type) {
    case 'show_time':
      return action.payload;
    default:
      return state;
  }
};
