export default (state = 'https://unityone-65a80.firebaseio.com/rEvents.json', action) => {
  switch (action.type) {
    case 'events':
      return action.payload;
    default:
      return state;
  }
};
