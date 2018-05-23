export default (state = '', action) => {
  switch (action.type) {
    case 'search_text':
      return action.payload;
    default:
      return state;
  }
};
