import { createStore } from 'redux';
import FavsReducer from '../reducers/FavsReducer';

const store = createStore(FavsReducer);

export default store;