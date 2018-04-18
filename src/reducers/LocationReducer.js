export default (state = 'Rohini', action) => {
  switch (action.type) {
    case 'select_location':
      return action.payload;
    default:
      return state;
  }
};
