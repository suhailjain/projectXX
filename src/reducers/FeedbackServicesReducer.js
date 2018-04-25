export default (state = [], action) => {
  switch (action.type) {
    case 'services':
      return action.payload;
    default:
      return state;
  }
};
