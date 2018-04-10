import { REHYDRATE } from 'redux-persist/constants';

export default (state = 0, action) => {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.count || [];
    case 'inc':
      return Number.parseInt(state, 10) + 1;
    case 'dec':
      return Number.parseInt(state, 10) - 1;
    default:
      return state;
  }
};
