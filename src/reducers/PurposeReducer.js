export default (state = '', action) => {
  switch (action.type) {
    case 'purpose':
      return action.payload;
    default:
      return state;
  }
};
