export default (state = 'none', action) => {
  switch (action.type) {
    case 'login_status':
      return action.payload;
    default:
      return state;
  }
};
