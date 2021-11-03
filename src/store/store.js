import {
  createStore, combineReducers, applyMiddleware
} from 'redux';
import FavsReducer from '../reducers/FavsReducer';
import CharacterReducer from '../reducers/CharacterReducer';
import {composeWithDevTools} from "redux-devtools-extension"
import { logger } from "redux-logger"

const rootReducer = combineReducers({
  favorites: FavsReducer,
  characters: CharacterReducer
})

const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(applyMiddleware(logger))
);

export default store;