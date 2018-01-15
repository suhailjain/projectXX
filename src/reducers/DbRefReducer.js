export default (state = null, action) => {
  switch (action.type) {
    case 'db_ref':
      return action.payload;
    default:
      return state;
  }
};
