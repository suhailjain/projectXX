import { REHYDRATE } from 'redux-persist/constants';

export default (state = [], action) => {
  //console.log(action.payload);
  switch (action.type) {
    case REHYDRATE:
        return action.payload.gallery || [];
    case 'gallery':
      return [...action.payload];
    default:
      return state;
  }
};
