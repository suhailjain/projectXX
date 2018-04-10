import { AsyncStorage } from 'react-native';
import { createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducers from '../reducers';

const store = createStore(reducers, {},
  compose(
  autoRehydrate()
));

persistStore(store, { storage: AsyncStorage, whitelist: ['count', 'gallery'] });

export default store;
