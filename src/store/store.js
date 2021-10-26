import { createStore, combineReducers } from 'redux';
import FavsReducer from '../reducers/FavsReducer';
import CharacterReducer from '../reducers/CharacterReducer';

const rootReducer = combineReducers({
  favorites: FavsReducer, 
  characters: CharacterReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;