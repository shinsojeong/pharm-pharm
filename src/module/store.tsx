import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//import

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  //import
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;