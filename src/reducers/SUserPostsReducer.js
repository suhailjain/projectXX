export default (state = [], action) => {
  switch (action.type) {
    case 'suser_posts':
      return [...action.payload];
    default:
      return state;
  }
};
