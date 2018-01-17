export default (state = '', action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'purpose':
      return action.payload;
    default:
      return state;
  }
};
