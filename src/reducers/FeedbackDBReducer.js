export default (state = 'feedback', action) => {
  switch (action.type) {
    case 'feedbck_dbref':
      return action.payload;
    default:
      return state;
  }
};
