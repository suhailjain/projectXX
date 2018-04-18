export default (state = '/posts', action) => {
  switch (action.type) {
    case 'db_ref':
      return action.payload;
    default:
      return state;
  }
};
