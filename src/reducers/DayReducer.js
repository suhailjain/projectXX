export default (state = 'mon', action) => {
  switch (action.type) {
    case 'day':
      return action.payload;
    default:
      return state;
  }
};
