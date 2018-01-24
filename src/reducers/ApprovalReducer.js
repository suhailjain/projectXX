export default (state = '', action) => {
  switch (action.type) {
    case 'approval':
      return action.payload;
    default:
      return state;
  }
};
