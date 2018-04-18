import { REHYDRATE } from 'redux-persist/constants';

export default (state = [], action) => {
//  console.log(action.payload);
  switch (action.type) {
    case REHYDRATE:
        return action.payload.sgallery || [];
    case 'sgallery':
      return [...action.payload];
    default:
      return state;
  }
};
